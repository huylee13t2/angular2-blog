from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from blog.models import Blog, Profile, Comment, Reply, LikeComment, LikeReply, Friend
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

def home(request):
    return render(request, 'dist/index.html');

@csrf_exempt
def add_new_friend(request):
    id_friend = request.POST.get('id_friend')
    id_user = request.POST.get('id_user')
    print('====================> add new')
    try:
        user = User.objects.get(id = id_user)
        friend = User.objects.get(id = id_friend)
        obj = Friend(user = user, friend = friend)
        obj.save()
        print('=========> save')

        response = {
            'result' : obj.id,
        }
    except:
        response = {
            'result' : -999,
        }
    return JsonResponse(response)


@csrf_exempt
def list_not_friend(request):
    try:
        id = request.GET.get('id')
        friends = Friend.objects.filter(user__id = id)
        arr_not_fr = []
        arr_fr = []
        for fr in friends:
            arr_fr.append(fr.friend.id)
        arr_fr.append(int(id))
        profile = Profile.objects.exclude(user__id__in = arr_fr)
        for ob in profile:
            arr_not_fr.append({
                'id' : ob.user.id,
                'username' : ob.user.username,
                'image_name' : ob.image.name,
                })
        response = {
            'result' : 1,
            'data' : arr_not_fr,
        }
    except:
        response = {
            'result' : -999,
        }
    return JsonResponse(response)

@csrf_exempt
def unf_friend(request):
    id = request.POST.get('id')
    try:
        friend = Friend.objects.get(id = id)
        friend.delete()
        response = {
            'result' : 1,
        }
    except:
        response = {
            'result' : -999,
        }
    return JsonResponse(response)

@csrf_exempt
def list_friend(request):
    id = request.GET.get('id')
    try:
        friends = Friend.objects.filter(Q(user__id = id))
        list_friend = []
        for pk in friends:
            profile = Profile.objects.get(user = pk.friend)
            list_friend.append({
                'id' : pk.id,
                'user' : pk.user.username,
                'user_id' : pk.user.id,
                'friend' : pk.friend.username,
                'friend_id' : pk.friend.id,
                'image_name' : profile.image.name,
            })
        response = {
            'result' : 1,
            'data' : list_friend,
        }
    except:
        response = {
            'result' : -999,
        }
    return JsonResponse(response)

@csrf_exempt
def deleted_reply(request):
    id = request.GET.get('id')
    try:
        reply = Reply.objects.get(id = id)
        reply.delete()
        response = {
            'result' : 1,
        }
    except:
        response = {
            'result' : -999,
        }
    return JsonResponse(response)

@csrf_exempt
def deleted_comment(request):
    id = request.GET.get('id')
    try:
        comment = Comment.objects.get(id = id)
        comment.delete()
        response = {
            'result' : 1,
        }
    except:
        response = {
            'result' : -999,
        }
    return JsonResponse(response)

@csrf_exempt
def like_reply(request):
    id = request.POST.get('id')
    user = request.POST.get('user')

    reply = Reply.objects.get(id = id)
    user = User.objects.get(username=user)

    try:
        like = LikeReply.objects.get(comment__id = id)
        if like.user == user:
            like.delete()
            response = {
                'result': 1,
            }
        else:
            like = LikeReply(user=user, comment=reply)
            like.save()
            response = {
                'result': like.id,
            }
        return JsonResponse(response)
    except:
        like = LikeReply(user=user, comment=reply)
        like.save()
        response = {
            'result': like.id,
        }

        return JsonResponse(response)

@csrf_exempt
def like_comment(request):
    id = request.POST.get('id')
    user = request.POST.get('user')
    try:
        comment = Comment.objects.get(id = id)
        user = User.objects.get(username = user)
        print('=============================')
        like = LikeComment.objects.filter(Q(comment__id = id) & Q(user = user))
        print(like)
        if like.count() != 0:
            print('===========> 111111111111')
            like[0].delete()
            print('===> deleted')
            response = {
                'result' : 1,
            }
            return JsonResponse(response)
        else : 
            print('==========> 22222222222')
            obj = LikeComment(user = user, comment = comment)
            obj.save()
            print('===========> save!')
            response = {
                'result' : obj.id,
            }

            return JsonResponse(response)
    except:
        response = {
            'result' : -999,
        }
    return JsonResponse(response)


@csrf_exempt
def reply_comment(request):
	print('=================> reply')
	print(request.POST)
	id = request.POST.get('id')
	content = request.POST.get('reply')
	user = request.POST.get('user')

	try:
		comment = Comment.objects.get(id=id)
		print(comment)
		user = User.objects.get(username=user)
		print(user)
		reply = Reply(content=content, comment=comment, user=user)
		reply.save()
		print('save ..................')
		response = {
			'result': reply.id
		}
	except:
		response = {
			'result': -999,
		}
	return JsonResponse(response)


def list_comment(request):
    id = request.GET.get('id')

    try:
        blog = Blog.objects.get(id=id)
        list_comment = Comment.objects.filter(blog=blog).order_by('-id')
        list_arr = []
        for obj in list_comment:
            list_reply = Reply.objects.filter(comment=obj).order_by('-id')
            reply_arr = []
            like_comment = LikeComment.objects.filter(comment = obj)
            list_like_comment = []
            list_user_like_comment = []
            for lk in like_comment:
                list_like_comment.append(lk.user.id)
                list_user_like_comment.append(lk.user.username)
            for rp in list_reply:
                pr = Profile.objects.get(user = rp.user)
                like_reply = LikeReply.objects.filter(comment = rp)
                list_like_reply = []
                for u in like_reply:
                    list_like_reply.append(u.user.id)
                reply_arr.append({
                        'content' : rp.content,
                        'user' : rp.user.username,
                        'user_id' : rp.user.id,
                        'id' : rp.id,
                        'image_name' : pr.image.name,
                        'total_like_reply' : like_reply.count(),
                        'user_like_reply' : list_like_reply,
                    })
            profile = Profile.objects.get(user = obj.user)
            if profile.image != None:
                image = profile.image.name
            else:
                image = "avt2.jpg"

            list_arr.append({
                'id' : obj.id,
                'content' : obj.content,
                'user' : obj.user.username,
                'user_id' : obj.user.id,
                'blog' : obj.blog.title,
                'image_name' : image,
                'reply' : reply_arr,
                'total_reply' : list_reply.count(),
                'total_like_comment' : like_comment.count(),
                'user_like_commet' : list_like_comment,
                'list_user_like_comment' : list_user_like_comment,
            })

        response = {
            'result' : 1,
            'data' : list_arr,
        }
    except:
        response = {
            'result' : -999,
        }
    return JsonResponse(response)


@csrf_exempt
def add_comment(request):
	id = request.POST.get('id')
	persion = request.POST.get('user')
	content = request.POST.get('comment')

	try:
		user = User.objects.get(username = persion)
		blog = Blog.objects.get(id = id)
		cmt = Comment(blog = blog, content = content, user=user)
		cmt.save()

		response = {
			'result' : cmt.id,
		}
	except:
		response = {
			'result' : -999,
		}

	return JsonResponse(response)

@csrf_exempt
def u_profile_updated(request):
    username = request.POST.get('username')
    fullname = request.POST.get('fullname')
    gender = request.POST.get('gender')
    birthday = request.POST.get('birthday')
    image = request.FILES.get('image')
    try:
        profile = Profile.objects.get(user__username=username)
        profile.fullname = fullname
        profile.gender = gender
        profile.birthday = birthday
        if image != None:
            profile.image = image
        profile.save()

        response = {
            'result': profile.user.id,
        }
    except:
        response = {
            'result': -999,
        }

    return JsonResponse(response)


@csrf_exempt
def get_user(request):
    username = request.GET.get('username')
    try:
        profile = Profile.objects.get(user__username=username)

        response = {
            'result': profile.user.id,
            'data': {
                'username': profile.user.username,
                'fullname': profile.fullname,
                'gender': profile.gender,
                'birthday': profile.birthday,
                'image_name' : profile.image.name,
            }
        }
    except:
        response = {
            'result': -999,
        }
    return JsonResponse(response)

@csrf_exempt
def m_profile_updated(request, pk):
    print('=========> updated')
    print(pk)
    print(request.POST)
    print('------------------------')
    try:
        username = request.POST.get('username')
        fullname = request.POST.get('fullname')
        gender = request.POST.get('gender')
        birthday = request.POST.get('birthday')
        image = request.FILES.get('image')

        profile = Profile.objects.get(user__id = pk)
        print(profile)
        profile.fullname = fullname
        profile.gender = gender
        profile.birthday = birthday
        if image != None:
            print('yes...........')
            profile.image = image
        profile.save()

        response = {
            'result': profile.user.id,
        }
    except:
        response = {
            'result' : -999,
        }

    return JsonResponse(response)

@csrf_exempt
def m_profile(request, pk):
    print('========> profile')
    try:
        profile = Profile.objects.get(user_id = pk)
        print(profile)
        response = {
            'result': profile.user.id,
            'data': {
                'username': profile.user.username,
                'fullname': profile.fullname,
                'gender': profile.gender,
                'id' : profile.user.id,
                'birthday': profile.birthday,
                'image_name' : profile.image.name,
            }
        }
    except:
        response = {
            'result' : -999,
        }
    return JsonResponse(response)


@csrf_exempt
def updated_rating_blog(request, pk):
    rating = request.POST.get('rating')
    try:
        blog = Blog.objects.get(id=pk)
        blog.rating = rating
        blog.save()
        response = {
            'result': blog.id,
        }
    except:
        response = {
            'result': -999,
        }
    return JsonResponse(response)


@csrf_exempt
def create_blog(request):
    title = request.POST.get('title')
    content = request.POST.get('content')
    image = request.FILES.get('image')
    try:
        blog = Blog(title=title, content=content, image=image)
        blog.save()

        response = {
            'result': blog.id,
        }
    except:
        response = {
            'result': -999,
        }
    return JsonResponse(response)


@csrf_exempt
def updated_blog(request, pk):
    title = request.POST.get('title')
    content = request.POST.get('content')
    image = request.FILES.get('image')
    try:
        blog = Blog.objects.get(id=pk)
        blog.title = title
        blog.content = content
        if image != None:
            blog.image = image
        blog.updated = timezone.now()
        blog.save()

        response = {
            'result': pk,
        }
    except:
        response = {
            'result': -999
        }
    return JsonResponse(response)


@csrf_exempt
def deleted_blog(request):
    print('===========> delete')
    print(method)


@csrf_exempt
def register(request):
    get_data = (request.body).decode('utf-8')
    data = json.loads(get_data)

    user = User(username=data['username'], password=data[
                'password'], first_name=data['firstName'], last_name=data['lastName'])
    user.set_password(data['password'])
    user.save()
    # profile
    fullname = data['firstName'] + ' ' + data['lastName']
    encode = jwt.encode({'username': data['username']}, 'secret')
    profile = Profile(user=user, fullname=fullname,
                      gender=data['gender'], token=str(encode))
    profile.save()

    response = {
        'result': user.id,
    }

    return JsonResponse(response)


@csrf_exempt
def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    try:
        # user = User.objects.get(username = username)
        profile = Profile.objects.get(user__username=username)
        if profile.user.check_password(password):
            response = {
                'result': profile.user.id,
                'data': {
                    'id': profile.user.id,
                    'token': profile.token,
                    'fullName': profile.fullname,
                    'gender': profile.gender,
                    'username': profile.user.username,
                }
            }
        else:
            response = {
                'result': 0,
            }
    except:
        response = {
            'result': -999,
        }
    return JsonResponse(response)


@csrf_exempt
@api_view(['GET', 'POST'])
def blog_list(request, format=None):

    if request.method == 'GET':
        blog = Blog.objects.all().order_by('-updated')
        serializer = BlogSerializer(blog, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        print('================> POST')
        print(request.POST)
        print('======================')

        # print(request.FILES.getlist('image'))

        # serializer = BlogSerializer(data=request.data)
        # print(serializer)
        # print(serializer.is_valid())
        # if serializer.is_valid():
        # 	print('======> OK')
        # 	serializer.save()
        # 	print('===> SAVE')
        # 	return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors,
        # status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def blog_detail(request, pk, format=None):
    try:
        blog = Blog.objects.get(pk=pk)
    except blog.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BlogSerializer(blog)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = request.data

        try:
            blog = Blog.objects.get(id=data['id'])
            blog.title = data['title']
            blog.content = data['content']
            blog.updated = timezone.now()
            blog.save()
            data = serializers.serialize('json', [blog, ])
            return Response(data)
        except:
            Response(status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        blog.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
