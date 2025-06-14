import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: JSON.parse(localStorage.getItem('todoLists')) || [
    { id: '1', title: 'Work', tasks: [] },
    { id: '2', title: 'Personal', tasks: [] },
  ],
  searchTerm: '',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addList: (state, action) => {
      const newList = {
        id: Date.now().toString(),
        title: action.payload,
        tasks: [],
      };
      state.lists.push(newList);
      localStorage.setItem('todoLists', JSON.stringify(state.lists));
    },
    renameList: (state, action) => {
      const { listId, newTitle } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        list.title = newTitle;
        localStorage.setItem('todoLists', JSON.stringify(state.lists));
      }
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
      localStorage.setItem('todoLists', JSON.stringify(state.lists));
    },
 addTask: (state, action) => {
  const { listId, taskText } = action.payload;
  const list = state.lists.find(list => list.id === listId);
  if (list) {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    list.tasks.push({
      id: Date.now().toString(),
      text: taskText,
      completed: false,
      timestamp: formattedTime, // ⬅️ store time as separate field
    });
    localStorage.setItem('todoLists', JSON.stringify(state.lists));
  }
},
   toggleTask: (state, action) => {
  const { listId, taskId } = action.payload;
  const list = state.lists.find((list) => list.id === listId);
  if (list) {
    const task = list.tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }
},
    deleteTask: (state, action) => {
      const { listId, taskId } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        list.tasks = list.tasks.filter(task => task.id !== taskId);
        localStorage.setItem('todoLists', JSON.stringify(state.lists));
      }
    },
    moveTask: (state, action) => {
      const { sourceListId, destinationListId, taskId } = action.payload;
      const sourceList = state.lists.find(list => list.id === sourceListId);
      const destinationList = state.lists.find(list => list.id === destinationListId);
      
      if (sourceList && destinationList) {
        const taskIndex = sourceList.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          const [task] = sourceList.tasks.splice(taskIndex, 1);
          destinationList.tasks.push(task);
          localStorage.setItem('todoLists', JSON.stringify(state.lists));
        }
      }
    },
    reorderTask: (state, action) => {
      const { listId, startIndex, endIndex } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        const [removed] = list.tasks.splice(startIndex, 1);
        list.tasks.splice(endIndex, 0, removed);
        localStorage.setItem('todoLists', JSON.stringify(state.lists));
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

 moveTaskWithinList: (state, action) => {
    const { listId, fromIndex, toIndex } = action.payload;
    const list = state.lists.find(list => list.id === listId);
    if (list) {
      const [removed] = list.tasks.splice(fromIndex, 1);
      list.tasks.splice(toIndex, 0, removed);
    }
  },
  moveTask: (state, action) => {
  const { fromListId, toListId, taskId, newIndex } = action.payload;
  const sourceList = state.lists.find(list => list.id === fromListId);
  const destinationList = state.lists.find(list => list.id === toListId);
  
  if (sourceList && destinationList) {
    const taskIndex = sourceList.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const [task] = sourceList.tasks.splice(taskIndex, 1);
      // Insert at the specified position or at the end if newIndex is undefined
      if (newIndex !== undefined && newIndex < destinationList.tasks.length) {
        destinationList.tasks.splice(newIndex, 0, task);
      } else {
        destinationList.tasks.push(task);
      }
      localStorage.setItem('todoLists', JSON.stringify(state.lists));
    }
  }
},





  },
});

export const {
  addList,
  renameList,
  deleteList,
  addTask,
  toggleTask,
  deleteTask,
  moveTask,
  reorderTask,
  setSearchTerm,
   moveTaskWithinList,

} = todoSlice.actions;

export default todoSlice.reducer;