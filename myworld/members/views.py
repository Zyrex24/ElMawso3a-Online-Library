import os
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm, BookForm, BookSearchForm, CartItemForm, ImageUploadForm, FeedbackForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .decorators import unauthenticated_user, is_admin
from django.contrib.auth.models import Group
from .models import Book,CartItem,ImagesForBooks,Feedback
from PIL import Image
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from io import BytesIO
from django.db.models import Q, F, Subquery
from random import sample
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.core.serializers import serialize
from django.core.exceptions import ValidationError


def index(request):
    all_books = Book.objects.all()
    # Get 10 random books
    featured_books = sample(list(all_books), min(10, len(all_books)))
    special_books = [
        (1, 'http://127.0.0.1:8000/thumbnail/SoftwareInTheSpace.png/', 'Software Engineering In the Coding Space thumbnail'),
        (2, 'http://127.0.0.1:8000/thumbnail/Practice%20course.png/', 'Software Practices thumbnail'),
        (5, 'http://127.0.0.1:8000/thumbnail/Data%20structutrs%20&%20Algorithms.png/', 'Data Structures & Algorithms thumbnail'),
        (10, 'http://127.0.0.1:8000/thumbnail/CRACKING.png', 'Cracking The Discussions thumbnail'),
    ]
    return render(request, 'index.html', {'featured_books': featured_books, 'special_books': special_books})

@login_required(login_url='login')
@is_admin(allowed_roles=['admin'])
def admin(request):
    feedbacks = Feedback.objects.all()
    books = Book.objects.all()
    form = BookForm()
    context = {}
    context['feedbacks'] = feedbacks
    context['books'] = books
    if request.method == 'POST':
        if 'add' in request.POST:
            form = BookForm(request.POST)
            form.save()
        elif 'upload' in request.POST:
            form = ImageUploadForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()
        elif 'delete' in request.POST:
            book_id = request.POST.get('delete')
            book = Book.objects.get(id=book_id)
            book.delete()    
        elif 'update' in request.POST:
            book_id = request.POST.get('update')
            book = Book.objects.get(id=book_id)
            form = BookForm(instance=book)
            if form.is_valid():
                form.save()
    context['form'] = form
    return render(request, 'admin.html', context)

def aboutus(request):
    return render(request, 'aboutus.html', {})

def contactus(request):
    return render(request, 'contactus.html', {})

def termsofservices(request):
    return render(request, 'termsofservices.html', {})

def privacypolicy(request):
    return render(request, 'privacypolicy.html', {})

@login_required(login_url='login')
def borrow(request):
    return render(request, 'borrow.html', {})

@login_required(login_url='login')
def borrowedbooks(request):
    # Retrieve all borrowed books
    borrowed_books = CartItem.objects.filter(user=request.user)
    # Pass the queryset to the template
    card_container = borrowed_books.exists()
    return render(request, 'borrowedbooks.html', {'borrowed_books': borrowed_books})



@csrf_exempt
@login_required(login_url='login')
def borrow_book(request):
    if request.method == 'POST':
        book_id = request.POST.get('book_id')
        try:
            book = Book.objects.get(pk=book_id)
            # Assuming the user is authenticated and you have access to request.user
            CartItem.objects.filter(user=request.user, book=book).delete()
            # Mark the book as unavailable
            book.available = False
            book.save()
            # Prepare the data to be sent to the client
            data = {
                'success': True,
                'book_title': book.title,
                'book_image': str(book.image) if book.image else '',
            }
            return JsonResponse(data)
        except Book.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Book does not exist'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'}) 
    

@login_required(login_url='login')
def return_book(request):
    if request.method == 'POST':
        book_id = request.POST.get('book_id')
        try:
            # Retrieve the cart item
            cart_item = CartItem.objects.get(user=request.user, book_id=book_id)
            # Mark the book as available again
            cart_item.book.available = True
            cart_item.book.save()
            # Delete the cart item
            cart_item.delete()
            # Return the updated list of available books
            all_books = Book.objects.filter(available=True).values('pk', 'title')
            return JsonResponse({'success': True, 'book_id': book_id, 'book_title': cart_item.book.title, 'all_books': list(all_books)})
        except CartItem.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Book not found in cart'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})

@csrf_exempt
@login_required(login_url='login')
def cart(request):
    cart_items = CartItem.objects.filter(user=request.user)
    all_books = Book.objects.filter(available=True)
    book_title = request.POST.get('book_title')  # Get the selected book title
    return render(request, 'cart.html', {'cart_items': cart_items, 'all_books': all_books, 'selected_book_title': book_title})

def add_to_cart(request):
    if request.method == 'POST':
        book_id = request.POST.get('book')
        book = Book.objects.get(pk=book_id)
        # Check if the book is already in the user's cart
        if CartItem.objects.filter(user=request.user, book=book).exists():
            return JsonResponse({'success': False, 'message': 'Book already in cart'})
        else:
            # Assuming the user is authenticated and you have access to request.user
            CartItem.objects.create(user=request.user, book=book)
            # Mark the book as unavailable
            book.available = False
            book.save()
            return JsonResponse({'success': True, 'book': book.title, 'book_id': book_id})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})


@csrf_exempt
def clear_cart(request):
    if request.method == 'POST':
        # Retrieve all cart items for the current user
        cart_items = CartItem.objects.filter(user=request.user)
        # Mark the books in the cart as available again
        for item in cart_items:
            item.book.available = True
            item.book.save()
        # Serialize available books
        available_books = serializers.serialize('json', Book.objects.filter(available=True))
        # Clear the cart
        cart_items.delete()
        return JsonResponse({'success': True, 'available_books': available_books})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})
    

def all_books(request):
    # Retrieve all available books
    available_books = Book.objects.filter(available=True)
    # Serialize available books
    available_books_json = serialize('json', available_books)
    # Return JSON response
    return HttpResponse(available_books_json, content_type='application/json')




@csrf_exempt
@login_required(login_url='login')


def feedback(request):
    feedback_sent = False  # Initialize feedback_sent variable

    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            form.save()
            feedback_sent = True  # Set feedback_sent to True on successful form submission
            return JsonResponse({'success': True}, status=200)
        else:
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)
    else:
        form = FeedbackForm()

    return render(request, 'feedback.html', {'form': form, 'feedback_sent': feedback_sent})




@unauthenticated_user
def user_login(request):    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.info(request, 'Username OR password is incorrect')

    return render(request, 'login.html', {})

def user_logout(request):
    logout(request)
    return redirect('login')

@unauthenticated_user
def register(request):
    form = CreateUserForm()
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            group = form.cleaned_data.get('user_type')
            isAdmin, isUser = group == 'admin', group == 'user'
            if isAdmin:
                group = Group.objects.get(name='admin')
                user.groups.add(group)
                user.is_staff = True  # Set is_staff to True for admins
                user.save()  # Save the user to update the is_staff field
            elif isUser:
                group = Group.objects.get(name='normal user')
                user.groups.add(group)
            messages.success(request, 'Account was created for ' + username)
            return redirect('login')
    context = {'form': form}
    return render(request, 'register.html', context)

@login_required(login_url='login')
def profile(request):
    # Retrieve all borrowed books for the user
    borrowed_books = CartItem.objects.filter(user=request.user)
    # Count the number of borrowed books
    num_borrowed_books = borrowed_books.count()
    # Pass the count to the template
    return render(request, 'profile.html', {'num_borrowed_books': num_borrowed_books})

@login_required(login_url='login')
def books(request):
    context = {}
    books = Book.objects.all()

    # Handle search query
    search_query = request.GET.get('search_query')
    search_category = request.GET.get('search_category')

    if search_query and search_category:
        if search_category == 'title':
            books = books.filter(title__icontains=search_query)
        elif search_category == 'author':
            books = books.filter(author__icontains=search_query)
        elif search_category == 'category':
            books = Book.objects.filter(category__icontains=search_query)

    context['books'] = books
    context['search_query'] = search_query  # Pass the search query back to the template
    return render(request, 'books.html', context)

@login_required(login_url='login')
def book(request, pk):
    book = Book.objects.get(id=pk)
    return render(request, 'book.html', {'book': book})

@login_required(login_url='login')
@is_admin(allowed_roles=['admin'])
def add_book(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('admin')  # Redirect to the admin dashboard after adding the book
    else:
        form = BookForm()
    return render(request, 'addBook.html', {'form': form})

# @login_required(login_url='login')
# @is_admin(allowed_roles=['admin'])
# def update_book(request,pk):
#     book = Book.objects.get(id=pk)
#     form = BookForm(instance=book)
#     context = {}
#     context['book'] = book
    
#     if request.method == 'POST':
#         form = BookForm(request.POST, request.FILES, instance=book)
#         if form.is_valid():
#             form.save()
#             return redirect('admin')
    
#     context = {'form':form}
#     return render(request, 'updateBook.html', context)

@login_required(login_url='login')
@is_admin(allowed_roles=['admin'])
def update_book(request, pk):
    book = Book.objects.get(id=pk)
    form = BookForm(instance=book)
    context = {'book': book, 'form': form}
    
    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES, instance=book)
        if form.is_valid():
            form.save()
            return redirect('admin')
    
    return render(request, 'updateBook.html', context)

# @login_required(login_url='login')
# @is_admin(allowed_roles=['admin'])
# def delete_book(request, pk):
#     book = Book.objects.get(id=pk)
#     if request.method == 'POST':
#         book.delete()
#         return redirect('admin')
#     return render(request, 'delete.html', {'book': book})

def serve_thumbnail(request, image_name):
    image_path = os.path.join(settings.MEDIA_ROOT, 'bookimages', image_name)
    with open(image_path, 'rb') as f:
        image = Image.open(f)
        thumbnail = image.resize((1600, 2560))  # Fixed size of 128x160 pixels
        thumb_io = BytesIO()

        # Check the file extension to determine the format
        if image_name.lower().endswith('.png'):
            format = 'PNG'
        else:
            format = 'JPEG'

        thumbnail.save(thumb_io, format=format)
        thumb_io.seek(0)
        return HttpResponse(thumb_io, content_type='image/' + format.lower())
    
    
def search_books(request):
    form = BookSearchForm(request.GET)
    books = []

    if form.is_valid():
        search_query = form.cleaned_data['search_query']
        search_category = form.cleaned_data['search_category']
        
        if search_category == 'title':
            books = Book.objects.filter(title__icontains=search_query)
        elif search_category == 'author':
            books = Book.objects.filter(author__icontains=search_query)
        elif search_category == 'category':
            books = Book.objects.filter(category__icontains=search_query)
            
    return render(request, 'search_results.html', {'form': form, 'books': books})

