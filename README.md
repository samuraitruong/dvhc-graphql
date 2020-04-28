# dvhc-graphql
Simples graphql &amp; rest api 

## Run local

add below to file .env in the root directory
```MONGO_CONNECTION_STRING=mongodb+srv://user_ro:o7vv7XCpbHwJxwVW@cluster0-b0cl8.gcp.mongodb.net/dvch?retryWrites=true&w=majority```

This is readonly user so it will not able to modify data

run local host in development mode

```
yarn dev
```

Default port  is 5000, after the command successul you can access the site from http://localhost:5000

## Build 

```
yarn build

```

## Run production

```
node dist/
```

## Hosted environment
API: https://dvhc.herokuapp.com/graphql -> POST
Playground: https://dvhc.herokuapp.com/playground


## Postman document
Document: https://documenter.getpostman.com/view/10922564/SzfDvj8k

Collection: https://www.getpostman.com/collections/f03deadfb76ca1e9708d



