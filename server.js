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

// // Lists all candidates
// db.query(`SELECT * FROM candidates`, (err, rows)=> {
//     console.log(rows);
// });



// // Gets a single candidate by their id
// db.query(`SELECT * FROM candidates WHERE id =1`, (err, row)=> {
//     if(err) {
//         console.log(err);
//     }
//     console.log(row);
// });


// Query for delete operation
// ? denotes a placeholder, making this a prepared statement.
// can execute the same statement with different values
// // 1 goes into the ? spot
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//                 VALUES (?,?,?,?)`;
// // params has to match VALUES
// const params = [1,'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result)=> {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//Default response for any other request (not found)   
// this has to be below all valid gets or it will block them

app.use((req,res)=> {
    res.status(404).end();
})






app.listen(PORT, ()=> {

    console.log(`Server running on port ${PORT}`);
})