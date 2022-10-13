const route = require('express').Router()
const authController = require('../controller/authController')
const auth = require('../middleware/auth')


route.post(`/register`, authController.register)
route.post(`/login`, authController.login)
route.get(`/logout`, authController.logout)
route.get(`/refreshToken`, authController.refreshToken)
route.get(`/userinfo`, auth, authController.getUserInfo)

route.patch(`/resetPassword`, authController.resetPassword)
route.patch(`/updateProfile/:id`, auth, authController.profileUpdate)



module.exports = route