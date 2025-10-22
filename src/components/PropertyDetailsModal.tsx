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
  background: 'rgba(34,34,38,0.45)',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(2px)'
};
const modalStyle: CSSProperties = {
  background: 'white',
  padding: 0,
  borderRadius: 18,
  maxWidth: 720,
  width: '95vw',
  boxShadow: '0 8px 36px rgba(0,0,0,0.23)',
  position: 'relative',
  overflow: 'hidden',
};

const galleryThumbStyle: CSSProperties = {
  width: 50, height: 42, objectFit: 'cover', borderRadius: 7, cursor: 'pointer', transition: 'border 0.2s'
};
const gallerySelectedStyle: CSSProperties = { border: '2px solid #FD5B61' };
const galleryUnselectedStyle: CSSProperties = { border: '1px solid #ececec' };

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
        <button type="button" onClick={() => onOpenChange(false)}
          aria-label="Close dialog"
          style={{position: 'absolute', right: 20, top: 20, fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#333', zIndex: 10, opacity: 0.65 }}>×</button>
        {gallery?.length ? (
          <div style={{ width: '100%', height: 280, position: 'relative', background: '#fafafa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={safeImageUrl(gallery[activeIdx])} alt={property?.title || "Image"} style={{ width: '97%', height: 264, objectFit: 'cover', borderRadius: '16px', boxShadow: '0 0 12px rgba(0,0,0,0.04)', position: 'absolute', left: '1.5%' }} />
            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, background: 'rgba(255,255,255,0.85)', padding: '7px 20px', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', alignItems: 'center' }}>
              {gallery.map((img: any, idx: number) => (
                <img
                  src={safeImageUrl(img)}
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  style={idx === activeIdx ? { ...galleryThumbStyle, ...gallerySelectedStyle } : { ...galleryThumbStyle, ...galleryUnselectedStyle }}
                  alt={(property?.title || 'Property') + ' thumbnail'}
                />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ width: '100%', height: 220, background: '#f5f7fa', borderRadius: '16px' }}></div>
        )}
        <div style={{ padding: '24px 34px' }}>
          <h2 style={{margin: '10px 0 9px', fontWeight: 700, fontSize: '1.63rem', letterSpacing: '-1px'}}>{property?.title}</h2>
          <div style={{ fontSize: '1.17rem', color: '#444', marginBottom: 12 }}>
            <span style={{ fontWeight: 700, color:'#FD5B61' }}>€{property?.price?.toLocaleString()}</span>
            {property?.beds && <span style={{marginLeft:24}}>{property?.beds} beds</span>}
            {property?.baths && <span style={{marginLeft:16}}>{property?.baths} baths</span>}
            {property?.sqft && <span style={{marginLeft:16}}>{property?.sqft} m²</span>}
            {property?.status && <span style={{marginLeft:16}}>{property?.status}</span>}
          </div>
          <div style={{marginBottom:14, fontSize:15, color:'#555'}}>
            <b style={{ fontWeight:600 }}>Address:</b> {property?.address?.street}, {property?.address?.city}, {property?.address?.region}, {property?.address?.country}
          </div>
          <div style={{marginBottom:18, fontSize:15, color:'#444'}}>
            <b style={{ fontWeight:600 }}>Description:</b> {property?.description}
          </div>
          <div style={{display:'flex', alignItems:'center', gap:18, marginBottom:24}}>
            <div style={{background:'#F2F0ED', borderRadius:11, padding:'8px 20px', display:'flex', alignItems:'center', boxShadow:'0 0 9px rgba(0,0,0,0.03)'}}>
              <div style={{fontWeight:600}}>Agent:</div>
              <div style={{marginLeft:10}}>
                <span style={{fontWeight: 500, color:'#FD5B61'}}>{property?.agent?.name}</span>
                <span style={{fontSize:13, color:'#999', marginLeft:7}}>( {property?.agent?.email || 'contact@company.com'} )</span>
              </div>
            </div>
          </div>
          <h3 style={{marginBottom:10, fontWeight:600, fontSize:18, color:'#444'}}>Contact Agent</h3>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:11, maxWidth:370, background:'#F7F5F6', borderRadius:12, padding:'18px 15px' }}>
            <input name="name" autoComplete="name" type="text" required value={form.name} placeholder="Your Name" onChange={handleChange} style={{padding:'10px 13px', border:'1px solid #e5e0dd', borderRadius: 8, fontSize: 15, background:'#fff'}} />
            <input name="email" autoComplete="email" type="email" required value={form.email} placeholder="Your Email" onChange={handleChange} style={{padding:'10px 13px', border:'1px solid #e5e0dd', borderRadius: 8, fontSize: 15, background:'#fff'}} />
            <textarea name="message" required value={form.message} placeholder="Your Message" rows={3} onChange={handleChange} style={{padding:'12px 13px', border:'1px solid #e5e0dd', borderRadius: 8, fontSize:15, background:'#fff'}} />
            <button type="submit" style={{padding:'12px 0', borderRadius:8, background:'#FD5B61', color:'#fff', fontWeight:'bold', border:'none',fontSize:16, marginTop:7}}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
