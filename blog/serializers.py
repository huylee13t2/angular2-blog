from rest_framework import serializers
from blog.models import Blog


class BlogSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    # title = serializers.CharField(required=False, allow_blank=True, max_length=255)
    # content = serializers.CharField(style={'base_template': 'textarea.html'})
    # image = serializers.ImageField(use_url='', required=False)
    # updated = serializers.DateTimeField()

    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, max_length = 255, allow_blank=True)
    content = serializers.CharField(required=False, style={'base_template': 'textarea.html'})
    image = serializers.ImageField(required=False, use_url='')
    rating = serializers.IntegerField(required=False)
    created = serializers.DateTimeField(required=False)
    updated = serializers.DateTimeField(required=False)
    created_by = serializers.CharField(required=False, max_length =255, allow_blank=True)

    def create(self, validated_data):
        return Blog.objects.create(**validated_data)

    def update(self, instance, validated_data):
        print('=========== update ============')
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        # instance.image = validated_data.get('image', instance.image)
        instance.updated = validated_data.get('updated', instance.updated)
        instance.save()
        print('save serializers......................')
        return instance

    class Meta:
        model = Blog
        fields = ('id', 'title', 'content', 'image', 'rating', 'updated', 'created', 'created_by')