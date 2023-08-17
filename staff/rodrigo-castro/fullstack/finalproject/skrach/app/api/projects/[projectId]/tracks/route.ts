import { NextRequest, NextResponse } from 'next/server'
import createTrack from '../../../../logic/createTrack'
import handleRequest from '../../../handlers/handleRequest'
import { extractUserId } from '../../../handlers/extractUserId'
import updateTitle from '../../../../logic/updateTitle'

interface RequestBody {
    title: string
}

export async function POST(req: NextRequest, { params }: { params: any}) {
    return handleRequest(async () => {
        const userId = extractUserId(req)
        
        const { projectId } = params
        
        const track = await createTrack(userId, projectId)
        
        return NextResponse.json({message: 'track created', id: track.id}, {status: 200})
    })
}
export async function PATCH(req: NextRequest, { params }: { params: any}) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const { projectId } = params

        const body = await req.text()
        
        const { title }: RequestBody = JSON.parse(body)

        await updateTitle(userId, projectId, title)

        return NextResponse.json({message: 'title updated'}, {status: 200})
    })
}
