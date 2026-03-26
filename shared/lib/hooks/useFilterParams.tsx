import { useRouter, useSearchParams } from "next/navigation";

export const useFilterParams = (slug: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeAttributes = searchParams.getAll("attributes");

  const toggleFilter = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    const currentAttributes = params.getAll("attributes");

    const str = `${name}:${value}`;

    const updated = currentAttributes.includes(str)
      ? currentAttributes.filter((item) => item !== str)
      : [...currentAttributes, str];

    params.delete("attributes");

    updated.forEach((a) => params.append("attributes", a));

    if (str !== "page") {
      params.set("page", "1");
    }

    router.push(`/products/category/${slug}?${params.toString()}`);
  };

  return { toggleFilter, activeAttributes };
};
