const Post = require('../models/Post')

exports.viewCreateScreen = function (req, res) {
    res.render('create-post')
}

exports.create = function(req, res) {
    let post = new Post(req.body, req.session.user._id)
    post.create().then(function() {
        res.send("New post")
    }).catch(function (errors) {
        res.send(errors)
    })
}

exports.viewSingle = async function(req, res) {
    try {
        let post = await Post.findSingleById(req.params.id, req.visitorId)
        res.render('single-post-screen', {post: post})
    } catch {
        res.render('404')
    }
}

exports.viewEditScreen = async function(req, res) {
    try{
        let post = await Post.findSingleById(req.params.id)
        res.render("edit-post", {post: post})
    } catch {
        res.render('404')
    }
}

exports.edit = function(req, res) {
    let post = new Post(req.body, req.visitorId, req.params.id)
    post.update().then((status) => {
        // the post was updated or visitor had permission but had error
        if (status == "success") {
            // post was updated
            req.flash('success', "Post updated")
            req.session.save(function () {
                res.redirect(`/post/${req.params.id}/edit`)
            })
        } else {
            // post wasn't updated
            post.errors.forEach(function(errors) {
                req.flash("errors", error)
            })
            req.session.save(function() {
                res.redirect(`/post/${req.params.id}/edit`)
            })
        }
    }).catch(() => {
        // post with id not found or visitor isn't owner
        req.flash('errors', 'Denied')
        req.session.save(function() {
            res.redirect("/")
        })
    })
}