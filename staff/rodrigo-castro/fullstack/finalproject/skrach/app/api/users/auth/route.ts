import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '../../../logic'
import { headers } from 'next/headers'
import jwt from 'jsonwebtoken'
import dbConnect from '../../../data/dbConnect'
import handleConnect from '../../handlers/handleRequest'

interface RequestBody {
    name: string,
    email: string,
    password: string
}

export async function POST(req: NextRequest) {
    console.count()
    return handleConnect( async () => {
        console.count()
        const body = await req.text()

        console.count()
        
        const { email, password }: RequestBody = JSON.parse(body)

        const userId = await authenticateUser(email, password)

        const payload = { sub: userId }

        const { JWT_SECRET, JWT_EXPIRATION } = process.env

        const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRATION })
        
        return NextResponse.json(token)
    })
    
    // try {
    //     await dbConnect()

    //     const headersList = headers()

    //     const contentType = headersList.get('Content-Type')

    //     if (contentType !== 'application/json') {
    //         NextResponse.json({error: 'no application/json header found'}, {status: 400})

    //         return
    //     }

    //     const body = await req.text()
        
    //     const { email, password }: RequestBody = JSON.parse(body)

    //     const userId = await authenticateUser(email, password)

    //     const payload = { sub: userId }

    //     const { JWT_SECRET, JWT_EXPIRATION } = process.env

    //     const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRATION })

    //     return NextResponse.json(token)
    // } catch(error: any){
    //     return NextResponse.json({error: error.message}, {status: 500})
    // }
}