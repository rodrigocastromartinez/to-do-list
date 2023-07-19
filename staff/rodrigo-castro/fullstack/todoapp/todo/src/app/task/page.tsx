import Link from "next/link"
import connectToDatabase from "../../../data/db"
import { redirect } from "next/navigation"

async function createTodo(data: FormData) {
    "use server"

    const title = data.get("title")?.valueOf()

    if(typeof title !== 'string' || title.length === 0){
        throw new Error('Invalid Title')
    }

    console.log(title)

    const db = await connectToDatabase()

    const todos = await db.collection('todos').insertOne({title, complete: false})

    redirect('/')
}

export default function Task() {
    return <>
    <header className="text-2xl flex justify-between items-center mb-4">
      <h1>New Task</h1>
      </header>
      <form action={createTodo} className="flex flex-col gap-2" >
        <input className="p-2 bg-black border-slate-500 border-solid border-2 rounded-md focus:outline-none focus:border-slate-400" placeholder="Add your new task" name="title" type="text"></input>
        <div className="flex gap-2 justify-end" >
            <Link className="p-2 bg-black border-slate-500 border-solid border-2 rounded-md" href=".." >Back</Link>
            <button className="p-2 bg-black border-slate-500 border-solid border-2 rounded-md" type="submit" >Save</button>
        </div>
      </form>
  </>
}