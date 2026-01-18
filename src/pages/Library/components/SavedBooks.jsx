import { useState, useMemo } from 'react';
import { useLibrary } from '../../../hooks/useLibrary';
import BookCard from './BookCard';
import { BOOK_STATUS, SORT_OPTIONS } from '../../../utils/constants';
import { SearchIcon, GridIcon, ListIcon, RemoveIcon } from '../../../components/icons';
import emptyLibraryIcon from "../../../assets/icons/empty_library_icon.svg";
import styles from './SavedBooks.module.scss';

export default function SavedBooks({ onStartSearching }) {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('savedAt');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { savedBooks, loading, removeBook } = useLibrary();

  const filteredBooks = useMemo(() => {
    let filtered = [...savedBooks];

    if (filterStatus !== 'all') {
      filtered = filtered.filter(book => book.status === filterStatus);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.authors.some(author => author.toLowerCase().includes(query))
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.authors[0].localeCompare(b.authors[0]);
        case 'progress':
          return b.progress - a.progress;
        case 'savedAt':
        default:
          return b.savedAt - a.savedAt;
      }
    });

    return filtered;
  }, [savedBooks, filterStatus, searchQuery, sortBy]);

  async function handleRemove(firestoreId) {
    if (!confirm('Remove this book from your library?')) {
      return;
    }

    try {
      await removeBook(firestoreId);
    } catch (error) {
      console.error('Failed to remove book', error);
    }
  }

  return (
    <div className={styles.savedBooks}>
      {savedBooks.length > 0 && (
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search in your library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.filters}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.select}
            >
              <option value="all">All Books</option>
              <option value={BOOK_STATUS.WANT}>Want to Read</option>
              <option value={BOOK_STATUS.READING}>Currently Reading</option>
              <option value={BOOK_STATUS.COMPLETED}>Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className={styles.viewToggle}>
              <button
                className={viewMode === 'grid' ? styles.active : ''}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <GridIcon />
              </button>
              <button
                className={viewMode === 'list' ? styles.active : ''}
                onClick={() => setViewMode('list')}
                title="List view"
              >
                <ListIcon />
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading your library...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        searchQuery || filterStatus !== 'all' ? (
          <div className={styles.emptyState}>
            <h2>No books found</h2>
            <p>Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('all');
              }}
              className={styles.clearButton}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <img src={emptyLibraryIcon} className='img-cover' alt="empty library" />
            </div>
            <h2>Your library is empty</h2>
            <p>Start building your collection by searching for books</p>

            {onStartSearching && (
              <button onClick={onStartSearching} className={styles.emptyButton}>
                <SearchIcon />
                Start Searching
              </button>
            )}
          </div>
        )
      ) : (
        <div className={`${styles.grid} ${viewMode === 'list' ? styles.listView : ''}`}>
          {filteredBooks.map(book => (
            <div key={book.firestoreId} className={styles.bookItem}>
              <BookCard book={book} viewMode={viewMode} />
              <button
                onClick={() => handleRemove(book.firestoreId)}
                className={styles.removeButton}
              >
                <RemoveIcon />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}