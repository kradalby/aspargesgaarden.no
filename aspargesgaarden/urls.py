'''aspargesgaarden URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
'''
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^$', 'apps.asp.views.index', name='index'),
    url(r'^bilder/', 'apps.asp.views.gallery', name='gallery'),
    url(r'^kalender/', 'apps.asp.views.calendar', name='calendar'),
    url(r'^kontaktoss/', 'apps.asp.views.contact', name='contact'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^pages/', include('django.contrib.flatpages.urls')),

    # url(r'^appname/', include('apps.appname.urls')),
]
