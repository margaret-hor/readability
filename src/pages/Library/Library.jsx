import { useState } from 'react';
import { useLibrary } from '../../hooks/useLibrary';
import BookSearch from './components/BookSearch';
import SavedBooks from './components/SavedBooks';
import { SearchIcon, SavedIcon } from '../../components/icons';
import styles from './Library.module.scss';

export default function Library() {
  const [activeTab, setActiveTab] = useState('search');
  const { savedBooks } = useLibrary();

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.library}>
      <header className={styles.header}>
        <h1 className={styles.title}>my library</h1>
        <p className={styles.subtitle}>Discover and organize your reading journey</p>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'search' ? styles.active : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <SearchIcon />
          <span>search books</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'saved' ? styles.active : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <SavedIcon />
          <span>my library</span>
          <span className={styles.count}>{savedBooks.length}</span>
        </button>
      </div>

      {activeTab === 'search' ? (
        <BookSearch
          initialQuery={searchQuery}
          initialResults={searchResults}
          onSearchUpdate={(query, results) => {
            setSearchQuery(query);
            setSearchResults(results);
          }}
        />
      ) : (
        <SavedBooks onStartSearching={() => setActiveTab('search')} />
      )}
    </div>
  );
}