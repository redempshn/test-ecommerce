import { Product } from "@/shared/types/product";
import Accordion from "@/shared/ui/Accordion";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isGeneralInfoOpen, setIsGeneralInfoOpen] = useState(false);

  const {
    brand,
    sku,
    weight,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
  } = product;

  const productFields = {
    brand,
    sku,
    weight,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
  };

  return (
    <div className="flex flex-col p-4 rounded-2xl bg-white">
      <Accordion
        isOpen={isDescriptionOpen}
        toggleAccordion={() => setIsDescriptionOpen(!isDescriptionOpen)}
        title="Description"
      >
        <p className="text-base font-light">{product.description}</p>
      </Accordion>

      <Accordion
        isOpen={isGeneralInfoOpen}
        toggleAccordion={() => setIsGeneralInfoOpen(!isGeneralInfoOpen)}
        title="General information"
      >
        <div className="flex flex-col">
          {Object.entries(productFields).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center py-2">
              <span className="text-base first-letter:uppercase">{key}</span>
              <span className="text-base font-light">{value}</span>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <span className="text-base">Dimensions</span>
            <div className="flex flex-col">
              {Object.entries(product.dimensions).map(([key, value]) => (
                <div key={key} className="py-2 text-right">
                  <span className="text-base font-light mr-3">{key}:</span>
                  <span className="text-base font-light">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default ProductDetails;
