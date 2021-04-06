const validator = require("validator")
const usersCollection = require('../db').db().collection("users")
const bcrypt = require('bcryptjs')
const md5 = require('md5')

let User = function(data, getAvatar) {
    this.data = data
    this.errors = []
    if (getAvatar == undefined) {getAvatar = false}
    if (getAvatar) {this.getAvatar()}
}

User.prototype.validate = function() {
    return new Promise(async (resolve, reject) => {
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
    
        // Only if username is valid, check if unique
        if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
            let usernameExists = await usersCollection.findOne({username: this.data.username})
            if (usernameExists) {
                this.errors.push("Username Taken")
            }
        }
    
        // Only if email is valid, check if unique
        if (validator.isEmail(this.data.email)) {
            let emailExists = await usersCollection.findOne({email: this.data.email})
            if (emailExists) {
                this.errors.push("Email Taken")
            }
        }
        resolve()
    })
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
                this.data = attemptedUser
                this.getAvatar()
                resolve("Good jorb")
                 } else {
                reject("Invaild login")
                }
        }).catch(function() {
            reject("Try again")
        })
    })
}

User.prototype.register = function() {
    return new Promise(async (resolve, reject) => {
        // Step 1 Validate user data
        this.cleanUp()
        await this.validate()
    
        // Step 2 Save user data into database
        if (!this.errors.length) {
            // hash user password
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data)
            this.getAvatar()
            resolve()
        } else {
            reject(this.errors)
        }
    })
}

User.prototype.getAvatar = function() {
    this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}/?s=128`
}

User.findByUsername = function(username) {
    return new Promise(function(resolve, reject) {
        if (typeof(username) != 'string') {
            reject()
            return
        }
        usersCollection.findOne({username: username}).then(function(userDoc) {
            if (userDoc) {
                userDoc = new User(userDoc, true)
                userDoc = {
                    _id: userDoc.data._id,
                    username: userDoc.data.username,
                    avatar: userDoc.avatar
                }
                resolve(userDoc)
            } else {
                reject()
            }
        }).catch(function() {
            reject()
        })
    })
}

User.doesEmailExist = function(email) {
    return new Promise(async function(resolve, reject) {
        if (typeof(email) != 'string') {
            resolve(false)
            return
        }
    
        let user = await usersCollection.findOne({email: email})
        if (user) {
            resolve(true)
        } else {
            resolve(false)
        }
    })
}

module.exports = User