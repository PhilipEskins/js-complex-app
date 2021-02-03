const validator = require("validator")
const usersCollection = require('../db').collection("users")

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
    if (this.data.password.length > 0 && this.data.password.length < 12) {
        this.errors.push("Password not long enough")
    }
    if (this.data.password.length > 100) {
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

User.prototype.login = function(callback) {
    this.cleanUp()
    usersCollection.findOne({username: this.data.username}, (err, attemptedUser) => {
        if (attemptedUser && attemptedUser.password == this.data.password) {
            callback("Good jorb")
        } else {
            callback("Invaild")
        }
    })
}

User.prototype.register = function() {
    // Step 1 Validate user data
    this.cleanUp()
    this.validate()

    // Step 2 Save user data into database
    if (!this.errors.length) {
        usersCollection.insertOne(this.data)
    }
}

module.exports = User