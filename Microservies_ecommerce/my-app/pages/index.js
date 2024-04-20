import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-cover bg-no-repeat bg-center text-chocolate text-center${inter.className}`}
      style={{ 
        backgroundImage: `url('/gad.jpeg')`,
        fontSize: '2rem',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Navbar */}
      <nav className="w-full flex justify-between p-4 bg-chocolate text-chocolate z-50">
        <div className="text-xxl font-bold">GadgetHub</div>
        <div className="text-xxl font-bold flex space-x-4">
          <Link href="/Register" className="hover:underline">Register</Link>
          <Link href="/login" className="hover:underline">Login</Link>
          <Link href="/Cart" className="hover:underline">Cart</Link>
          <Link href="/Product" className="hover:underline">Products</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center  text-center z-10 h-full">
        <h1 className="text-6xl font-bold text-chocolate">Welcome to GadgetHub!</h1>
        <p className="text-2xl text-gray-600">Discover the best products for you</p>
      </div>

      {/* Footer Links (Optional) */}
      {/* <footer className="mt-8 text-center text-gray-500">
        © 2024 My E-Commerce
      </footer> */}
    </main>
  );
}
