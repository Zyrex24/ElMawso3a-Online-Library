from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta

class Book(models.Model):
    title = models.CharField(max_length=100,default="Unknown")
    author = models.TextField(max_length=200,default="Unknown")
    isbn = models.CharField(max_length=13,default="Unknown")
    description = models.TextField(default="Unknown", blank=True, null=True)
    publisher = models.CharField(max_length=50,default="Unknown")
    image = models.URLField(null=True, blank=True)
    available = models.BooleanField(default=True)
    category = models.CharField(max_length=50,null=True,blank=True)

    def __str__(self):
        return self.title


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    added_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.book.title


class ImagesForBooks(models.Model):
    image = models.ImageField(upload_to="bookimages/")

    def __str__(self):
        return self.image


class Feedback(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    feedback = models.TextField()

    def __str__(self):
        return self.name
