import Card from "@/shared/ui/Card"; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-12">Explora Nuestros Contenidos</h1>

      {/* We use a Tailwind grid to organize the cards. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Instance 1 of the component Card */}
        <Card
          title="Explorando React"
          description="Una introducción profunda a la librería de UI más popular del mundo."
          imageUrl="/images/1.jpeg" // Asumimos que esta imagen está en public/images/
        />

        {/* Instance 2 of the component Card */}
        <Card
          title="El Poder de Next.js"
          description="Descubre por qué Next.js es el framework de elección para aplicaciones de producción."
          imageUrl="/images/2.jpeg"
        />

        {/* Instance 3 of the component Card */}
        <Card
          title="La Seguridad de TypeScript"
          description="Añade un sistema de tipos a tu JavaScript para construir aplicaciones más robustas."
          imageUrl="/images/3.jpeg"
        />

      </div>
    </main>
  );
}