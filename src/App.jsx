import { useSelector } from 'react-redux';
import { useState } from 'react';
import List from './components/List';
import AddList from './components/AddList';
import SearchBar from './components/SearchBar';
import './styles.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaRegCalendarAlt, FaTasks, FaCog, FaUserCircle } from 'react-icons/fa';

function App() {
  const lists = useSelector(state => state.todos.lists);
  const searchTerm = useSelector(state => state.todos.searchTerm);
  const [editingListId, setEditingListId] = useState(null);

  const filteredLists = lists
    .map(list => ({
      ...list,
      tasks: searchTerm
        ? list.tasks.filter(task =>
            task.text.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : list.tasks,
    }))
    // Filter out lists that have no tasks after search
    .filter(list => list.tasks.length > 0 || !searchTerm);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="app-container">
          <div className="today-tasks">

<div className="user-profile">
  <FaUserCircle className="user-icon" size={32} />
  <div className="user-text">
    <div className="user-title">Do it</div>
    <div className="user-name">Hamza mameri</div>
  </div>
</div>




            <h2 className="heading-with-icon">

              <FaRegCalendarAlt className="calendar-icon" />
              Today tasks
            </h2>
            <div className="task-categories">
              {filteredLists.map((list, index) => (
                <div key={list.id} className="category-item">
                  <span className={`mac-circle color-${index % 5}`} />
                  {list.title}
                </div>
              ))}
            </div>

            <h2 className="heading-with-icon">
              <FaTasks className="tasks-icon" />
              Scheduled Tasks
            </h2>
            <AddList />

            <h2 className="heading-with-icon">
              <FaCog className="settings-icon" />
              Settings
            </h2>
          </div>

          <div className="task-details">
             <h1 className="small-bold">Today main focus</h1>
  <h1 className="bold-white">Design team meeting</h1>

            <SearchBar />
            {filteredLists.map(list => (
              <List
                key={list.id}
                list={list}
                isEditing={editingListId === list.id}
                setEditingListId={setEditingListId}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;