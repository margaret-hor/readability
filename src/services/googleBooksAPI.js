import { formatGoogleBooks, formatGoogleBook } from "../utils/formatters";

const API_BASE = '/api';

export async function searchBooks(query, maxResults = 30) {
  try {
    if (!query || typeof query !== 'string') {
      throw new Error('Query must be a non-empty string');
    }

    const url = `${API_BASE}/books?q=${encodeURIComponent(query)}&maxResults=${maxResults}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch books: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.items) {
      console.warn('No items in response:', data);
      return [];
    }

    return formatGoogleBooks(data.items);
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
}

export async function getBookId(bookId) {
  try {
    if (!bookId) throw new Error('Book ID is required');

    const url = `${API_BASE}/book?id=${bookId}`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Book not found');
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Book detail response:', data);

    return formatGoogleBook(data);
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
}

export async function searchByCategory(category, maxResults = 30) {
  return searchBooks(`subject:${category}`, maxResults);
}

export async function searchByAuthor(author, maxResults = 30) {
  return searchBooks(`inauthor:${author}`, maxResults);
}