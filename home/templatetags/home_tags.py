from datetime import date
from django import template
from django.conf import settings

from wagtail.wagtailcore.models import Page

register = template.Library()


# settings value
@register.assignment_tag
def get_google_maps_key():
    return getattr(settings, 'GOOGLE_MAPS_KEY', "")


@register.assignment_tag(takes_context=True)
def get_site_root(context):
    # NB this returns a core.Page, not the implementation-specific model used
    # so object-comparison to self will return false as objects would differ
    return context['request'].site.root_page


def has_menu_children(page):
    return page.get_children().live().in_menu().exists()


@register.inclusion_tag('home/tags/top_menu.html', takes_context=True)
def top_menu(context, parent, calling_page=None):
    menuitems = [parent] + [
        item for item in parent.get_children().live().in_menu()
    ]
    return {
        'calling_page': calling_page,
        'menuitems': menuitems,
        # required by the pageurl tag that we want to use within this template
        'request': context['request'],
    }
