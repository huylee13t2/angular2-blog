from django.contrib import admin
from shop.models import Category, Product

class CategoryAdmin(admin.ModelAdmin):
	list_display = ['title']

class ProductAdmin(admin.ModelAdmin):
	list_display = ['title', 'price', 'total', 'category', 'created_by']

admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
