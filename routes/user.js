const express = require('express')
const mysql = require('mysql')

const router = express.Router()
router.get('/messages', (req, res) => {
    console.log("Show me messages!")
    res.end()
})

router.post('/user_create', (req, res) => {
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name
    const email = req.body.create_email

    const queryString = "INSERT INTO users (name, lastname, email) VALUES (?, ?, ?)"
    getConnection().query(queryString, [firstName, lastName, email], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new user:" + err)
            res.send(500)
            return
        }

        console.log("Inserted a new user with id: ", results.insertId)
        res.end()
    })
})

router.get("/user/:id", (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const id = req.params.id
    const query = "SELECT * FROM users WHERE id = ?"
    connection.query(query, [id], (err, rows, fields) => {
        if (err) {
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
})

router.get("/users", (req, res) => {
    const connection = getConnection()

    const query = "SELECT * FROM users"
    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log("Something went wrong: " + err)
            res.sendStatus(500)
            return
        }

        res.json(rows)
    })
})

const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: 'Kaas@360!420',
    database: 'api'
})

function getConnection() {
    return pool
}

module.exports = router