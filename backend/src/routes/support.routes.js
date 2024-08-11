const controller = require('../controllers/support.controller')


module.exports = (app) => {
    const router = require('express').Router()
    router.post('/form', controller.add)
    router.post('/fetchimage', controller.fetchimage)
    router.post('/fetchimage/id', controller.fetchPerticularimage)
    router.post('/fetchimage/similarimage', controller.fetchsimilarimage)
    router.post('/signup', controller.signup)
    router.post('/login', controller.login)
    router.post('/addtowishlist', controller.addtowishlist)
    router.post('/updateCart', controller.updateCart)
    router.post('/getCartProducts', controller.getCartProducts)
    router.post('/getWishlistDetails', controller.getWishlistDetails)
    router.post('/orderedlist', controller.orderedlist)
    router.post('/userdetails', controller.userdetails)
    router.post('/resetPassword', controller.resetPassword)
    router.post('/forgetpassword', controller.forgetpassword)
    router.post('/orderplaced', controller.orderplaced)
    
    
    app.use('/api', router)
}
