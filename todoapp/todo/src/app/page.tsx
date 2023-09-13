import Link from "next/link"
import connectToDatabase from "../../data/db"
import TodoItem from "@/components/TodoItem"
import { ObjectId } from "mongodb"

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  console.log(id, complete)

  const db = await connectToDatabase()
  
  await db.collection('todos').updateOne({_id: new ObjectId(id)}, { $set: { complete }})
  
  console.log(id, complete)
}

export default async function Home() {
  const db = await connectToDatabase()
  const todos = await db.collection('todos').find().toArray()

  console.log(todos)

  // await db.collection('todos').insertOne({title: 'gimnasio', complete: false})

  return <>
    <header className="text-2xl flex justify-between items-center">
      <h1>TODOs</h1>
      <Link href='/task' className="text-base border-2 border-solid p-2 border-slate-500 rounded-md hover:bg-slate-700">New Task</Link>
      </header>
    <ul className="pl-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  </>
}