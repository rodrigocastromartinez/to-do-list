import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '../../logic'
import handleRequest from '../handlers/handleRequest'
import { User } from '../../data/models'

interface RequestBody {
    name: string,
    email: string,
    password: string
}

export async function POST(req: NextRequest) {
    return handleRequest(async () => {
        const body = await req.text()
        
        const {name, email, password}: RequestBody = JSON.parse(body)

        await registerUser(name, email, password)

        return NextResponse.json({message: 'user registered'}, {status: 200})
    })
}