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

        await createProject(userId)

        return NextResponse.json({message: 'project created'}, {status: 200})
    })
}