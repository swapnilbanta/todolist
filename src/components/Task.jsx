import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask, moveTask } from '../features/todoSlice';
import '../styles.css';

function Task({ task, listId, index, moveTaskInList }) {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, listId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (item, monitor) => {
      if (item.id === task.id) return;
      if (item.listId === listId) {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) return;

        moveTaskInList(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
    drop: (item) => {
      if (item.listId !== listId) {
        dispatch(
          moveTask({
            fromListId: item.listId,
            toListId: listId,
            taskId: item.id,
            newIndex: index,
          })
        );
      }
    },
  });

  // Function to generate a color based on task text (for consistent colors)
  const getColorFromText = (text) => {
    const colors = [
      '#FF5F56', // Red
      '#FFBD2E', // Yellow
      '#27C93F', // Green
      '#2693FF', // Blue
      '#CB66F7', // Purple
    ];
    const hash = text.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`task ${task.completed ? 'completed' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {/* macOS-style colored circle */}
      <div 
        className="mac-circle-icon"
        style={{ backgroundColor: getColorFromText(task.text) }}
      />
      
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleTask({ listId, taskId: task.id }))}
        className="task-checkbox"
      />
      <span className="task-text">{task.text}</span>
      {task.timestamp && (
        <span className="task-time">{task.timestamp}</span>
      )}
      <button
        className="delete-task"
        onClick={() => {
          if (!task.completed) {
            dispatch(deleteTask({ listId, taskId: task.id }));
          }
        }}
        title={task.completed ? 'Completed' : 'Delete Task'}
      >
        <i className={`fas ${task.completed ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
      </button>
    </div>
  );
}

export default Task;