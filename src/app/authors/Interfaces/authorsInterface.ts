import { fetcher } from "@/shared/services/http";

export interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  
}

export interface Author {
  id: number;
  birthDate: string;
  name: string;
  description: string;
  image: string;
  books: Book[];
}

