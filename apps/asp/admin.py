from apps.asp.models import Image, Page

from django.contrib import admin


class ImageAdmin(admin.ModelAdmin):
    pass


class PageAdmin(admin.ModelAdmin):
    pass

admin.site.register(Image, ImageAdmin)
admin.site.register(Page, PageAdmin)
