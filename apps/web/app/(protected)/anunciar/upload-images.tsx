"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function UploadImages() {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <div>
      <Label htmlFor="images">Fotos do Imóvel</Label>
      <Input
        id="images"
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Imagem ${index + 1}`}
            className="w-24 h-24 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
