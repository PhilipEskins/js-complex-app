const postsCollection = require('../db').db().collection("posts")
const ObjectID = require('mongodb').ObjectID

let Post = function(data, userid) {
    this.data = data
    this.userid = userid
    this.errors = []
}

Post.prototype.cleanUp = function () {
    if (typeof(this.data.title) != 'string') {
        this.data.title = ""
    }
    if (typeof(this.data.body) != 'string') {
        this.data.body = ""
    }

    // get rid of bogus properties
    this.data = {
        title: this.data.title.trim(),
        body: this.data.body.trim(),
        createdDate: new Date(),
        author: ObjectID(this.userid)
    }
}

Post.prototype.validate = function () {
    if (this.data.title == "") {
        this.errors.push("Title needed")
    }
    if (this.data.body == "") {
        this.errors.push("Body needed")
    }
}

Post.prototype.create = function () {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        this.validate()
        if (!this.errors.length) {
            // save post here
            postsCollection.insertOne(this.data).then(() => {
                resolve()
            }).catch(() => {
                this.errors.push("Try again")
                reject(this.errors)
            })
        } else {
            reject(this.errors)
        }
    })
}

module.exports = Post