//Importing Package
const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const { response } = require("express");


// Giving Database Path
const databasePath = path.join(__dirname, "covid19India.db");

// Calling Express and defining Acceot JSON Format.
const app = express();
app.use(express.json());

//Initialization of Database and Server.
let database = null;

const initializationOfDatabaseAndServer = async () => {
    try{
        database = await open({
            filename: databasePath,
            driver: sqlite3.Database
        });
        app.listen(3000, () => console.log("Server Running at http://localhost:3000"));
    } catch(error){
        console.log(`Database Error: ${error.message}`);
        process.exit(1);
    }
};

initializationOfDatabaseAndServer()

// Creating APIs

const convertDbObjectToResponseObject = (dbObject) =>{
    return{
        stateId: dbObject.state_id,
        stateName: dbObject.state_name,
        population: dbObject.population
    }
}


//API 1 
app.get("/states/", async (request, response) => {
    const queryToGetAllState = `
    SELECT *
    FROM state`
    const gettingAllState = await database.all(queryToGetAllState);
    response.send(
        gettingAllState.map((each) =>
          convertDbObjectToResponseObject(each)
        )
      );
});