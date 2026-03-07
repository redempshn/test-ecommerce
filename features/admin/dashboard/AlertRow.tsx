type AlertRowProps = {
  product: string;
  sku: string;
  stock: number;
  threshold: number;
};

export default function AlertRow({
  product,
  sku,
  stock,
  threshold,
}: AlertRowProps) {
  const isOut = stock === 0;
  return (
    <div className="flex items-center justify-between py-3 border-b border-b-gray-200 last:border-0">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">{product}</span>
        <span className="text-xs text-muted-foreground">SKU: {sku}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">
          Threshold: {threshold}
        </span>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isOut ? "bg-destructive/10 text-destructive" : "bg-yellow-100 text-yellow-800"}`}
        >
          {isOut ? "Out of stock" : `${stock} left`}
        </span>
      </div>
    </div>
  );
}
