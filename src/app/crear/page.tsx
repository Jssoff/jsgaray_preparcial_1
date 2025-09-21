"use client";

import { useState } from "react";
import { AuthorForm } from "@/app/crear/services/authorForm";
import { SubmitHandler } from "react-hook-form";

// Define el tipo de datos que el formulario enviará
interface AuthorFormData {
  name: string;
  description: string;
  birthDate: string;
  image: string;
}

export default function CreateAuthorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateAuthor: SubmitHandler<AuthorFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:8080/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al crear el autor");
      }

      console.log("Autor creado:", data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Autor</h1>
      <AuthorForm onSubmit={handleCreateAuthor} isSubmitting={isSubmitting} />
    </div>
  );
}
