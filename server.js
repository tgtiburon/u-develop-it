
const express = require("express");
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

// Express instantiate
const PORT = process.env.PORT || 3001;
const app = express();



//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// by adding /api here, we can remove it in the apiRoutes
app.use('/api', apiRoutes);


// app.get("/", (req, res) => {
//   res.json({
//     message: "Hello World!",
//   });
// });





//Default response for any other request (not found)
// this has to be below all valid gets or it will block them

app.use((req, res) => {
  res.status(404).end();
});

//Start the server after the DB connection
db.connect(err=> {
    if(err) throw err;
    console.log(`Database connected.`);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    
})


