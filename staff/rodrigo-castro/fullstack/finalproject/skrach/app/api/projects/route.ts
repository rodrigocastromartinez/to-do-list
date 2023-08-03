import { NextRequest, NextResponse } from 'next/server'
import { createProject } from '../../logic'
import handleRequest from '../handlers/handleRequest'
import { extractUserId } from '../handlers/extractUserId'

interface RequestBody {
    name: string,
    owners: string[]
}

export async function POST(req: NextRequest) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const body = await req.text()
        
        const {name, owners}: RequestBody = JSON.parse(body)

        await createProject(userId, name, owners)

        return NextResponse.json({message: 'project created'}, {status: 200})
    })
}