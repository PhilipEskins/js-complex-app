const postsCollection = require('../db').db().collection("posts")
const followsCollection = require('../db').db().collection("follows")
const ObjectID = require('mongodb').ObjectID
const User = require('./User')
const sanitizeHTML = require('sanitize-html')

let Post = function(data, userid, requestedPostId) {
    this.data = data
    this.userid = userid
    this.errors = []
    this.requestedPostId = requestedPostId
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
        title: sanitizeHTML(this.data.title.trim(), {allowedTags: [], allowedAttributes: {}}),
        body: sanitizeHTML(this.data.body.trim(), {allowedTags: [], allowedAttributes: {}}),
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
            postsCollection.insertOne(this.data).then((info) => {
                resolve(info.ops[0]._id)
            }).catch(() => {
                this.errors.push("Try again")
                reject(this.errors)
            })
        } else {
            reject(this.errors)
        }
    })
}

Post.prototype.update = function() {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await Post.findSingleById(this.requestedPostId, this.userid)
            console.log(this.userid)
            if (post.isVisitorOwner) {
                //update db
                let status = await this.actuallyUpdate()
                resolve(status)
            } else {
                reject()
            }
        } catch {
            reject()
        }
    })
}

Post.prototype.actuallyUpdate = function() {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        this.validate()
        if (!this.errors.length) {
            await postsCollection.findOneAndUpdate({_id: new ObjectID(this.requestedPostId)}, {$set: {title: this.data.title, body: this.data.body}})
            resolve("success")
        } else {
            resolve("failure")
        }
    })
}

Post.reusablePostQuery = function(uniqueOperations, visitorId, finalOperations = []) {
    return new Promise(async function(resolve, reject) {
        let aggOperations = uniqueOperations.concat([
            {$lookup: {from: "users", localField: "author", foreignField: "_id", as: "authorDocument"}},
            {$project: {
                title: 1,
                body: 1,
                createdDate: 1,
                authorId: "$author",
                author: {$arrayElemAt: ["$authorDocument", 0]}
            }}
        ]).concat(finalOperations)

        let posts = await postsCollection.aggregate(aggOperations).toArray()

        // clean up author
        posts = posts.map(function(post) {
            post.isVisitorOwner = post.authorId.equals(visitorId)
            post.authorId = undefined

            post.author = {
                username: post.author.username,
                avatar: new User(post.author, true).avatar
            }
            return post
        })
        resolve(posts)
    })
}

Post.findSingleById = function(id, visitorId) {
    return new Promise(async function(resolve, reject) {
        if (typeof(id) != "string" || !ObjectID.isValid(id)) {
            reject()
            return
        }
        let posts = await Post.reusablePostQuery([
            {$match: {_id: new ObjectID(id)}}
        ], visitorId)

        if (posts.length) {
            resolve(posts[0])
        } else {
            reject()
        }
    })
}

Post.findByAuthorId = function(authorId) {
    return Post.reusablePostQuery([
        {$match: {author: authorId}},
        {$sort: {createdDate: -1}}
    ])
}

Post.delete = function(postIdToDelete, currentUserId) {
    return new Promise(async (resolve, reject) => {
        try{
            let post = await Post.findSingleById(postIdToDelete, currentUserId)
            if (post.isVisitorOwner) {
                await postsCollection.deleteOne({_id: new ObjectID(postIdToDelete)})
                resolve()
            } else {
                reject()
            }
        } catch {
            reject()
        }
    }) 
}

Post.search = function(searchTerm) {
    return new Promise(async (resolve, reject) => {
        if (typeof(searchTerm) == 'string') {
            let posts = await Post.reusablePostQuery([
                {$match: {$text: {$search: searchTerm}}}
            ], undefined, [{$sort: {score: {$meta: "textScore"}}}])
            resolve(posts)
        } else {
            reject()
        }
    })
}

Post.countPostsByAuthor = function(id) {
    return new Promise(async (resolve, reject) => {
        let postCount = await postsCollection.countDocuments({author: id})
        resolve(postCount)
    })
}

Post.getFeed = async function(id) {
    // array of ids user follows
    let followedUsers = await followsCollection.find({authorId: new ObjectID(id)}).toArray()
    followedUsers = followedUsers.map(followDoc => {
        return followDoc.followedId
    })

    // posts for author in array
    return Post.reusablePostQuery([
        {$match: {author: {$in: followedUsers}}},
        {$sort: {createdDate: -1}}
    ])
}

module.exports = Post