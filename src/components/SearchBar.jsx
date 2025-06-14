import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/todoSlice';
function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearch = e => {
    setSearch(e.target.value);
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="search-bar" style={styles.container}>
      <div style={styles.windowControls}>
        <div style={{ ...styles.controlDot, backgroundColor: '#FF5F56' }} />
        <div style={{ ...styles.controlDot, backgroundColor: '#FFBD2E' }} />
        <div style={{ ...styles.controlDot, backgroundColor: '#3A8BFF' }} />
      </div>
      <input
        type="text"
        placeholder="What is your next task?"
        value={search}
        onChange={handleSearch}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    alignItems: 'center',
  },
  windowControls: {
    display: 'flex',
    gap: '6px',
    position: 'absolute',
    left: '12px',
  },
  controlDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  searchIcon: {
    position: 'absolute',
    left: '50px',
    color: '#8B8B8B',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '10px 15px 10px 80px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fafafa',
    transition: 'all 0.2s ease',
  },
};

export default SearchBar;