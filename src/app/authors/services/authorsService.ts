// src/modules/authors/services/authorService.ts
import { fetcher } from "@/shared/services/http";

export interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  // Puedes agregar más campos si los necesitas
}

export interface Author {
  id: number;
  birthDate: string;
  name: string;
  description: string;
  image: string;
  publishingDate?: string; // si aplica
  books: Book[];
}

export const fetchAuthors = (): Promise<Author[]> => {
  // Llama al endpoint GET /api/authors
  return fetcher<Author[]>("/api/authors");
};
