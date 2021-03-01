
## How to build and run this project

* Install [**Recommended Method**] 
    * Clone this repo.
    * Make a copy of **.env.example** file to **.env**.
    * Make a copy of **tests/.env.test.example** file to **tests/.env.test**.
    * You will be able to access the api from http://localhost:3000
    * *If having any issue* then make sure 3000 port is not occupied else provide a different port in **.env** file.
    * *If having any issue* then make sure 27017 port is not occupied else provide a different port in **.env** file.
    * Create users in MongoDB and seed the data taking reference from the **addons/init-mongo.js**
    * Execute `npm start` and You will be able to access the API from http://localhost:3000
   
 * Run The Tests
    * Install node.js and npm on your local machine.
    * From the root of the project executes in terminal `npm install`.
    * *Use the latest version of node on the local machine if the build fails*.
    * To run the tests execute `npm test`.

 * Create User in MongoDb for both db and test db
    db = db.getSiblingDB(dbName);
    db.createUser({
      user: user,
      pwd: password,
      roles: [{ role: 'readWrite', db: dbName }],
    });

 ## API Examples
* WorkerEvent
    * Method and Headers
    ```
    POST /v1/worker/event HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json
    ```
    * Request Body
    ```json
      { 
        "email": "joe@example.com",
       }
    ```
