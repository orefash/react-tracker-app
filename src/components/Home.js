
import Tasks from "./Tasks";
import AddTask from "./AddTask";

function Home({ onAdd, showAddTask, tasks, onDelete, onToggle }) {
    return (
        <div>
            {showAddTask && <AddTask onAdd={onAdd} />}
              {
                tasks.length > 0 ? (
                  <Tasks tasks={tasks} onDelete={onDelete} onToggle={onToggle} />
                ) : ("No Tasks to display")
              }
        </div>
    )
}

export default Home