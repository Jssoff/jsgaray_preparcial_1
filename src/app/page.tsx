import Card from "@/shared/ui/Card"; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-12 text-center">
        ¡Explora los mejores autores y sus más destacadas obras!
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Card a la izquierda */}
        <Card imageUrl="/images/gatoLector.jpg" />

        {/* Texto a la derecha */}
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">
          
            Explora nuevos mundos con nuestros libros.
          </h2>
          <p className="bg-[#F39F9F] text-black p-4 ">
            Sumérgete en historias fascinantes y descubre autores que 
            te transportarán a universos llenos de magia, misterio y 
            conocimiento.
          </p>
        </div>
      </div>
    </main>
  );
}
