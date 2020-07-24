# flask-starter

## Starting the server:


1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already
3. Activate the virtual environment and start the app with `pipenv run flask run`

## Setting up the database:

### Install Postgres if you haven't already

#### For Mac: 
Install using postgres.app - https://postgresapp.com/downloads.html

#### For Windows:
https://www.postgresql.org/download/windows/

### Create an empty database and set a user
In postgres cli: `\c hatchways_crm`
c

## Initializing / Upgrading the DB schema:
```
cd server
pipenv shell
flask db upgrade
```

## Changing the DB Schema (create a migration)
If you change the db schema (add fields or tables), then you need
to create a migration using alembic and commit the version file.

```
cd server
pipenv shell
flask db migrate
flask db upgrade
```

