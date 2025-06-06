import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
      <p className="mt-4">Lo sentimos, la página que buscas no existe.</p>
      <Link 
        href="/" 
        className="mt-6 px-4 py-2 bg-amber-400 text-black rounded font-bold"
      >
        Volver al inicio
      </Link>
    </div>
  );
}