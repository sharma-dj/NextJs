import { Task } from "../shared/Task"
import { useEffect, useState } from "react"
import { remult } from "remult"

const TaskRepo = remult.repo(Task)

const fetchTasks = () => {
  return TaskRepo.find()
}

export default function Home() {
  const [tasks,setTasks] = useState<Task[]>([])
  useEffect(() => {
    fetchTasks().then(setTasks)
  },[])
  return (
    <div className="bg-grey-50 h-screen flex flex-col items-center justify-center text-lg">
      <h1 className="text-red-500 text-6xl">Todo</h1>
      <main className="bg-white border rounded-lg shadow-lg m-5 w-screen max-w-lg">
      {tasks.map((task) => {
        return (
          <div key={task.id} className="border-b px-6 gap-2 flex items-center p-2">
            <input type="checkbox" name="complete" id={`complete-${task.id}`} checked={task.completed} className="w-6 h-6"/>
            {task.title}
          </div>
        )
      })}
      </main>
    </div>
  )
}
