const {MongoClient} = require('mongodb');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT;

async function main()
{
    //const uri = process.env.MONGO_URI;
    const uri = "mongodb+srv://admin:AxCGZEcHFqJJZ0jA@cluster1.yui3f.mongodb.net/UsersDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get("/", (req, res) => {
        res.json({ message: "Testing application." });
      });

    try 
    {
        await client.connect();

        await listDatabases(client); 
    } 
    catch (e) 
    {
        console.error(e);    
    }
    finally
    {
        await client.close();
    }
}
main().catch(console.error);

async function listDatabases(client)
{
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}