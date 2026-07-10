"use client";

import { Product } from "@/shared/types/product";
import Carousel from "./Carousel";

interface CarouselProps {
  product: Product;
}

const Galery = ({ product }: CarouselProps) => {
  const slides = product.images.map((item) => item);

  return (
    <div className=" bg-white rounded-2xl mb-4">
      <Carousel slides={slides} alt={product.title} />
    </div>
  );
};

export default Galery;

{
  /* <Image
        src={product.images[0].url}
        alt={`${product.title} image`}
        className="absolute inset-0 object-contain w-full h-full"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="eager"
      /> */
}
