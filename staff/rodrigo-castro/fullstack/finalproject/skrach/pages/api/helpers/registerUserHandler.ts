import { Request, Response } from 'express'
const { registerUser } = require('../logic')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req: Request, res: Response) => {
    const { name, email, password } = req.body

    return registerUser(name, email, password)
        .then(() => res.status(201).send())
})