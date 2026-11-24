import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-blue-700 px-6 py-4 text-white">
          <nav className="mx-auto flex max-w-5xl items-center gap-6">
            <span className="text-lg font-bold">IT Services</span>
            <Link href="/" className="hover:underline">Início</Link>
            <Link href="/maquinas" className="hover:underline">Máquinas</Link>
            <Link href="/os/nova" className="hover:underline">Nova OS</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl p-6">{children}</main>
      </body>
    </html>
  );
}