export interface Book {
  _id?: string;
  title: string;
  author: string;
  publishedYear?: number;
  isbn?: string;
  available: boolean;
}
