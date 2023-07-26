import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '../../../logic'
import { headers } from 'next/headers'
import jwt from 'jsonwebtoken'

interface RequestBody {
    name: string,
    email: string,
    password: string
}

export async function POST(req: NextRequest) {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)

        const headersList = headers()

        const contentType = headersList.get('Content-Type')

        if (contentType !== 'application/json') {
            NextResponse.json({error: 'no application/json header found'}, {status: 400})

            return
        }

        const body = await req.text()
        
        const { email, password }: RequestBody = JSON.parse(body)

        const userId = await authenticateUser(email, password)

        const payload = { sub: userId }

        const { JWT_SECRET, JWT_EXPIRATION } = process.env

        const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRATION })

        return NextResponse.json(token)
    } catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    } finally {
        await mongoose.disconnect()
    }
}