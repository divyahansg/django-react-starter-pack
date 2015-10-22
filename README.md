http://docs.python-guide.org/en/latest/starting/install/osx/

sudo pip install virtualenv

Clone the repository and cd into the folder

virtualenv venv

source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py createsuperuser

python manage.py runserver

