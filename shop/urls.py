from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from shop import views

urlpatterns = [
    url(r'^shop/file/upload/$', views.file_upload, name='file_upload'),
    url(r'^shop/product/$', views.get_all_product, name='get_all_product'),
    url(r'^shop/list-category/$', views.list_category, name='list_category'),
    url(r'^shop/product/create/$', views.create_product, name='create_product'),
    url(r'^shop/product/(?P<pk>[0-9]+)/$', views.get_product, name='get_product'),
    url(r'^shop/product/(?P<pk>[0-9]+)/updated/$', views.updated_product, name='updated_product'),
    url(r'^shop/product/(?P<pk>[0-9]+)/deleted/$', views.deleted_product, name='deleted_product'),
    url(r'^shop/buy/$', views.buy_product, name='buy_product'),
]