import Link from "next/link"
import { prisma } from "./db"
import { TodoItem } from "./componenets/TodoItem";

function getTodos(){
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean){
  "use server"

  await prisma.todo.update({ where: {id}, data: {complete}})
}
//each page file is it's own site page, seperating the folders is who you create
//different web pages that you can route to i Next
export default async function Home(){
  const todos = await getTodos();
  //await prisma.todo.create({ data: { title: "test", complete: false}})
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2x1">Todos</h1>
        <Link className="border border-slate-300 text-slate-300
        px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700
        outline-none" href="/newPage"
        >New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map(todo =>(
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
        ))}
      </ul>
    </>)
}