from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from blog import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^friends/add-new/$', views.add_new_friend, name='add_new_friend'),
    url(r'^friends/add/list-not-friend/$', views.list_not_friend, name='list_not_friend'),
    url(r'^friends/$', views.list_friend, name='list_friend'),
    url(r'^friends/unf/$', views.unf_friend, name='unf_friend'),
    url(r'^blogs/$', views.blog_list),
    url(r'^blogs/comment/$', views.add_comment, name='add_comment'),
    url(r'^blogs/comment/list/$', views.list_comment, name='list_comment'),
    url(r'^blogs/reply/$', views.reply_comment, name='reply_comment'),
    url(r'^blogs/comment/like/$', views.like_comment, name='like_comment'),
    url(r'^blogs/reply/like/$', views.like_reply, name='like_reply'),
    url(r'^blogs/reply/deleted/$', views.deleted_reply, name='deleted_reply'),
    url(r'^blogs/comment/deleted/$', views.deleted_comment, name='deleted_comment'),
    url(r'^blogs/create/$', views.create_blog, name='create_blog'),
    url(r'^blogs/updated/(?P<pk>[0-9]+)/$', views.updated_blog, name='updated_blog'),
    url(r'^blogs/deleted/(?P<pk>[0-9]+)/$', views.deleted_blog, name='deleted_blog'),
    url(r'^blogs/updated-rating/(?P<pk>[0-9]+)/$', views.updated_rating_blog, name='updated_rating_blog'),
    url(r'^blogs/(?P<pk>[0-9]+)/$', views.blog_detail),
    url(r'^accounts/login/$', views.login, name='login'),
    url(r'^accounts/register/$', views.register, name='register'),
    url(r'^profile/$', views.get_user, name='get_user'),
    url(r'^u/profile/(?P<pk>[0-9]+)/$', views.m_profile, name='m_profile'),
    url(r'^u/profile/(?P<pk>[0-9]+)/updated/$', views.m_profile_updated, name='m_profile_updated'),
    url(r'^profile/updated/$', views.u_profile_updated, name='u_profile_updated'),
    # url(r'^accounts/logout/$', views.logout, name='logout', kwargs={'next_page': '/'}),
]

urlpatterns = format_suffix_patterns(urlpatterns)