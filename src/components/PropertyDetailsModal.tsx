import Image from "next/image";
import React, { useState } from "react";

interface PropertyDetailsModalProps {
  gallery: string[];
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  property: any; // can add specific type from your sanity types if available
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ gallery, open, onOpenChange, property }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true">
      {gallery.map((src: string, idx: number) => (
        <button
          key={`${src}-${idx}`}
          type="button"
          onClick={() => setActiveIdx(idx)}
          className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md transition focus:outline-none ring-1 ${
            idx === activeIdx ? "ring-2 ring-white border-ring/30" : "hover:opacity-90"
          }`}
          aria-label={`Preview image ${idx + 1}`}
        >
          <Image src={src} alt="Thumbnail" fill className="object-cover" sizes="80px" />
        </button>
      ))}
      <button type="button" onClick={() => onOpenChange(false)} aria-label="Close dialog">Close</button>
    </div>
  );
};

export default PropertyDetailsModal;
