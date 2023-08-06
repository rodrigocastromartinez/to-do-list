import { NextRequest, NextResponse } from "next/server"
import handleRequest from "../../../handlers/handleRequest"
import retrieveProject from '../../../../logic/retrieveProject'
import { extractUserId } from "../../../handlers/extractUserId"

export async function GET(req: NextRequest, { params }) {
    return handleRequest(async () => {
        const { projectId } = params
        
        const userId = extractUserId(req)

        const post = await retrieveProject(userId, projectId)

        return NextResponse.json(post)
    })
}