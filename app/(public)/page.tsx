"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative w-full h-90 z-1">
        <Image
          src="/background.png"
          alt="Background image"
          quality={100}
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="flex flex-col text-center items-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <h1 className="text-2xl uppercase font-bold">Our home page</h1>
          <p className="text-sm text-white uppercase mb-5">
            place where you can find what you looking for!
          </p>

          <Link
            href="/products"
            className="w-20 block px-4 py-2 bg-white text-black rounded hover:bg-blue-500 hover:text-white transition"
          >
            Shop
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-center h-96 z-1">
        {/* тут уже всякие блоки типо, bestsellers, полные комплекты, новинки бла-бла */}
      </div>
    </>
  );
}
