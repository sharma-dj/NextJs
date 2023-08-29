import { TasksController } from "../shared/TasksController"
import { Task } from "../shared/Task"
import { FormEvent, useEffect, useState } from "react"
import { remult } from "remult"
import { signIn, signOut, useSession } from "next-auth/react"

const TaskRepo = remult.repo(Task)

const fetchTasks = () => {
  return TaskRepo.find({
    orderBy: {
      completed: "asc",
    },
    where: {
      completed: undefined,
    }
  })
}

export default function Home() {
  const [tasks,setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = async (e:FormEvent) => {
    e.preventDefault();
    try {
      const newTask = await TaskRepo.insert({title : newTaskTitle});
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch (err: any) {
      alert(err.message);
    }
  }

  const setAllCompleted = async (completed: boolean) => {
    TasksController.setAllCompleted(completed);
    /*for (const task of await TaskRepo.find()) {
      await TaskRepo.save({...task,completed});
    }*/
    fetchTasks().then(setTasks);
  }

  const session = useSession();

  useEffect(() => {
    if (session.status === 'unauthenticated') signIn()
    else fetchTasks().then(setTasks)
  },[])
  return (
    <div className="bg-grey-50 h-screen flex flex-col items-center justify-center text-lg">
      <h1 className="text-red-500 text-6xl">Todo {tasks.length}</h1>
      <main className="bg-white border rounded-lg shadow-lg m-5 w-screen max-w-lg">
        <div className="flex justify-between px-6 p-2 border-b">
          Hello {session.data?.user?.name} {""}
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
        <form onSubmit={addTask} 
          className="border-b-2 px-6 gap-2 p-2 flex"
        >
          <input 
            className="w-full"
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What you want to get done"
          />
          <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></button>
        </form>
      {tasks.map((task) => {
        const setTask = (value:Task) => setTasks(tasks.map((t) => (t === task ? value : t)));
        const setCompleted = async (completed: boolean) => setTask(await TaskRepo.save({ ...task, completed }));
        const setTitle = (title: string) => setTask({...task,title});
        const saveTask = async () => {
          try {
            setTask( await TaskRepo.save(task) );
          } catch (err: any) {
            alert(err.message);
          }
        };
        const deleteTask = async () => {
          try {
            await TaskRepo.delete(task);
            setTasks(tasks.filter((t) => t !== task));
          } catch (err: any) {
            alert(err.message);
          }
        };
        return (
          <div key={task.id} className="border-b px-6 gap-2 flex items-center p-2">
            <input type="checkbox" name="complete" id={`complete-${task.id}`} checked={task.completed} className="w-6 h-6" onChange={(e) => setCompleted(e.target.checked)}/>
            <input className="w-full" type="text" value={task.title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={saveTask}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-600">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></button>
            <button onClick={deleteTask}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-600">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></button>
          </div>
        )
      })}
      <div className="border-t px-6 py-2 gap-4 flex justify-between">
        <button className="bg-blue-500 text-white px-3 py-1 font-semibold rounded-lg" onClick={() => setAllCompleted(true)}>
          Set All Completed
        </button>
        <button className="bg-blue-500 text-white px-3 py-1 font-semibold rounded-lg" onClick={() => setAllCompleted(false)}>
          Set All UnCompleted
        </button>
      </div>
      </main>
    </div>
  )
}
// Notes:
// https://heroicons.com/