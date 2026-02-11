"use client";

import { Product } from "@/shared/types/product";
import Image from "next/image";

interface CarouselProps {
  product: Product;
}

const Carousel = ({ product }: CarouselProps) => {
  return (
    <div className="relative aspect-3/2  bg-white rounded-2xl mb-4">
      <Image
        src={product.images[0]}
        alt={`${product.title} image`}
        className="absolute inset-0 object-contain w-full h-full"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="eager"
      />
    </div>
  );
};

export default Carousel;
