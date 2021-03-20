const usersCollection = require('../db').db().collection("users")
const followsCollection = require('../db').db().collection("follows")
const ObjectID = require('mongodb').ObjectID

let Follow = function(followedUsername, authorId) {
    this.followedUsername = followedUsername
    this.authorId = authorId
    this.errors = []
}

Follow.prototype.cleanUp = function() {
    if (typeof(this.followedUsername) != "string") {this.followedUsername = ""}
}

Follow.prototype.validate = async function() {
    // check followedUsername in database
    let followedAccount = await usersCollection.findOne({username: this.followedUsername})
    if (followedAccount) {
        this.followedId = followedAccount._id
    } else {
        this.errors.push("Username doesn't exist")
    }
}

Follow.prototype.create = function() {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        await this.validate()
        if (!this.errors.length) {
            await followsCollection.insertOne({followedId: this.followedId, authorId: new ObjectID(this.authorId)})
            resolve()
        } else {
            reject(this.errors)
        }
    })
}

module.exports = Follow