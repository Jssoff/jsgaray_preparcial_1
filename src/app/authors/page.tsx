'use client';

import { useEffect, useState } from 'react';
import { Author } from '@/app/authors/Interfaces/authorsInterface';
import Modal from '@/shared/ui/Modal';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

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
        setIsLoading(false);
      }
    };

    loadAuthors();
  }, []);

  const handleAuthorClick = (author: Author) => {
    setSelectedAuthor(author);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAuthor(null);
  };

  if (isLoading) {
    return <div className="text-center p-8">Cargando autores...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Autores Disponibles</h1>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <div
            key={author.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleAuthorClick(author)}
          >
            <h2 className="text-xl font-semibold text-center">{author.name}</h2>
            {author.image && (
              <img
                src={author.image}
                alt={`Foto de ${author.name}`}
                className="mt-2 w-full h-auto rounded shadow object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedAuthor?.name ?? 'Detalle del Autor'}
      >
        {selectedAuthor?.image && (
          <img
            src={selectedAuthor.image}
            alt={`Foto de ${selectedAuthor.name}`}
            className="w-48 h-auto rounded-lg mx-auto mb-4"
          />
        )}

        <p>{selectedAuthor?.description}</p>

        <p className="mt-4 text-sm text-gray-500">
          Fecha de nacimiento: {selectedAuthor?.birthDate}
        </p>

        {selectedAuthor?.books?.length ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Algunos libros:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              {selectedAuthor.books.slice(0, 3).map((book) => (
                <li key={book.id}>
                  <strong>{book.name}</strong> — ISBN: {book.isbn}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            Este autor no tiene libros registrados.
          </p>
        )}
      </Modal>
    </div>
  );
}
