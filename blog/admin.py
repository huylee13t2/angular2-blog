from django.contrib import admin
from blog.models import Blog, Profile, Comment, Reply, LikeReply, LikeComment, Friend

class BlogAdmin(admin.ModelAdmin):
	list_display = ['title', 'rating', 'created_by', 'updated']

class ProfileAdmin(admin.ModelAdmin):
	list_display = ['user', 'fullname', 'gender', 'birthday']

class CommentAdmin(admin.ModelAdmin):
	list_display = ['user', 'content', 'blog']

class ReplyAdmin(admin.ModelAdmin):
	list_display = ['user', 'comment', 'content']

class LikeCommentAdmin(admin.ModelAdmin):
	list_display = ['user', 'comment']

class LikeReplyAdmin(admin.ModelAdmin):
	list_display = ['user', 'comment']

class FriendAdmin(admin.ModelAdmin):
	list_display = ['user', 'friend']

admin.site.register(Blog, BlogAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Reply, ReplyAdmin)
admin.site.register(LikeReply, LikeReplyAdmin)
admin.site.register(LikeComment, LikeCommentAdmin)
admin.site.register(Friend, FriendAdmin)