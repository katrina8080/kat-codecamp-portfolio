'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function AdminLayout({ children }) {
  return (
    <main className="scroll-smooth font-kodchasan bg-black flex flex-col min-h-screen">
      <Navbar />

      <section className="flex-1 bg-zinc-900">{children}</section>

      <Footer />
    </main>
  );
}
