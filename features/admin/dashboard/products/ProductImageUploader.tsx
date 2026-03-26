"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import type { UseFormSetValue } from "react-hook-form";
import Image from "next/image";
import { type ProductFormData } from "@/shared/validations/product.schema";
import SectionCard from "./SectionCard";

type ImageItem = {
  url: string;
  position: number;
};

type Props = {
  value: ImageItem[];
  setValue: UseFormSetValue<ProductFormData>;
};

export default function ProductImageUploader({ value, setValue }: Props) {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    return res.json();
  };

  const handleFiles = useCallback(
    async (files: File[]) => {
      setUploading(true);
      try {
        const uploaded: ImageItem[] = [];
        for (let i = 0; i < files.length; i++) {
          const data = await uploadFile(files[i]);
          uploaded.push({ url: data.url, position: value.length + i });
        }
        setValue("images", [...value, ...uploaded], {
          shouldValidate: true,
          shouldDirty: true,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setUploading(false);
      }
    },
    [value, setValue],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => handleFiles(acceptedFiles),
    [handleFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/gif": [],
      "image/webp": [],
    },
    multiple: true,
  });

  const removeImage = (index: number) => {
    const updated = value
      .filter((_, i) => i !== index)
      .map((img, i) => ({
        ...img,
        position: i,
      }));

    setValue("images", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <SectionCard title="Product Images">
      <div className="space-y-4">
        {/* Upload zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group ${
            isDragActive ? "bg-slate-100" : ""
          }`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center">
            <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-blue-500" />
            </div>

            <p className="text-sm font-medium text-slate-700">
              Click to upload or drag & drop
            </p>

            <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF</p>

            {uploading && (
              <p className="text-xs text-black mt-2">Uploading...</p>
            )}
          </div>
        </div>

        {/* Preview */}
        {value.length > 0 && (
          <div className="grid grid-cols-4 gap-4">
            {value.map((img, index) => (
              <div key={img.url} className="relative group">
                <Image
                  alt="photo"
                  width={200}
                  height={112}
                  src={img.url}
                  className="w-full h-28 object-cover rounded-lg border"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="cursor-pointer absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
