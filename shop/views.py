from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from shop.models import Product, Category
from blog.serializers import BlogSerializer
from django.utils import timezone
from django.core import serializers
import codecs
import json
from django.http import *
from django.views.decorators.csrf import csrf_exempt
import json
import jwt
from django.contrib.auth.models import User, Group
from django.http import QueryDict
from django.db.models import Q

@csrf_exempt
def file_upload(request):
	print('============> UPLOAD')
	file = request.FILES.get('image')
	print(file)

	product = Product(image = file)
	product.save()
	print('save')
	response = {
		'result' : product.id,
		'data' : {
			'id' : product.id,
			'image_name' : product.image.name,
		}
	}

	return JsonResponse(response)

@csrf_exempt
def deleted_product(request, pk):
	try:
		user = request.POST.get('user')
		user = User.objects.get(id = user)
		product = Product.objects.get(id = pk)
		if user.id == product.created_by.id:
			product.delete()

			response = {
				'result' : 1,
			}
		else:
			response = {
				'result' : 0,
			}
	except:
		response = {
			'result' : -999,
		}
	return JsonResponse(response)


@csrf_exempt
def updated_product(request, pk):
	try:
		user = request.POST.get('user_id')
		title = request.POST.get('title')
		total = request.POST.get('total')
		price = request.POST.get('price')
		category = request.POST.get('category')
		image = request.FILES.get('image')

		user = User.objects.get(id = user)
		product = Product.objects.get(id = pk)
		category = Category.objects.get(id = category)
		product.title = title
		product.total = total
		product.price = price
		if image != None:
			product.image = image
		product.category = category
		product.save()

		response = {
			'result' : product.id,
		}
	except:
		response = {
			'result' : -999,
		}
	return JsonResponse(response)

@csrf_exempt
def buy_product(request):
	id = request.POST.get('id')
	user_id = request.POST.get('user_id')
	record = request.POST.get('record')

	# try:
	product = Product.objects.get(id = id)
	user = User.objects.get(id = user_id)
	if product.total >= int(record):
		product.total = product.total - int(record)
		product.save()

		response = {
			'result' : product.id,
		}
	else:
		response = {
			'result' : 0,
			'msg' : 'Buy Error!'
		}
	return JsonResponse(response)

@csrf_exempt
def get_product(request, pk):
	try:
		product = Product.objects.get(id = pk)

		response = {
			'result' : product.id,
			'data' : {
				'id' : product.id,
				'category' : product.category.id,
				'title' : product.title,
				'price' : product.price,
				'image_name' : product.image.name,
				'total' : product.total,
				'user' : product.created_by.username,
				'user_id' : product.created_by.id,
			}
		}
	except:
		response = {
			'result' : -999,
		}

	return JsonResponse(response)

@csrf_exempt
def create_product(request):
	try:
		id = request.POST.get('id')
		title = request.POST.get('title')
		total = request.POST.get('total')
		price = request.POST.get('price')
		category = request.POST.get('category')
		image = request.FILES.get('image')
		user = User.objects.get(id = id)

		category = Category.objects.get(id = category)
		product = Product(title = title, price=price, total=total, category=category, created_by=user, image= image)
		product.save()

		response = {
			'result' : 1,
		}
	except:
		response = {
			'result' : -999,
		}
	return JsonResponse(response)

@csrf_exempt
def list_category(request):
	try:
		category = Category.objects.all()
		list_category = []
		for obj in category:
			list_category.append({
				'id' : obj.id,
				'title' : obj.title,
			})

		response = {
			'result' : 1,
			'data' : list_category,
		}
	except:
		response = {
			'result' : -999,
		}
	return JsonResponse(response)

@csrf_exempt
def get_all_product(request):
	id = request.POST.get('id')
	try: 
		category = Category.objects.all()
		arr_list = []
		for cate in category:
			product = Product.objects.filter(category = cate)
			arr_product = []
			for pr in product:
				arr_product.append({
					'id' : pr.id,
					'title' : pr.title,
					'price' : pr.price,
					'total' : pr.total,
					'image_name' : pr.image.name,
					'created_by' : pr.created_by.username,
					'created_by_id' : pr.created_by.id,
				})

			arr_list.append({
				'category' : {
					'id' : cate.id,
					'title' : cate.title,
				},
				'product' : arr_product,
			})

		response = {
			'result' : 1,
			'data' : arr_list,
		}
	except:
		response = {
			'result' : -999,
		}
	return JsonResponse(response)
