'use client';

import React, { useEffect, useState } from 'react';
import { Author } from '@/app/authors/Interfaces/authorsInterface';
import AuthorDelete from '@/app/authors/Services/DeleteAuthors';
import EditAuthors from '@/app/authors/Services/EditAuthors';

interface Props {
  onAuthorClick?: (author: Author) => void;
  onDeleteSuccess?: (id: number) => void;
  containerClassName?: string;
}

export default function AuthorList({
  onAuthorClick,
  onDeleteSuccess,
  containerClassName,
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


  const handleEditSuccess = (updated: Author) => {
    setAuthors((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  if (loading) return <p>Cargando autores...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ul className={containerClassName ?? 'space-y-4'}>
      {authors.map((author) => (
        <li
          key={author.id}
          className="border p-4 rounded hover:shadow-lg transition cursor-pointer"
          onClick={() => onAuthorClick?.(author)}
          role={onAuthorClick ? 'button' : undefined}
        >
          <h2 className="text-xl font-semibold">{author.name}</h2>

          {author.description && <p>{author.description}</p>}

          {author.image && (
            <img
              src={author.image}
              alt={author.name}
              className="w-32 h-32 object-cover mt-2"
            />
          )}

          {author.birthDate && (
            <p className="text-sm text-gray-500">
              Fecha de nacimiento: {new Date(author.birthDate).toLocaleDateString()}
          </p>
          )}

          {author.books && author.books.length > 0 && (
            <>
              <h3 className="mt-2 font-medium">Libros:</h3>
              <ul className="list-disc ml-5">
                {author.books.map((book) => (
                  <li key={book.id}>
                    {book.name} ({book.isbn})
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {}
            <AuthorDelete id={author.id} onSuccess={handleDeleteSuccess} />

            {}
            <EditAuthors author={author} onSuccess={handleEditSuccess} />
          </div>
        </li>
      ))}
    </ul>
  );
}
