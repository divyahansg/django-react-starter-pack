# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('blog_app', '0003_remove_comment_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='name',
            field=models.CharField(default=datetime.datetime(2015, 10, 21, 7, 12, 37, 15101, tzinfo=utc), max_length=120),
            preserve_default=False,
        ),
    ]
