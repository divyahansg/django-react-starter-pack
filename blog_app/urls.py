from django.conf.urls import url

from . import views

urlpatterns = [
  url(r'^$', views.index, name='index'),
  url(r'^entries/(?P<entry_id>[0-9]+)$', views.entry_page, name='entry_page'),
  url(r'^entries/add$', views.composer_page, name='composer_page'),
  url(r'^api/entries$', views.get_entries, name='get_entries'),
  url(r'^api/entries/add$', views.add_entry, name='add_entry'),
  url(r'^api/entries/(?P<entry_id>[0-9]+)/comments/add$', views.add_comment, name='add_comment'),
  url(r'^api/entries/(?P<entry_id>[0-9]+)/comments$', views.get_comments_for_entry, name='get_comments_for_entry'),
  url(r'^api/entries/(?P<entry_id>[0-9]+)$', views.get_entry, name='get_entry'),
]
