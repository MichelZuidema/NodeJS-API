const express = require('express')
const app = express()

app.get("/", (req, res) => {
    console.log("Responding to Root")
    res.send("joe")
})

app.get("/users", (req, res) => {
    res.send("Users")
})

app.listen(3003, () => {
    console.log("Server is up and listening on port 3003.")
})