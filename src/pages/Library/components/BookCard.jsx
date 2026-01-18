import { useState } from "react";
import { useLibrary } from "../../../hooks/useLibrary";
import { Link, useLocation } from 'react-router-dom';
import emptyLibraryIcon from "../../../assets/icons/empty_library_icon.svg";
import { CalendarIcon, NotesIcon, SavedIcon, LinkIcon, ArrowRightIcon } from '../../../components/icons';
import styles from "./BookCard.module.scss";

export default function BookCard({ book, viewMode = 'grid' }) {
  const { saveBook, isBookSaved, savedBooks } = useLibrary();
  const [saving, setSaving] = useState(false);
  const location = useLocation();

  const isSaved = isBookSaved(book.id);
  const savedBook = savedBooks.find(saved => saved.id === book.id) || null;

  async function handleSave(e) {
    e.preventDefault();
    e.stopPropagation();

    setSaving(true);
    try {
      await saveBook(book);
    } catch (error) {
      console.error('Error saving book:', error);
    } finally {
      setSaving(false);
    }
  }

  if (viewMode === 'list') {
    return (
      <div className={styles.bookCardList}>
        <Link
          to={`/book/${book.id}`}
          state={{ from: location.pathname }}
          className={styles.coverLink}
        >
          {book.thumbnail ? (
            <img src={book.thumbnail} alt={book.title} className={styles.thumbnail} />
          ) : (
            <div className={styles.noThumbnail}>
              <img src={emptyLibraryIcon} alt="no cover" />
            </div>
          )}
        </Link>

        <div className={styles.contentWrapper}>
          <div className={styles.topRow}>
            <div className={styles.textContent}>
              <Link to={`/book/${book.id}`} state={{ from: location.pathname }}>
                <h3 className={styles.title}>{book.title}</h3>
              </Link>
              <p className={styles.authors}>{book.authors.join(', ')}</p>

              <div className={styles.metaList}>
                {book.publishedYear && <span>{book.publishedYear}</span>}
                {book.pageCount > 0 && <span>{book.pageCount} pages</span>}
                {book.categories && book.categories.length > 0 && (
                  <span>{book.categories[0]}</span>
                )}
              </div>
            </div>

            <div className={styles.saveButtonWrapper}>
              {!isSaved ? (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={styles.saveButtonCompact}
                >
                  <SavedIcon />
                  {saving ? 'Saving...' : 'Save'}
                </button>
              ) : (
                <span className={styles.savedCompact}>
                  <SavedIcon fill="currentColor" />
                  Saved
                </span>
              )}
            </div>
          </div>

          <div className={styles.bottomRow}>
            {savedBook && savedBook.progress >= 0 && (
              <div className={styles.progressCompact}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${savedBook.progress}%` }}
                  />
                </div>
                <span className={styles.progressText}>{savedBook.progress}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bookCard}>
      <Link
        to={`/book/${book.id}`}
        state={{ from: location.pathname }}
        className={styles.coverLink}
      >
        {book.thumbnail ? (
          <img src={book.thumbnail} alt={book.title} className={`img-cover ${styles.thumbnail}`} />
        ) : (
          <div className={styles.noThumbnail}>
            <img src={emptyLibraryIcon} alt="no cover" />
            <p>No Cover</p>
          </div>
        )}
        <div className={styles.overlay}>
          <span className={styles.viewDetails}>view details <ArrowRightIcon /></span>
        </div>
      </Link>

      <div className={styles.info}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.authors}>{book.authors.join(', ')}</p>

        {book.description && (
          <p className={styles.description}>
            {book.description}
          </p>
        )}

        <div className={styles.meta}>
          {book.publishedYear && (
            <span className={styles.metaItem}>
              <CalendarIcon />
              {book.publishedYear}
            </span>
          )}
          {book.pageCount > 0 && (
            <span className={styles.metaItem}>
              <NotesIcon />
              {book.pageCount} pages
            </span>
          )}
        </div>

        {savedBook && savedBook.progress >= 0 && (
          <div className={styles.progress}>
            <div className={styles.progressInfo}>
              <span>Progress</span>
              <span className={styles.progressPercent}>{savedBook.progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${savedBook.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {!isSaved ? (
            <button
              onClick={handleSave}
              disabled={saving}
              className={styles.saveButton}
            >
              <SavedIcon />
              {saving ? 'Saving...' : 'Save'}
            </button>
          ) : (
            <span className={styles.saved}>
              <SavedIcon />
              Saved
            </span>
          )}

          {book.previewLink && (
            <a
              href={book.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.previewLink}
              onClick={(e) => e.stopPropagation()}
            >
              <LinkIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}