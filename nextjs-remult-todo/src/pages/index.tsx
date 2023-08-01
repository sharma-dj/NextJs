import { Task } from "../shared/Task"
import { FormEvent, useEffect, useState } from "react"
import { remult } from "remult"

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

  useEffect(() => {
    fetchTasks().then(setTasks)
  },[])
  return (
    <div className="bg-grey-50 h-screen flex flex-col items-center justify-center text-lg">
      <h1 className="text-red-500 text-6xl">Todo</h1>
      <main className="bg-white border rounded-lg shadow-lg m-5 w-screen max-w-lg">
        <form onSubmit={addTask}>
          <input 
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What you want to get done"
          />
          <button>Add</button>
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
            <input type="text" value={task.title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={saveTask}>Save</button>
            <button onClick={deleteTask}>Delete</button>
          </div>
        )
      })}
      </main>
    </div>
  )
}
