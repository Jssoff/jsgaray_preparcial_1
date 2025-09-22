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
    <div className="flex justify-center">
      <form
        className="w-2/3 max-w-lg p-5 flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('name')}
          type="text"
          placeholder="Nombre del autor"
          className="bg-[#F39F9F] text-white placeholder:text-white py-2 px-4 rounded"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}

        <textarea
          {...register('description')}
          placeholder="Descripción"
          className="bg-[#F39F9F] text-white placeholder:text-white py-2 px-4 rounded"
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}

        <input
          {...register('birthDate')}
          type="date"
          className="bg-[#F39F9F] text-white placeholder:text-white py-2 px-4 rounded"
        />
        {errors.birthDate && <span className="text-red-500">{errors.birthDate.message}</span>}

        <input
          {...register('image')}
          type="url"
          placeholder="URL de la imagen"
          className="bg-[#F39F9F] text-white placeholder:text-white py-2 px-4 rounded"
        />
        {errors.image && <span className="text-red-500">{errors.image.message}</span>}

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-[#B95E82] text-white py-2 px-4 rounded hover:bg-[#9c4f6e]"
        >
          {isSubmitting ? 'Cargando...' : 'Crear'}
        </button>

        {errors.root && <span className="text-red-500">{errors.root.message}</span>}
      </form>
    </div>
  );
};