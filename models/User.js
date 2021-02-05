const validator = require("validator")
const usersCollection = require('../db').collection("users")
const bcrypt = require('bcryptjs')

let User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.validate = function() {
    if (this.data.username == "") {
        this.errors.push("Provide a username")
    }
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
        this.errors.push("Enter valid username")
    }
    if (!validator.isEmail(this.data.email)) {
        this.errors.push("Provide an email")
    }
    if (this.data.password == "") {
        this.errors.push("Provide a password")
    }
    if (this.data.password.length > 0 && this.data.password.length < 3) {
        this.errors.push("Password not long enough")
    }
    if (this.data.password.length > 50) {
        this.errors.push("Password too long")
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
        this.errors.push("Username not long enough")
    }
    if (this.data.username.length > 30) {
        this.errors.push("Username too long")
    }
}

User.prototype.cleanUp = function() {
    if (typeof(this.data.username) != "string") {
        this.data.username = ""
    }
    if (typeof(this.data.email) != "string") {
        this.data.email = ""
    }
    if (typeof(this.data.password) != "string") {
        this.data.password = ""
    }

    // get rid of bogus stuff
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        usersCollection.findOne({username: this.data.username}).then((attemptedUser) => {
            if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                resolve("Good jorb")
                 } else {
                reject("Invaild")
                }
        }).catch(function() {
            reject("Try again")
        })
    })
}

User.prototype.register = function() {
    // Step 1 Validate user data
    this.cleanUp()
    this.validate()

    // Step 2 Save user data into database
    if (!this.errors.length) {
        // hash user password
        let salt = bcrypt.genSaltSync(10)
        this.data.password = bcrypt.hashSync(this.data.password, salt)
        usersCollection.insertOne(this.data)
    }
}

module.exports = User