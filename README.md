# CRUX

Collaborative Resource and Understanding Exchange Program

# Development instructions

## 1. Setup

* Install Front-end dependencies

  Run the following command from the project root folder

  `cd client`

  `npm install`

* Install Back-end dependencies

  Make sure you have `pipenv` installed (`pip install pipenv`)

  Run the following command from the project root folder

  `pipenv install`

* Setup the database

  `rm server/db.sqlite3 && touch server/db.sqlite3`

  `pipenv shell`

  `server/manage.py migrate`

  `server/manage.py loaddata users datasets analyses files`

## 2. Running the project

* To run the server

  Activate the virtual environment `pipenv shell`

  Start the server `server/manage.py runserver`

* To run the client

  `cd client`

  `npm start`
