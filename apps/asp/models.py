from django.db import models

# Create your models here.


class Page(models.Model):
    identifier = models.CharField(max_length=30, unique=True)
    title = models.CharField(max_length=30)
    content = models.TextField()

    def __str__(self):
        return self.title

class Image(models.Model):
    primary = models.BooleanField(default=False)
    image = models.ImageField()

    def __str__(self):
        return self.image.name
