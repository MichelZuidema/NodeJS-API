const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('short'))

app.get("/users/:id", (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Kaas@360!420',
        database: 'api'
    })

    const id = req.params.id
    const query = "SELECT * FROM users WHERE id = ?"
    connection.query(query, [id], (err, rows, fields) => {
        if(err) {
            console.log("Failed to query: " + err)
            res.sendStatus(500)
            res.end()
            return
        }

        console.log("Fetching Users")

        const users = rows.map((row) => {
            return {
                firstName: row.name,
                lastName: row.lastname,
                email: row.email
            }
        })

        res.json(users)
    })

    //res.end()
})

app.get("/", (req, res) => {
    res.send("Forbidden")
})

app.get("/users", (req, res) => {
    const user1 = {firstName: 'Michel', lastName: 'Zuidema'}
    const user2 = {firstName: 'Cody', lastName: 'Bellinger'}

    res.json([user1, user2])
    res.send("Users")
})

app.listen(3003, () => {
    console.log("Server is up and listening on port 3003.")
})