'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha inválida",
  }),
  image: z.string().url("Debe ser una URL válida"),
});

type FormFields = z.infer<typeof schema>;

export const AuthorForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: '',
      description: '',
      birthDate: '',
      image: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);

      const response = await fetch('http://127.0.0.1:8080/api/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear el autor');
      }
    } catch (error) {
      setError("root", { message: "Error al crear el autor" });
    }
  };

  return (
    <div>
      <form className="w-2/3 p-5 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name')}
          type="text"
          placeholder="Nombre del autor"
          className="border border-gray-300 p-2"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}

        <textarea
          {...register('description')}
          placeholder="Descripción"
          className="border border-gray-300 p-2"
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}

        <input
          {...register('birthDate')}
          type="date"
          className="border border-gray-300 p-2"
        />
        {errors.birthDate && <span className="text-red-500">{errors.birthDate.message}</span>}

        <input
          {...register('image')}
          type="url"
          placeholder="URL de la imagen"
          className="border border-gray-300 p-2"
        />
        {errors.image && <span className="text-red-500">{errors.image.message}</span>}

        <button disabled={isSubmitting} type="submit" className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300">
          {isSubmitting ? 'Cargando...' : 'Crear'}
        </button>

        {errors.root && <span className="text-red-500">{errors.root.message}</span>}
      </form>
    </div>
  );
};
