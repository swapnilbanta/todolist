import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteList, renameList, addTask, moveTaskWithinList } from '../features/todoSlice';
import Task from './Task';

function List({ list, isEditing, setEditingListId }) {
  const [taskText, setTaskText] = useState('');
  const [newTitle, setNewTitle] = useState(list.title);
  const dispatch = useDispatch();

  const handleAddTask = e => {
    e.preventDefault();
    if (taskText.trim()) {
      dispatch(addTask({ listId: list.id, taskText }));
      setTaskText('');
    }
  };

  const moveTaskInList = (dragIndex, hoverIndex) => {
    dispatch(moveTaskWithinList({
      listId: list.id,
      fromIndex: dragIndex,
      toIndex: hoverIndex
    }));
  };

  const handleRename = e => {
    e.preventDefault();
    if (newTitle.trim()) {
      dispatch(renameList({ listId: list.id, newTitle }));
      setEditingListId(null);
    }
  };

  return (
    <div className="list-container">
      <div className="list-header">
        {isEditing ? (
          <form onSubmit={handleRename}>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              autoFocus
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingListId(null)}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <h2 onClick={() => setEditingListId(list.id)}>{list.title}</h2>
            <button
              className="delete-list"
              onClick={() => dispatch(deleteList(list.id))}
            >
              Delete
            </button>
          </>
        )}
      </div>

      <div className="tasks">
        {list.tasks.map((task, index) => (
          <Task 
            key={task.id} 
            task={task} 
            listId={list.id} 
            index={index}
            moveTaskInList={moveTaskInList}
          />
        ))}
      </div>

      <form className="add-task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Add a task..."
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default List;