
# Task Management Tool

Simple Task Management Tool has the following Lists (TODO – IN progress – Under review – Rework - Completed ) which can be Create Read Update Delete and move Task from List to another List .

## Technologies used

- Node js , Express , React js , MongoDb 


 
## Installation

- Clone the project on your local machine . 
- Install the client side :
```bash
  cd client
  npm install 
```
- Install the server side :
```bash
  cd server
  npm install 
```
- #### Create .env file in the "server" directory with env variables : 
    - ( MONGO_URI " URI to connect to your database on MongoDb Atlas " ) .
    - ( JWT_SECRET ) .
    - ( EMAIL_USERNAME " Email to be used to send verification code (outlook) is preferred ") .
    - ( EMAIL_PASSWORD ) .

- Start server side :
```bash
  cd server
  npm start
```

- Start client side :
```bash
  cd client
  npm start
```
    