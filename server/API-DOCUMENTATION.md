<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# Chat App API Description

This Documentation is for API's of Backend of Chat App.


# Sign Up

## To create new User:

```
API: /auth/sign-up
Method: POST
Header: "Content-Type: application/json"
Body: {
  "username": "",
  "email": "",
  "password": "",
}
```

If username, email and password are valid then you will get the following response, otherwise you will get only message with Http Status 400.

```
Http Status: 200
Response: {
  "message": "",
  "username": "",
}
```


# Sign In

## To Sign In as a user:

```
API: /auth/sign-in
Method: POST
Header: "Content-Type: application/json"
Body: {
  "username": "",
  "password": "",
}
```
##      OR
```
API: /auth/sign-in
Method: POST
Header: "Content-Type: application/json"
Body: {
  "email": "",
  "password": "",
}
```

If username/email and password are not valid then you will get the following response:

```
Http Status: 401
Response: {
  "message": "Unauthorized",
}
```

If username/email and password are valid then you will get the following response:

```
Http Status: 200
Response: {
  "message": "Sign In Successfull.",
  "access_token": "",
}
```

The access_token is JWT Token which Expires after 1 hour of sign in. This is to be used for all other API's for Authentication.


# Rooms

## To create a Room with a User:

```
API: /rooms/create
Method: POST
Header: "Content-Type: application/json"
Header: "Authorization: Bearer JWT-token"
Body: {
  "username": "USERNAME OF FRIEND",
}
```

If JWT Token is expired or not send in the header of request then, you will get following Response:

```
Http Status: 401
Response: {
  "message": "Unauthorized",
}
```

If "username" doesn't exist in database then, you will get following Response:

```
Http Status: 403
Response: {
  "message": "No such User present",
}
```

If "username" is already in rooms then, you will get following Response:

```
Http Status: 403
Response: {
  "message": "Room already present",
}
```

If "username" is present in rooms collection then, it creates Room and returns following Response:

```
Http Status: 201
Response: {
  "message": "New Room Created.",
  "newRoom": { "_id": "", "user1": "", "user2": "", "time": "" },
}
```


# Chats

## To get all rooms of User:

```
API: /chats/rooms
Method: POST
Header: "Content-Type: application/json"
Header: "Authorization: Bearer JWT-token"
```

If JWT Token is expired or not send in the header of request then, you will get following Response:

```
Http Status: 401
Response: {
  "message": "Unauthorized",
}
```

If JWT Token is valid then, you will get the following Response. If no rooms are present then you will get "null".

```
Http Status: 200
Response: {
  "rooms": [{ "_id": "", "user1": "", "user2": "", "time": "" }],
}
```

## To get all messages of a room:

```
API: /chats/get-mssgs
Method: POST
Header: "Content-Type: application/json"
Header: "Authorization: Bearer JWT-token"
Body: {
  "roomId": "room id of room",
}
```

If JWT Token is expired or not send in the header of request then, you will get following Response:

```
Http Status: 401
Response: {
  "message": "Unauthorized",
}
```

If JWT Token is valid and roomId is valid then, you will get the following Response (messages of the room in descending order of time):

```
Http Status: 200
Response: {
  "chat": [{ "_id": "", "sender": "", "receiver": "", "text": "", "time": "" }],
}
```

# More API's to be added
