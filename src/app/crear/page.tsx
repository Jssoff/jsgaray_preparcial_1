"use client";

import { AuthorForm } from "@/app/crear/services/authorForm";

export default function CreateAuthorPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Autor</h1>
      <AuthorForm />
    </div>
  );
}
