const express = require('express')
const app = express()
const morgan = require('morgan')

const bodyParser = require('body-parser')

app.use(express.static('./public'))
app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.send("Forbidden")
})

const router = require('./routes/user.js')

app.use(router  )

app.listen(3003, () => {
    console.log("Server is up and listening on port 3003.")
})