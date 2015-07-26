from django.shortcuts import render

from .models import Image, Page

# Create your views here.

def index(request):
    home = Page.objects.get(id=1)
    return render(request, 'index.html', { "page": home })

def gallery(request):
    images = Image.objects.all()
    return render(request, 'gallery.html', { "images": images })

def calendar(request):
    return render(request, 'calendar.html', {})

