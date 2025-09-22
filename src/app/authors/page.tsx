import AuthorList from '@/app/authors/Components/ListAuthors';

export default function AuthorsPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Autores disponibles</h1>

      <AuthorList
        containerClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      />
    </div>
  );
}
