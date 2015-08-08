from apps.asp.models import Page

from django.test import TestCase
from django.core.urlresolvers import reverse


class TestTestCase(TestCase):
    def test_test(self):
        self.assertEqual(1, 1)


class AspViewTests(TestCase):
    def setUp(self):
        Page.objects.create(identifier='hjem')
        Page.objects.create(identifier='kontaktoss')

    def test_index_render(self):
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)

    def test_gallery_render(self):
        response = self.client.get(reverse('gallery'))
        self.assertEqual(response.status_code, 200)

    def test_calendar_render(self):
        response = self.client.get(reverse('calendar'))
        self.assertEqual(response.status_code, 200)

    def test_contact_render(self):
        response = self.client.get(reverse('contact'))
        self.assertEqual(response.status_code, 200)
