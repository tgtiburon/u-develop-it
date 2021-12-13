const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();


//Express Middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//Connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '2021MySQL2021!',
        database: 'election'
    },
    console.log('Connected to the election database.')
);



app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});


db.query(`SELECT * FROM candidates`, (err, rows)=> {
    console.log(rows);
});

//Default response for any other request (not found)   
// this has to be below all valid gets or it will block them

app.use((req,res)=> {
    res.status(404).end();
})






app.listen(PORT, ()=> {

    console.log(`Server running on port ${PORT}`);
})