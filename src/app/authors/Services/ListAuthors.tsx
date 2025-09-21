'use client';

import React, { useEffect, useState } from 'react';
import { Author } from '@/app/authors/Interfaces/authorsInterface';
import AuthorDelete from '@/app/authors/Services/DeleteAuthors';

interface Props {
  onAuthorClick?: (author: Author) => void;
  onEdit?: (id: number) => void;
  onDeleteSuccess?: (id: number) => void;
  /** Clase CSS para el contenedor (permite que el padre controle grid / columnas) */
  containerClassName?: string;
}

export default function AuthorList({
  onAuthorClick,
  onEdit,
  onDeleteSuccess,
  containerClassName = 'space-y-4', // comportamiento por defecto (lista vertical)
}: Props) {
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

  const handleDeleteSuccess = (id: number) => {
    setAuthors((prev) => prev.filter((a) => a.id !== id));
    onDeleteSuccess?.(id);
  };

  if (loading) return <p>Cargando autores...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ul className={containerClassName}>
      {authors.map((author) => (
        <li
          key={author.id}
          className="border p-4 rounded hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
          onClick={() => onAuthorClick?.(author)}
          role={onAuthorClick ? 'button' : undefined}
        >
          <h2 className="text-xl font-semibold text-center">{author.name}</h2>

          {author.description && <p className="mt-2 text-sm">{author.description}</p>}

          {author.image && (
            <img
              src={author.image}
              alt={author.name}
              className="w-32 h-32 object-cover mt-4 mx-auto rounded"
            />
          )}

          {author.birthDate && (
            <p className="text-sm text-gray-500 mt-3">Fecha de nacimiento: {author.birthDate}</p>
          )}

          {author.books && author.books.length > 0 && (
            <>
              <h3 className="mt-3 font-medium">Libros:</h3>
              <ul className="list-disc ml-5 text-sm">
                {author.books.map((book) => (
                  <li key={book.id}>
                    {book.name} ({book.isbn})
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-4 flex gap-2 mt-auto">
            <AuthorDelete
              id={author.id}
              onSuccess={(id) => handleDeleteSuccess(id)}
              className="flex-1"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(author.id);
              }}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Editar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
