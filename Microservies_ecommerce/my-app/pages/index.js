import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-cover bg-no-repeat bg-center text-chocolate text-center${inter.className}`}
      style={{ 
        backgroundImage: `url('/eCommerce-Cartoon.png')`,
        fontSize: '2rem', // Increase font size
        fontFamily: 'Inter, sans-serif', // Apply Inter font
      }}
    >
      {/* Navbar */}
      <nav className="w-full flex justify-between p-4 bg-chocolate text-chocolate z-50">  {/* Increased font size for nav content */}
        <div className="text-xxl font-bold">My E-Commerce</div>  {/* Consider using Inter font if desired */}
        <div className="text-xxl font-bold flex space-x-4">
          <a href="/Register" className="hover:underline">Register</a>
          <a href="/login" className="hover:underline">Login</a>
          <a href="/Cart" className="hover:underline">Cart</a>
          <a href="/products" className="hover:underline">Products</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center  text-center z-10 h-full">
  <h1 className="text-6xl font-bold text-chocolate">Welcome to Our Shop!</h1>
  <p className="text-2xl text-gray-600">Discover the best products for you</p>
</div>

      {/* Footer Links (Optional) */}
      {/* You can uncomment and customize this section if needed */}
      {/* <footer className="mt-8 text-center text-gray-500">
        © 2024 My E-Commerce
      </footer> */}
    </main>
  );
}
