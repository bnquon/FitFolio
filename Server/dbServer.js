const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");

// First connection pool
const db = mysql.createPool({
   connectionLimit: 100,
   host: "127.0.0.1",
   user: "newuser",
   password: "password1#",
   database: "userDB",
   port: "3306"
});

// Check the connection
db.getConnection((err, connection) => {
   if (err) throw err;
   console.log("DB connected successfully: " + connection.threadId);
   connection.release(); // Release the connection back to the pool
});

// Use dotenv for environment variables
require("dotenv").config();

// Access environment variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

// Second connection pool for a different environment
const dbEnv = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
});

// Use 3000 as the default port if PORT is not set
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Started on port ${port}...`));

app.use(express.json());

// Middleware to read req.body.<params>
// CREATE USER
app.post("/createUser", async (req, res) => {
   const user = req.body.name;
   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   db.getConnection(async (err, connection) => {
      if (err) throw err;

      const sqlSearch = "SELECT * FROM userTable WHERE user = ?";
      const search_query = mysql.format(sqlSearch, [user]);

      const sqlInsert = "INSERT INTO userTable VALUES (0,?,?)";
      const insert_query = mysql.format(sqlInsert, [user, hashedPassword]);

      // ? will be replaced by values
      // ?? will be replaced by string
      await connection.query(search_query, async (err, result) => {
         if (err) throw err;

         console.log("------> Search Results");
         console.log(result.length);

         if (result.length != 0) {
            connection.release();
            console.log("------> User already exists");
            res.sendStatus(409);
         } else {
            await connection.query(insert_query, (err, result) => {
               connection.release();
               if (err) throw err;

               console.log("--------> Created new User");
               console.log(result.insertId);
               res.sendStatus(201);
            });
         }
      }); // end of connection.query()
   }); // end of db.getConnection()
}); // end of app.post()

//LOGIN (AUTHENTICATE USER)
app.post("/login", (req, res)=> {
const user = req.body.name
const password = req.body.password
db.getConnection ( async (err, connection)=> {
    if (err) throw (err)
    const sqlSearch = "Select * from userTable where user = ?"
    const search_query = mysql.format(sqlSearch,[user])
    await connection.query (search_query, async (err, result) => {
        connection.release()
      
      if (err) throw (err)
      if (result.length == 0) {
       console.log("--------> User does not exist")
       res.sendStatus(404)
      } 
      else {
        const hashedPassword = result[0].password
         //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
        res.send(`${user} is logged in!`)
        } 
        else {
        console.log("---------> Password Incorrect")
        res.send("Password incorrect!")
        } //end of bcrypt.compare()
      }//end of User exists i.e. results.length==0
    }) //end of connection.query()
}) //end of db.connection()
}) //end of app.post()