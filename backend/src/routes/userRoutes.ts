import { Router, Request, Response } from "express";
import { validateSchema } from '../lib/middlewares/userdataValidation'
import { createUser, getProfile, loginUser } from '../controllers/user.route'
import { createUserSchema } from '../lib/schemas/user.schema'
const router = Router()

router.get('/', async (req, res) => {

    res.json({
        loginPath:"/api/user/login",
        signupPath:"/api/user/signup"
    })
})

router.post('/signup', validateSchema(createUserSchema), createUser)
router.post('/login', validateSchema(createUserSchema), loginUser)

router.get('/profile', getProfile)

export default router