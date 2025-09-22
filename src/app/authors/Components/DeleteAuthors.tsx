'use client';

import React, { useState } from 'react';

interface Delete {
  id: number;
  onSuccess?: (id: number) => void;
}


export default function AuthorDelete({ id, onSuccess }: Delete) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {

    try {
      setIsDeleting(true);
      const response = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar autor');
      }


      onSuccess?.(id);
    } catch (err) {
      console.error('Error eliminando autor:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-[#F39F9F] text-white py-2 px-4 rounded hover:bg-[#9c4f6e]"
      type="button"
    >
      {isDeleting ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
}
