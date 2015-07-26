from django.contrib import admin

from .models import Page, Image

# Register your models here.

class ImageAdmin(admin.ModelAdmin):
    pass

class PageAdmin(admin.ModelAdmin):
    pass

admin.site.register(Image, ImageAdmin)
admin.site.register(Page, PageAdmin)
