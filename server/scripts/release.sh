#!/bin/bash

echo "+--------------------------+"
echo "|    Running migrations    |"
echo "+--------------------------+"
python server/manage.py migrate

echo "+--------------------------+"
echo "|       Loading data       |"
echo "+--------------------------+"
python server/manage.py loaddata users
python server/manage.py loaddata datasets