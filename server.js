const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//Express Middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.json());



app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});



//Default response for any other request (not found)   
// this has to be below all valid gets or it will block them

app.use((req,res)=> {
    res.status(404).end();
})






app.listen(PORT, ()=> {

    console.log(`Server running on port ${PORT}`);
})