// Fix implicit any on src in map
// src/components/PropertyDetailsModal.tsx

// In the gallery.map, declare src as string

{gallery.map((src: string, idx: number) => (
  <button
    key={`${src}-${idx}`}
    type="button"
    onClick={() => setActiveIdx(idx)}
    className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md transition focus:outline-none ring-1 ${idx === activeIdx ? "ring-2 ring-white border-ring/30" : "hover:opacity-90"}`}
    aria-label={`Preview image ${idx + 1}`}
  >
    <Image src={src} alt="Thumbnail" fill className="object-cover" sizes="80px" />
  </button>
))}
