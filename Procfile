release: python server/manage.py migrate
web: gunicorn --pythonpath server crux.wsgi --log-file -