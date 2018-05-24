#!/bin/bash

echo "+--------------------------+"
echo "|    Running migrations    |"
echo "+--------------------------+"
python manage.py migrate

echo "+--------------------------+"
echo "|       Loading data       |"
echo "+--------------------------+"
python ../manage.py loaddata users
python ../manage.py loaddata datasets
python ../manage.py loaddata analyses
python ../manage.py loaddata files