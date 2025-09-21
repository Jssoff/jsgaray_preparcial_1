'use client';

import { useEffect, useState } from 'react';
import { Author } from '../Interfaces/authorsInterface';



export default function AuthorListPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/authors');
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data: Author[] = await response.json();
        setAuthors(data);
      } catch (err) {
        setError('Error al cargar autores');
      } finally {
        setLoading(false);
      }
    };

    loadAuthors();
  }, []);

  if (loading) return <p>Cargando autores...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Autores</h1>
      <ul className="space-y-4">
        {authors.map((author) => (
          <li key={author.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{author.name}</h2>
            <p>{author.description}</p>
            <img src={author.image} alt={author.name} className="w-32 h-32 object-cover mt-2" />
            <p className="text-sm text-gray-500">Fecha de nacimiento: {author.birthDate}</p>
            <h3 className="mt-2 font-medium">Libros:</h3>
            <ul className="list-disc ml-5">
              {author.books.map((book) => (
                <li key={book.id}>
                  {book.name} ({book.isbn})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
