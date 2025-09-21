// src/app/authors/page.tsx
"use client";

import { useState } from "react";
import { useAuthors } from "@/app/authors/hooks/useAuthorsService";
import { Author } from "@/app/authors/services/authorsService";
import Modal from "@/shared/ui/Modal";

export default function AuthorsPage() {
  const { authors, isLoading, error } = useAuthors();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

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

      {/* Grid de autores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <div
            key={author.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleAuthorClick(author)}
          >
            <h2 className="text-xl font-semibold text-center">{author.name}</h2>

            {/* Imagen del autor */}
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

      {/* Modal con detalles del autor */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedAuthor?.name ?? "Detalle del Autor"}
      >
        {/* Imagen del autor */}
        {selectedAuthor?.image && (
          <img
            src={selectedAuthor.image}
            alt={`Foto de ${selectedAuthor.name}`}
            className="w-48 h-auto rounded-lg mx-auto mb-4"
          />
        )}

        {/* Descripción */}
        <p>{selectedAuthor?.description}</p>

        {/* Fecha de nacimiento */}
        <p className="mt-4 text-sm text-gray-500">
          Fecha de nacimiento: {selectedAuthor?.birthDate}
        </p>

        {/* Libros del autor */}
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
