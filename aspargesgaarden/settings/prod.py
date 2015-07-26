from aspargesgaarden.settings.base import *

ALLOWED_HOSTS = ['aspargesgaarden.no']

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'f4q3p8nw089yt30q498tvyw4nvy3489vqb34nc349tv349v8'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
