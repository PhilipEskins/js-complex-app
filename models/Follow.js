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

Follow.prototype.validate = async function(action) {
    // check followedUsername in database
    let followedAccount = await usersCollection.findOne({username: this.followedUsername})
    if (followedAccount) {
        this.followedId = followedAccount._id
    } else {
        this.errors.push("Username doesn't exist")
    }

    let doesFollowAlreadyExist = await followsCollection.findOne({followedId: this.followedId, authorId: new ObjectID(this.authorId)})

    if (action == "create") {
        if (doesFollowAlreadyExist) {this.errors.push("Already following")}
    }

    if (action == "delete") {
        if (!doesFollowAlreadyExist) {this.errors.push("Not currently following")}
    }

    // don't follow yourself
    if (this.followedId.equals(this.authorId)) {this.errors.push("You can't follow yourself")}
}

Follow.prototype.create = function() {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        await this.validate('create')
        if (!this.errors.length) {
            await followsCollection.insertOne({followedId: this.followedId, authorId: new ObjectID(this.authorId)})
            resolve()
        } else {
            reject(this.errors)
        }
    })
}

Follow.prototype.delete = function() {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        await this.validate('delete')
        if (!this.errors.length) {
            await followsCollection.deleteOne({followedId: this.followedId, authorId: new ObjectID(this.authorId)})
            resolve()
        } else {
            reject(this.errors)
        }
    })
}

Follow.isVisitorFollowing = async function(followedId, visitorId) {
    let followDoc = await followsCollection.findOne({followedId: followedId, authorId: new ObjectID(visitorId)})
    if (followDoc) {
        return true
    } else {
        return false
    }
}

module.exports = Follow