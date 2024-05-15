from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import Book,ImagesForBooks,Feedback


class CreateUserForm(UserCreationForm):
    user_choices = [
        ('user', 'User'),
        ('admin', 'Admin'),
        
    ]
    user_type = forms.ChoiceField(choices=user_choices)
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'user_type']
    


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'isbn', 'description', 'publisher', 'category' , 'image']


class BookSearchForm(forms.Form):
    search_query = forms.CharField(label='Search Query', max_length=100)
    search_category = forms.ChoiceField(choices=[('title', 'Title'), ('author', 'Author'), ('category', 'Category')], label='Search Category')    


class CartItemForm(forms.Form):
    book = forms.ModelChoiceField(queryset=Book.objects.all(), empty_label=None)

class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = ImagesForBooks
        fields = ['image']
        
        
class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Feedback
        fields = ['name', 'email', 'feedback']

