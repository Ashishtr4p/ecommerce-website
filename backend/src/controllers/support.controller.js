const userService = require('../services/support.service');
const error_handler = require('../utilities/error_handler')
const logger = require('../utilities/logger')
const helper = require('../utilities/helper')
const entity_type = 'user'


exports.fetchPerticularimageidd = async (req, res) => {
    const route = 'fetchPerticularimageidd'
    try {
        let abcd = await userService.fetchPerticularimageidd(res,req.body);
        return abcd;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.add = async (req, res) => {
    const route = 'add'
    try {
        let abcd = await userService.add(res,req.body);
        return abcd;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.fetchimage = async (req, res) => {
    const route = 'fetchimage'
    try {
        let abcd = await userService.fetchimage(res,req.body);
        return abcd;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.fetchimage = async (req, res) => {
    const route = 'fetchimage'
    try {
        let abcd = await userService.fetchimage(res,req.body);
        return abcd;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.fetchPerticularimage = async (req, res) => {
    const route = 'fetchPerticularimage'
    try {
        let abcd = await userService.fetchPerticularimage(res,req.body);
        return abcd;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}

exports.fetchsimilarimage = async (req, res) => {
    const route = 'fetchsimilarimage'
    try {
        let abcd = await userService.fetchsimilarimage(res,req.body);
        return abcd;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.signup = async (req, res) => {
    const route = 'signup'
    try {
        const dataformapi = await userService.signup(res,req.body);
        return dataformapi;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.login = async (req, res) => {
    const route = 'login'
    try {
        const dataformapi = await userService.login(res,req.body);
        return dataformapi;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.addtowishlist = async (req, res) => {
    const route = 'addtowishlist'
    try {
        const dataformapi = await userService.addtowishlist(res,req.body);
        return dataformapi;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.updateCart = async (req, res) => {
    const route = 'updateCart'
    try {
        const dataformapi = await userService.updateCart(res,req.body);
        return dataformapi;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.getCartProducts = async (req, res) => {
    const route = 'getCartProducts'
    try {
        const dataformapi = await userService.getCartProducts(res,req.body);
        return dataformapi;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.getWishlistDetails = async (req, res) => {
    const route = 'getWishlistDetails'
    try {
        const dataformapi = await userService.getWishlistDetails(res,req.body);
        return dataformapi;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.orderedlist = async (req, res) => {
    const route = 'orderedlist'
    try {
        const dataformapi = await userService.orderedlist(res,req.body);
        return dataformapi;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.userdetails = async (req, res) => {
    const route = 'userdetails'
    try {
        const dataformapi = await userService.userdetails(res,req.body);
        return dataformapi;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.resetPassword = async (req, res) => {
    const route = 'resetPassword'
    try {
        const dataformapi = await userService.resetPassword(res,req.body);
        return dataformapi;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.forgetpassword = async (req, res) => {
    const route = 'forgetpassword'
    try {
        const dataformapi = await userService.forgetpassword(res,req.body);
        return dataformapi;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
exports.orderplaced = async (req, res) => {
    const route = 'orderplaced'
    try {
        const dataformapi = await userService.orderplaced(res,req.body);
        return dataformapi;
    } catch (error) {
        logger.log(error)
        error_handler.handle_controller_error({
            request: req,
            response: res,
            route: route,
            entity_type: entity_type,
            error: error,
        })
    }
}
