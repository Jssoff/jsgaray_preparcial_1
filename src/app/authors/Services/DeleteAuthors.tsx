'use client';

import React, { useState } from 'react';

interface Props {
  id: number;
  onSuccess?: (id: number) => void;
  className?: string;
}


export default function AuthorDelete({ id, onSuccess, className }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este autor?');
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || 'Error al eliminar autor');
      }


      onSuccess?.(id);
    } catch (err) {
      console.error('Error eliminando autor:', err);
      alert('No se pudo eliminar el autor. Revisa la consola para más detalles.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`${className ?? ''} bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:opacity-50`}
      aria-disabled={isDeleting}
      type="button"
    >
      {isDeleting ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
}
