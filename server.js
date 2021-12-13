const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck');
const res = require('express/lib/response');
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

// Get all candidates
app.get('/api/candidates', (req, res)=> {

    const sql = `SELECT * FROM candidates`;

    // Lists all candidates
    db.query(sql, (err, rows)=> {

        if(err) {
            res.status(500).json({error:err.message});
            return; // leave function

        }
        res.json({
            message:'success',
            data: rows
        });
       
    });
});



// Gets a single candidate by their id
app.get('/api/candidate/:id', (req, res)=> {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];


    db.query(sql, params, (err, row)=> {
        if(err) {
            res.status(400).json({ error: err.message});
            return;
        }
       res.json({
        message: 'success',
        data : row

       });
    });
});



// Query for delete operation
// ? denotes a placeholder, making this a prepared statement.
// can execute the same statement with different values
//  1 goes into the ? spot

app.delete('/api/candidate/:id', (req, res) => {

    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.statusMessage(400).json({ error: res.message });
            // If there are no affected rows that means a candidate was not found
        } else if(!result.affectedRows) { 
            res.json({
                message : 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });

        }
    
    });
});


// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    // inputCheck function verifies if body param has all we need to create
    // a candidate
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                VALUES (?,?,?)`;
    // params has to match VALUES
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result)=> {
        if(err) {
            res.status(400).json({ error:err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });

    


});



//Default response for any other request (not found)   
// this has to be below all valid gets or it will block them

app.use((req,res)=> {
    res.status(404).end();
});






app.listen(PORT, ()=> {

    console.log(`Server running on port ${PORT}`);
});