import { Product } from "@/shared/types/product";
import Accordion from "@/shared/ui/Accordion";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isGeneralInfoOpen, setIsGeneralInfoOpen] = useState(false);

  return (
    <div className="flex flex-col p-4 rounded-2xl bg-white">
      <Accordion
        isOpen={isDescriptionOpen}
        toggleAccordion={() => setIsDescriptionOpen(!isDescriptionOpen)}
        title="Description"
      >
        <p className="text-base font-light">
          {product.content.descriptionHtml}
        </p>
      </Accordion>

      <Accordion
        isOpen={isGeneralInfoOpen}
        toggleAccordion={() => setIsGeneralInfoOpen(!isGeneralInfoOpen)}
        title="General information"
      >
        <div className="flex flex-col">
          {/* тут можно добавить поля, с подробной информаций по продукту. */}
          <p className="text-base font-light">Some general description text.</p>
        </div>
      </Accordion>
    </div>
  );
};

export default ProductDetails;
