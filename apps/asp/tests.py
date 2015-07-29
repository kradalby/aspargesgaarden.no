from django.test import TestCase


class TestTestCase(TestCase):
    def test_test(self):
        self.assertEqual(1, 1)
