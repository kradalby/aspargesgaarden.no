from django.shortcuts import render

from .models import Image, Page

# Create your views here.

def index(request):
    page = Page.objects.get(identifier="hjem")
    return render(request, 'index.html', { "page": page })

def gallery(request):
    images = Image.objects.all()
    return render(request, 'gallery.html', { "images": images })

def calendar(request):
    return render(request, 'calendar.html', {})

def contact(request):
    page = Page.objects.get(identifier="kontaktoss")
    return render(request, 'contact.html', { "page": page })
