'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

// Esquema de validación
const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha inválida",
  }),
  image: z.string().url("Debe ser una URL válida"),
});

type FormFields = z.infer<typeof schema>;

// Props que recibe el formulario
interface AuthorFormProps {
  onSubmit: SubmitHandler<FormFields>;
  isSubmitting: boolean;
}

export const AuthorForm = ({ onSubmit, isSubmitting }: AuthorFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      birthDate: '',
      image: '',
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Crear nuevo autor</h1>
      <form className="w-full max-w-md p-5 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name')}
          type="text"
          placeholder="Nombre del autor"
          className="border border-gray-300 p-2 rounded"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}

        <textarea
          {...register('description')}
          placeholder="Descripción"
          className="border border-gray-300 p-2 rounded"
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}

        <input
          {...register('birthDate')}
          type="date"
          className="border border-gray-300 p-2 rounded"
        />
        {errors.birthDate && <span className="text-red-500">{errors.birthDate.message}</span>}

        <input
          {...register('image')}
          type="url"
          placeholder="URL de la imagen"
          className="border border-gray-300 p-2 rounded"
        />
        {errors.image && <span className="text-red-500">{errors.image.message}</span>}

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300"
        >
          {isSubmitting ? 'Cargando...' : 'Crear'}
        </button>

        {errors.root && <span className="text-red-500">{errors.root.message}</span>}
      </form>
    </div>
  );
};
