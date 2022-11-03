# celery
from celery.schedules import crontab

# https://docs.celeryq.dev/en/3.1/configuration.html
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
# Configure Celery to use a custom time zone.
CELERY_TIMEZONE = 'America/Santiago'
# A sequence of modules to import when the worker starts
CELERY_IMPORTS = ('celery_config.tasks', )
# beat scheduler
CELERY_BEAT_SCHEDULE = {
    'every-4-minutes_kenobi': {
        'task': 'celery_config.tasks.kenobi',
        'schedule': crontab(minute='*/4')  # execute every 4 minutes
    },
    'every-1-minutes_add': {
        'task': 'celery_config.tasks.add',
        'schedule': crontab(minute='*/1'), # every 1 minute
        'args': (16, 16),
    },
    'every-4-minutes_grievous': {
        'task': 'celery_config.tasks.grievous',
        'schedule': crontab(minute='*/4') # execute every 4 minutes
    },
}
