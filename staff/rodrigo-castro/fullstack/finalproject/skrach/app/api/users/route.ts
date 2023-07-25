import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import registerUser from '../../logic/registerUser'
import { headers } from 'next/headers'

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
        
        const {name, email, password}: RequestBody = JSON.parse(body)

        await registerUser(name, email, password)

        return NextResponse.json({message: 'user registered'}, {status: 200})
    } catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    } finally {
        await mongoose.disconnect()
    }
}