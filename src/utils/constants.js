export const LANGUAGES = [
  { code: '', name: 'Any language'},
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'pl', name: 'Polish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
];

export const LANGUAGE_NAMES = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ru: 'Russian',
  ja: 'Japanese',
  zh: 'Chinese',
  uk: 'Ukrainian',
  pl: 'Polish',
  nl: 'Dutch',
  sv: 'Swedish',
  ko: 'Korean',
  ar: 'Arabic',
  hi: 'Hindi',
};

export const BOOK_STATUS = {
  WANT: 'want',
  READING: 'reading',
  COMPLETED: 'completed',
};

export const BOOK_STATUS_LABELS = {
  [BOOK_STATUS.WANT]: 'Want to Read',
  [BOOK_STATUS.READING]: 'Currently Reading',
  [BOOK_STATUS.COMPLETED]: 'Completed',
};

export const SORT_OPTIONS = [
  { value: 'savedAt', label: 'Recently Added' },
  { value: 'title', label: 'Title (A-Z)' },
  { value: 'author', label: 'Author (A-Z)' },
  { value: 'progress', label: 'Progress' },
];

export const PRINT_TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'books', label: 'Books' },
  { value: 'magazines', label: 'Magazines' },
];

export const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'free-ebooks', label: 'Free' },
  { value: 'paid-ebooks', label: 'Paid' },
  { value: 'partial', label: 'Preview' },
  { value: 'full', label: 'Full View' },
];

export const POPULAR_TAGS = [
  'Fiction',
  'Science',
  'History',
  'Programming',
  'Self-help',
  'Biography',
  'Fantasy',
  'Business',
  'Psychology',
  'Art',
];

export const DEFAULT_READING_SPEED = 50;

export const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';
export const MAX_RESULTS_PER_REQUEST = 40;