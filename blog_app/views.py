from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.template import loader
from django.core.context_processors import csrf
import json
from models import User, Entry, Comment
from django.contrib.auth.decorators import login_required

def index(request):
	return render_to_response('index.html', None)

@login_required
def composer_page(request):
	context = {}
	context.update(csrf(request))
	return render_to_response('composer.html', context)

def entry_page(request, entry_id):
	context = {"entry_id":entry_id}
	context.update(csrf(request))
	return render_to_response('entry.html', context)

def get_entries(request):
	query = Entry.objects.all().order_by('-created_date');
	data = json.dumps([Entry.serialize(entry) for entry in query])
 	return HttpResponse(data, content_type="application/json")	

def get_comments_for_entry(request, entry_id):
	query = Comment.objects.filter(entry_id=entry_id).order_by('created_date');
	data = json.dumps([Comment.serialize(comment) for comment in query])
 	return HttpResponse(data, content_type="application/json")	

def get_entry(request, entry_id):
	query = Entry.objects.get(id=entry_id)
	data = json.dumps(Entry.serialize(query))
 	return HttpResponse(data, content_type="application/json")	

def add_comment(request, entry_id):
	name = json.loads(request.body)['name']
	text = json.loads(request.body)['text']
	entry = Entry.objects.get(id=entry_id)
	comment = Comment(entry=entry, name=name, text=text)
	comment.save()
	data = json.dumps(Comment.serialize(comment))
	return HttpResponse(data, content_type="application/json")

@login_required
def add_entry(request):
	title = json.loads(request.body)['title']
	text = json.loads(request.body)['text']
	entry = Entry(user=request.user, title=title, text=text)
	entry.save()
	data = json.dumps(Entry.serialize(entry))
	return HttpResponse(data, content_type="application/json")