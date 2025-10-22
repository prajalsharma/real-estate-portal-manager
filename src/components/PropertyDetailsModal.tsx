import Image from "next/image";
import React, { useState } from "react";

interface PropertyDetailsModalProps {
  gallery: string[];
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  property: any; // Replace 'any' with PropertyQueryResult for proper typing
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ gallery, open, onOpenChange, property }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  if (!open || !property) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send details to API, but here just show an alert
    alert("Message sent to agent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div role="dialog" aria-modal="true" style={{background: 'white', padding: 24, borderRadius: 12, maxWidth: 640, margin: "2rem auto", boxShadow: "0 8px 32px rgba(0,0,0,0.2)"}}>
      <button type="button" onClick={() => onOpenChange(false)} aria-label="Close dialog" style={{float: 'right', marginBottom: 12}}>Close</button>

      <h2 style={{margin: '16px 0'}}>{property?.title}</h2>
      <div style={{display: 'flex', gap: 24}}>
        {gallery?.length ? (
          <div style={{minWidth: 200}}>
            <Image src={gallery[activeIdx]} alt={property?.title || "Image"} width={200} height={150} style={{objectFit: 'cover'}} />
            <div style={{display:'flex', gap: 8, marginTop: 8}}>
              {gallery.map((src: string, idx: number) => (
                <img
                  src={src}
                  key={src + idx}
                  onClick={() => setActiveIdx(idx)}
                  style={{width:40, height:30, objectFit:'cover', borderRadius: 6, border: idx===activeIdx ? '2px solid #FFA933' : '1px solid #ddd', cursor:'pointer'}}
                  alt={property?.title + " thumbnail"}
                />
              ))}
            </div>
          </div>
        ) : null}
        <div>
          <p><b>Price:</b> EUR {property?.price?.toLocaleString()}</p>
          <p><b>Bedrooms:</b> {property?.beds}</p>
          <p><b>Bathrooms:</b> {property?.baths}</p>
          <p><b>Area:</b> {property?.sqft} m²</p>
          <p><b>Status:</b> {property?.status}</p>
          <p><b>Address:</b> {property?.address?.street}, {property?.address?.city}, {property?.address?.region}, {property?.address?.country}</p>
          <p><b>Description:</b> {property?.description}</p>
          <p><b>Agent:</b> {property?.agent?.name} ({property?.agent?.email || '-'})</p>
        </div>
      </div>
      <hr style={{margin:'18px 0'}} />
      <h3>Contact Agent</h3>
      <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:8, maxWidth:360}}>
        <input name="name" type="text" required value={form.name} placeholder="Your Name" onChange={handleChange} style={{padding:8, border:'1px solid #ccc', borderRadius:5}} />
        <input name="email" type="email" required value={form.email} placeholder="Your Email" onChange={handleChange} style={{padding:8, border:'1px solid #ccc', borderRadius:5}} />
        <textarea name="message" required value={form.message} placeholder="Your Message" rows={3} onChange={handleChange} style={{padding:8, border:'1px solid #ccc', borderRadius:5}} />
        <button type="submit" style={{padding:10, borderRadius:5, background:'#FFA933', color:'#fff', fontWeight:'bold', border:'none'}}>Send Message</button>
      </form>
    </div>
  );
};

export default PropertyDetailsModal;
