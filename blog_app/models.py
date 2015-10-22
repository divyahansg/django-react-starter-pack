from django.db import models
from django.contrib.auth.models import User

class Entry(models.Model):
	user = models.ForeignKey(User)
	title = models.CharField(max_length=240)
	text = models.TextField()
	created_date = models.DateTimeField(auto_now_add=True)

	def serialize(entry):
		return { 'id': entry.id, 
    			 	 'title': entry.title, 
    			 	 'text': entry.text, 
    			 	 'created_date': str(entry.created_date),
    			 	 'num_comments': Comment.objects.filter(entry=entry).count() }

	def __unicode__(entry):
		return str(entry.id) + ": " + entry.title

class Comment(models.Model):
	entry = models.ForeignKey(Entry)
	name = models.CharField(max_length=120)
	text = models.TextField()
	created_date = models.DateTimeField(auto_now_add=True)

	def serialize(comment):
		return { 'id': comment.id, 
    				 'text': comment.text, 
    				 'name': comment.name,
    				 'created_date': str(comment.created_date) }

	def __unicode__(comment):
		return str(comment.id) + ": " + (comment.text[:20] + '..') if len(comment.text) > 20 else comment.text
