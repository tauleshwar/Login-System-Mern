import { Request, Response } from "express";

import prisma from '../client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || ""

export async function createUser(req: Request, res: Response) {
    const { email, password } = req.body
    const hashedPwd = await bcrypt.hash(password, 10)

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user) {
            res.status(409).json({
                error: "Account already exist try to login!"
            })
            return;
        }

        const data = await prisma.user.create({
            data: { ...req.body, password: hashedPwd },
        })
        // console.log(data)
        res.status(200).json(
            {
                data: {
                    message: "user created successfully"
                }
            }

        )
    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: err
        })
    }

}


export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            res.status(404).json({ error: "Account doesn't exists please create an account" })
        }

        const validUser = user?.password ? await bcrypt.compare(password, user.password) : false;

        if (!validUser) {
            res.status(401).json({
                error: "Incorrect Credentials"
            })
        }
        const token = await jwt.sign({ email: user?.email }, JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({
            token
        })
    } catch (err) {
        res.json({
            error: "Incorrect credentials"
        })
    }
}


export async function getProfile(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        res.json({
            error: "Invalid Token"
        })
    }
    try {
        const decodedToken = token ? jwt.verify(token, JWT_SECRET) : "";
        if (typeof decodedToken === "object" && "email" in decodedToken) {
            const user = await prisma.user.findUnique({
                where: {
                    email: decodedToken.email
                }
            });
            res.status(200).json({
                email: user?.email
            })
        } else {
            res.status(400).json({
                error: "Invalid Token"
            });
        }

    } catch (err) {
        res.status(400).json({
            error: "Invalid user"
        })
    }

}