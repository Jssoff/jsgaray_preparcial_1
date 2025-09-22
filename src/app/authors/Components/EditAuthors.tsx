'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Author } from '@/app/authors/Interfaces/authorsInterface';

interface Props {
  author: Author;
  onCancel?: () => void;
  onSave?: (updated: Author) => void;
  onSuccess?: (updated: Author) => void;
}

const authorSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(200),
  description: z.string().optional().nullable(),
  image: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), {
      message: 'La imagen debe ser una URL válida (http/https)',
    }),
  birthDate: z
    .string()
    .optional()
    .nullable()
    .refine((val) => {
      if (!val) return true;
      return /^\d{4}-\d{2}-\d{2}$/.test(val);
    }, { message: 'Fecha inválida' }),
});

type FormValues = z.infer<typeof authorSchema>;

export default function EditAuthors({ author, onCancel, onSave, onSuccess }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: author.name ?? '',
      description: author.description ?? '',
      image: author.image ?? '',
      birthDate:
        typeof author.birthDate === 'string' && author.birthDate.includes('T')
          ? author.birthDate.split('T')[0]
          : (author.birthDate as unknown as string) ?? '',
    },
  });


  useEffect(() => {
    reset({
      name: author.name ?? '',
      description: author.description ?? '',
      image: author.image ?? '',
      birthDate:
        typeof author.birthDate === 'string' && author.birthDate.includes('T')
          ? author.birthDate.split('T')[0]
          : (author.birthDate as unknown as string) ?? '',
    });
  }, [author, reset]);

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8080/api/authors/${author.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || 'Error al actualizar el autor');
      }

      const updated: Author = await response.json();

      // Notificar al padre (soportamos ambos nombres)
      if (typeof onSave === 'function') onSave(updated);
      if (typeof onSuccess === 'function') onSuccess(updated);

      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        className="bg-[#B95E82] text-white py-2 px-4 rounded hover:bg-[#9c4f6e]"
        type="button"
      >
        Editar
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()} 
      className="space-y-3 bg-white p-4 rounded shadow"
    >
      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      {}
      <div>
        <input
          type="text"
          {...register('name')}
          placeholder="Nombre"
          className={`border rounded px-3 py-2 w-full text-black bg-white ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {}
      <div>
        <textarea
          {...register('description')}
          placeholder="Descripción"
          rows={3}
          className={`border rounded px-3 py-2 w-full text-black bg-white resize-none ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {}
      <div>
        <input
          type="text"
          {...register('image')}
          placeholder="URL de la imagen"
          className={`border rounded px-3 py-2 w-full text-black bg-white ${
            errors.image ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
      </div>

      {}
      <div>
        <input
          type="date"
          {...register('birthDate')}
          className={`border rounded px-3 py-2 w-full text-black bg-white ${
            errors.birthDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.birthDate && (
          <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#B95E82] text-white py-2 px-4 rounded hover:bg-[#9c4f6e]"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(false);
            onCancel?.();
            reset({
              name: author.name ?? '',
              description: author.description ?? '',
              image: author.image ?? '',
              birthDate:
                typeof author.birthDate === 'string' && author.birthDate.includes('T')
                  ? author.birthDate.split('T')[0]
                  : (author.birthDate as unknown as string) ?? '',
            });
          }}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded flex-1"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
