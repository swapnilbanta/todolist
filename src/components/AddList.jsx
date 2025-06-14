import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../features/todoSlice';

function AddList() {
  const [listTitle, setListTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (listTitle.trim()) {
      dispatch(addList(listTitle));
      setListTitle('');
    }
  };

  return (
    <div className="list-container add-list">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new list..."
          value={listTitle}
          onChange={e => setListTitle(e.target.value)}
        />
        <button type="submit">Add List</button>
      </form>
    </div>
  );
}

export default AddList;