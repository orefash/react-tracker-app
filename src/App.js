import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      } catch (error) {
        console.log("fetch all error: ", error)
      }
      
    }

    getTasks()
  }, [])

  const base_url = "https://tracker-app-1.herokuapp.com"
  // const base_url = "http://localhost:5002"

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(`${base_url}/tasks`)
    const data = await res.json()
    console.log("Tasks: ", data.data.tasks)

    return data.data.tasks
  }

  const fetchTask = async (id) => {
    const res = await fetch(`${base_url}/tasks/${id}`)
    const data = await res.json()

    return data.data.task
  }

  //Add task
  const addTask = async (task) => {
    console.log("In add: ", task)

    const res = await fetch(`${base_url}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    console.log("Add task: ", data)
    if (data.status === "OK") {
      setTasks([...tasks, data.data])
    }

  }

  //Delete task
  const deleteTask = async (id) => {
    // console.log('delete', id)
    const data = await fetch(`${base_url}/tasks/${id}`, {
      method: 'DELETE'
    })
    
    console.log("Delete data: ", data.status)
    if (data.status === 200) {
      console.log("Delete status: OK")
      setTasks(
        tasks.filter((task) => task._id !== id)
      )
    }

  }

  //Toggle remider

  const toggleReminder = async (id) => {
    // console.log("TOggle", id)

    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`${base_url}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    console.log("Uodated data status: ", data.status)

    if (data.status === "OK") {
      // console.log("OK update data: ", data)
      setTasks(tasks.map((task) =>
        task._id === id
          ? { ...task, reminder: data.data.reminder } : task
      ))
    }

  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
        <Routes>
          <Route path="/" exact element={
            <Home onAdd={addTask} showAddTask={showAddTask}
              tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
          }>

          </Route>
          <Route path='/about' element={<About />}>
          </Route>

        </Routes>

        <Footer />
      </div>
    </Router>

  );
}

export default App;
