import { FaTimes } from "react-icons/fa"

const Task = ({ task, onDelete, onToggle }) => {


    // const handleClick = (e) => {
    //     switch (e.detail) {
    //     //   case 1:
    //     //     console.log("click");
    //     //     break;
    //       case 2:
            
    //         console.log("double click");
    //         onToggle(task.id)
    //         break;
    //       case 3:
    //         console.log("triple click");
    //         break;
    //     }
    // };


    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task._id)}>
            <h3>{task.text} 
            <FaTimes 
            style={{ color: 'red', cursor: 'pointer' }} 
            onClick={() => onDelete(task._id)}

            />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task