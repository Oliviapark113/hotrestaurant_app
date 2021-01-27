const path = require('path')
const fs = require('fs');

const express = require('express')
const { fstat } = require('fs')
//exports all express function...
const app = express()


//copy and paste use for HW etc  any request ..boiler plate ..
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//for heroku use ..
const PORT = process.env.PORT || 3000 //3000 is express.js suggestion .. 

const tables = [];
const waitlist = [];

app.use(express.static("public"))

//create Home Route 

// * Create the front-end (visuals) for home page, reservation form, and reservation views.
// * Create a basic server using Express.JS
// * Create a few array variables that will hold the data
// * Create a set of routes for getting and posting table data
// * Create a set of routes for displaying the HTML pages
// * Use jQuery to run AJAX calls to GET and POST data from users to the Express server
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname + '/public/index.html'))
})
app.get('/views', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views.html'))
})
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/form.html'))
})

// * Create a set of routes for getting and posting table data
app.get('/api/tables', (req, res) => {
    res.json(tables)
   
})


app.post('/api/tables', (req, res) => {
    const newTable = req.body

    console.log(newTable)
    newTable.phoneNumber = newTable.phoneNumber.replace(/ /g, '').toString()
    newTable.email = newTable.email.toLowerCase()

    if (tables.length <= 5) {

        tables.push(newTable)

    }
    else if (tables.length >= 6) {

        waitlist.push(newTable)

    }

    res.status(200).send()
})



//then we need to listen our server ..
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})