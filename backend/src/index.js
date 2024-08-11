'use strict'
require('dotenv').config()

const express = require('express')

const logger = require('./utilities/logger')

const app = express()
 
module.exports.start_listening = () => {
    return new Promise((resolve, reject) => {
        try {
            const port = process.env.PORT || 5016
            var server = app.listen(port, () => {
                logger.log(
                    `website is running on the port ${port}`
                )
                app.emit('server_started')
            })
            module.exports.server = server
            resolve(app)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.fireup_server = async () => {
    var app = await this.start_listening()
    return app
}

module.exports.set_routes = () => {
    return new Promise((resolve, reject) => {
        try {
            require('./routes/support.routes')(app)
            //Set the base route
            app.get('/api', (req, res) => {
                res.send({
                    message:
                        'website [Service version - 0.1]',
                })
            })
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

exports.set_middlewares = () => {
    return new Promise((resolve, reject) => {
        try {
            const bodyParser = require('body-parser')
            const cookieParser = require('cookie-parser');
            const cors = require('cors');
            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({ extended: true }))
            app.use(express.json())
            app.use(cookieParser());

            //CORS handling
            app.use(cors(
                {
                    origin: [process.env.ORIGIN],
                    methods: ["POST", "GET", "PUT"],
                    credentials: true
                }
            ));
            app.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Methods", 'GET,PUT,DELETE,POST');
                next();
            });

            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

function start_server() {
    ;(async () => {
        // ----   Function below is to the usage of middlewares ---- //
        await exports.set_middlewares()

        // ----   Function below is to set up the routes ---- //
        await exports.set_routes()
        await exports.fireup_server()
    })()
}

if (process.env.NODE_ENV !== 'test') {
    start_server()
}

module.exports.app = app
