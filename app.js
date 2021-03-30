const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const markdown = require('marked')
const app = express()
const sanitizeHTML = require('sanitize-html')

let sessionOptions = session({
    secret: "JavaScript",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(flash())

app.use(function(req, res, next) {
    // make markdown work
    res.locals.filterUserHTML = function (content) {
        return sanitizeHTML(markdown(content), {allowedTags: ['p', 'br', 'ul', 'ol', 'li', 'strong', 'bold', 'i', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], allowedAttributes: {}})
    }

    // make all flash messages avaialble
    res.locals.errors = req.flash("errors")
    res.locals.success = req.flash("success")

    // make user id available on req object
    if (req.session.user) {
        req.visitorId = req.session.user._id
    } else {
        req.visitorId = 0
    }

    // make session data available to templates
    res.locals.user = req.session.user
    next()
})

const router = require('./router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.set('views', 'views') // Second value is folder name
app.set('view engine', 'ejs')

app.use('/', router)

const server = require('http').createServer(app)

const io = require('socket.io')(server)

io.on('connection', function(socket) {
    socket.on('chatMessage', function(data) {
        io.emit('chatMessageServer', {message: data.message})
    })
})

module.exports = server