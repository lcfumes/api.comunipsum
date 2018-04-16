[![Build Status](https://travis-ci.org/lcfumes/api.comunipsum.svg?branch=master)](https://travis-ci.org/lcfumes/api.comunipsum)

# API Comunipsum #

## Dev ##

Build Docker
```
$ docker-compose build
```

Run Docker
```
$ docker-compose up -d
```

URL
```
http://localhost:8000
```

## Endpoints ##

Verify if the API is working
```
GET /
```

default limit is 1
```
GET /phrases/{limit*}
```

## Swagger ##

With the container up
```
http://localhost/documentation
```
