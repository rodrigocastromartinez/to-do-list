"use client"

type TodoItemProps = {
    _id:string,
    title: string,
    complete: boolean,
    toggleTodo: (id: string, complete: boolean) => void
}

export default function TodoItem({_id: id, title, complete, toggleTodo}: TodoItemProps) {
    console.log(id)

    return (
        <li className="flex gap-1 items-center">
            <input id={id} type="checkbox" className="cursor-pointer peer" defaultChecked={complete} onChange={event => toggleTodo(id, event.target.checked)} />
            <label htmlFor={id} className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500" >
                {title}
            </label>
        </li>
    )
}