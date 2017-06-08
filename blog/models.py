from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
import os
import random
from django.utils import timezone
from django.contrib.auth.models import User, Group


def content_file_name(instance, filename):
    now = timezone.now()
    x = str(now).replace("-", "").replace(" ", "").replace(":",
                                                           "").replace("+", "").replace(".", "")
    ext = filename.split('.')[-1]
    name = random.randint(100, 99999)
    filename = "%s%s.%s" % (x, name, ext)
    return os.path.join(filename)


class Blog(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField(null=True)
    image = models.ImageField(upload_to=content_file_name, null=True)
    created = models.DateTimeField(
        auto_now_add=True, auto_now=False, null=True)
    updated = models.DateTimeField(
        auto_now_add=True, auto_now=False, null=True)
    rating = models.IntegerField(default=0)
    updated_by = models.ForeignKey(
        User, related_name='blog_updated_by', editable=True, null=True)
    created_by = models.ForeignKey(
        User, related_name='blog_created_by', editable=True, null=True)

    def __str__(self):
        return u'%s' % self.title


class Profile(models.Model):
    list_gender = (
        ("male", "Male"),
        ("female", "Female"),
    )

    user = models.ForeignKey(User, null=True)
    image = models.ImageField(upload_to=content_file_name, null=True)
    fullname = models.CharField(max_length=255, null=True)
    gender = models.CharField(
        max_length=45, choices=list_gender, default='male')
    birthday = models.DateField(null=True)
    token = models.CharField(max_length=255, null=True)

    def __str__(self):
        return u'%s' % self.user


class Comment(models.Model):
    content = models.TextField(null=True)
    user = models.ForeignKey(User, related_name='comment_user', null=True)
    blog = models.ForeignKey(Blog, related_name='comment_blog', null=True)

    def __str__(self):
    	return u'%s' % self.content


class Reply(models.Model):
    content = models.TextField(null=True)
    comment = models.ForeignKey(Comment, null=True)
    user = models.ForeignKey(User, related_name='reply_user', null=True)

    def __str__(self):
    	return u'%s' % self.content


class LikeComment(models.Model):
    comment = models.ForeignKey(
        Comment, related_name='like_comment', null=True)
    user = models.ForeignKey(User, related_name='user_like_comment', null=True)

    def __str__(self):
    	return u'%s' % self.comment


class LikeReply(models.Model):
    comment = models.ForeignKey(Reply, related_name='like_reply', null=True)
    user = models.ForeignKey(User, related_name='user_like_reply', null=True)

    def __str__(self):
    	return u'%s' % self.comment

class Friend(models.Model):
    user = models.ForeignKey(User, related_name='user_friend', null=True)
    friend = models.ForeignKey(User, related_name='friend', null=True)

    def __str__(self):
        return u'%s' % self.friend