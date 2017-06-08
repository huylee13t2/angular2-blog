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

class Category(models.Model):
	title = models.CharField(max_length=255, null=True)

	def __str__(self):
		return u'%s' % self.title

class Product(models.Model):
	title = models.CharField(max_length=255, null=True)
	price = models.IntegerField(default=0)
	total = models.IntegerField(default=0)
	image = models.ImageField(upload_to=content_file_name, null=True)
	created_by = models.ForeignKey(User, related_name='product_created_by', null=True)
	category = models.ForeignKey(Category, related_name='category_product', null=True)

	def __str__(self):
		return u'%s' % self.title