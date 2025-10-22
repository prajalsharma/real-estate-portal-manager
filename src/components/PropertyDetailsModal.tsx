import Image from "next/image";
import React, { useState, CSSProperties } from "react";
import { safeImageUrl } from "@/lib/sanity/image";

interface PropertyDetailsModalProps {
  gallery: any[]; // Array of SanityImage objects
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  property: any;
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.2)',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
const modalStyle: CSSProperties = {
  background: 'white',
  padding: 24,
  borderRadius: 12,
  maxWidth: 640,
  width: '100%',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  position: 'relative'
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
    alert("Message sent to agent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={overlayStyle}>
      <div role="dialog" aria-modal="true" style={modalStyle}>
        <button type="button" onClick={() => onOpenChange(false)} aria-label="Close dialog" style={{position: 'absolute', right: 16, top: 16}}>Close</button>
        <h2 style={{margin: '16px 0'}}>{property?.title}</h2>
        <div style={{display: 'flex', gap: 24, flexWrap: 'wrap'}}>
          {gallery?.length ? (
            <div style={{minWidth: 200}}>
              <img src={safeImageUrl(gallery[activeIdx])} alt={property?.title || "Image"} style={{width:200, height:150, objectFit:'cover', borderRadius:8}} />
              <div style={{display:'flex', gap: 8, marginTop: 8}}>
                {gallery.map((img: any, idx: number) => (
                  <img
                    src={safeImageUrl(img)}
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    style={{width:40, height:30, objectFit:'cover', borderRadius: 6, border: idx===activeIdx ? '2px solid #FFA933' : '1px solid #ddd', cursor:'pointer'}}
                    alt={(property?.title || 'Property') + ' thumbnail'}
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
    </div>
  );
};

export default PropertyDetailsModal;
