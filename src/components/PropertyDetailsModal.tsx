import Image from "next/image";
import React, { useState, CSSProperties } from "react";
import { safeImageUrl, getAgentAvatarUrl } from "@/lib/sanity/image";

interface PropertyDetailsModalProps {
  gallery: any[];
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

const FORM_POPUP_BG = 'rgba(255,255,255,0.98)';
const FORM_POPUP_STYLE: CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  zIndex: 2001,
  background: FORM_POPUP_BG,
  boxShadow: '0 8px 36px rgba(0,0,0,0.16)',
  borderRadius: 16,
  padding: '32px 36px 28px',
  maxWidth: 470,
  width: '88vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  animation: 'fadeIn .23s cubic-bezier(.16,1,.29,.99)' // Keyframes should be globally defined
};

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ gallery, open, onOpenChange, property }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [formMode, setFormMode] = useState<'none'|'request_tour'|'contact_agent'>('none');
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  if (!open || !property) return null;
  const agent = property.agent || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent to agent!");
    setForm({ name: "", email: "", phone: "", message: "" });
    setFormMode('none');
  };
  const handleCloseForm = () => {
    setFormMode('none');
  };
  return (
    <div style={overlayStyle}>
      <div role="dialog" aria-modal="true" style={modalStyle}>
        {/* Highly visible close button */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close dialog"
          style={{position: 'absolute', right: 24, top: 24, fontSize: 28, background: '#fff', border: '2px solid #FD5B61', borderRadius: '50%', cursor: 'pointer', color: '#FD5B61', width:44, height:44, zIndex: 20, boxShadow:'0 3px 8px rgba(0,0,0,0.12)'}}>
          ×
        </button>
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
        <div style={{ display:'flex', flexDirection:'row', gap:32, alignItems:'flex-start', padding: '24px 34px 18px' }}>
          <div style={{ flex:2 }}>
            <h2 style={{margin: 0, fontWeight: 700, fontSize: '1.55rem', letterSpacing: '-1px'}}>{property?.title}</h2>
            <div style={{ fontSize: '1.19rem', color: '#444', marginBottom: 10, marginTop:4 }}>
              <span style={{ fontWeight: 750, color:'#FD5B61' }}>€{property?.price?.toLocaleString()}</span>
              {property?.beds && <span style={{marginLeft:24}}>{property?.beds} bd</span>}
              {property?.baths && <span style={{marginLeft:14}}>{property?.baths} ba</span>}
              {property?.sqft && <span style={{marginLeft:14}}>{property?.sqft} m²</span>}
              {property?.status && <span style={{marginLeft:14}}>{property?.status}</span>}
            </div>
            <div style={{marginBottom:10, fontSize:15, color:'#666'}}>
              <b style={{ fontWeight:600 }}>Address:</b> {property?.address?.street}, {property?.address?.city}, {property?.address?.region}, {property?.address?.country}
            </div>
            <div style={{marginBottom:18, fontSize:15, color:'#494949'}}>
              <b style={{ fontWeight:550 }}>Description:</b> {property?.description}
            </div>
            <div style={{display:'flex', gap:14, flexWrap:'wrap', marginBottom:14}}>
              {property?.features?.length > 0 && (
                <div style={{background:'#FAF3F2', borderRadius:8, padding:'4.5px 12px', fontSize:14, color:'#cb2947', fontWeight:600}}>
                  {property?.features.join(', ')}
                </div>
              )}
              {property?.amenities?.length > 0 && (
                <div style={{background:'#F4F8EF', borderRadius:8, padding:'4px 10px', fontSize:14, color:'#3e734c', fontWeight:500}}>
                  Amenities: {property?.amenities.join(', ')}
                </div>
              )}
            </div>
            <button onClick={()=>setFormMode('request_tour')} style={{background:'#D8B573',color:'#fff', fontWeight:700, padding:'9px 24px', border:'none', borderRadius:7, fontSize:15, marginRight:10, boxShadow:'0 2px 6px #e2bd73cc'}}>Request a tour</button>
            <button onClick={()=>setFormMode('contact_agent')} style={{background:'#f8f9fa',color:'#715a21', fontWeight:600, padding:'8px 20px', border:'1.2px solid #ece9dc', borderRadius:7, fontSize:15}}>Contact Agent</button>
          </div>
          <div style={{ flex:1, minWidth:190 }}>
            <div style={{ background:'#FAFAF6', borderRadius:15, padding:'17px 17px', display:'flex', flexDirection:'column', alignItems:'center', boxShadow:'0 0 10px 1px rgba(70,70,38,0.04)' }}>
              <img src={getAgentAvatarUrl(agent.avatar, 64)} alt={agent.name || 'Agent Photo'} style={{width:64, height:64, borderRadius:'50%', objectFit:'cover', marginBottom:10, boxShadow:'0 2px 9px #e8e2dc9c'}} />
              <div style={{fontWeight:700, fontSize:18, marginBottom:2, color:'#423720'}}>{agent.name}</div>
              <div style={{color:'#a18644', fontWeight:500, fontSize:15, marginBottom:5}}>{agent.role}</div>
              <div style={{fontSize:14, color:'#7a7971', marginBottom:7}}>{agent.bio || 'No bio available.'}</div>
              <div style={{display:'flex', gap:8, flexWrap:'wrap', fontSize:13, color:'#8b7a34', justifyContent:'center'}}>
                {agent.phone && <div>📞 {agent.phone}</div>}
                {agent.email && <div>✉️ {agent.email}</div>}
                {agent.specializations?.length > 0 && <div>{agent.specializations.join(', ')}</div>}
                {agent.languages?.length > 0 && <div>🌍 {agent.languages.join(', ')}</div>}
                <div>⭐ {agent.rating || 5.0}</div>
                <div>Deals closed: {agent.sold || 0}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Form as a separate popup above the modal */}
        {formMode !== 'none' && (
          <div style={FORM_POPUP_STYLE}>
            <button
              type="button"
              onClick={handleCloseForm}
              aria-label="Close form"
              style={{position: 'absolute', right: 16, top: 15, fontSize: 25, background: '#fff', border: '2px solid #FD5B61', borderRadius: '50%', cursor: 'pointer', color: '#FD5B61', width:39, height:39, zIndex: 20, boxShadow:'0 2px 6px #fcd4d6'}}>
              ×
            </button>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:19, width:'98%', margin:'28px auto 0', background:'#F9FAF8', borderRadius:13, padding:'13px', boxShadow:'0 0 5px 1.5px rgba(60,50,40,0.04)'}}>
              <h3 style={{margin:0, marginBottom:2, fontWeight:650, fontSize:20, color:'#FD5B61'}}>{formMode==='request_tour'?"Request a Tour":"Contact Agent"}</h3>
              <div style={{display:'flex',gap:11, flexWrap:'wrap'}}>
                <input name="name" autoComplete="name" type="text" required value={form.name} placeholder="Full Name" onChange={handleChange} style={{padding:'13px', border:'1px solid #e5e0dd', borderRadius: 7, fontSize: 16, background:'#fff', flex:1}} />
                <input name="email" autoComplete="email" type="email" required value={form.email} placeholder="Email" onChange={handleChange} style={{padding:'13px', border:'1px solid #e5e0dd', borderRadius: 7, fontSize: 16, background:'#fff', flex:1}} />
              </div>
              <input name="phone" autoComplete="tel" type="tel" pattern="[+0-9().\-\s]{7,}" value={form.phone} placeholder="Phone number" onChange={handleChange} style={{padding:'13px', border:'1px solid #e5e0dd', borderRadius: 7, fontSize: 16, background:'#fff'}} />
              <textarea name="message" required value={form.message} placeholder={formMode==='request_tour'?"Requested dates, times, and your questions":'Your Message'} rows={formMode==='request_tour'?2:3} onChange={handleChange} style={{padding:'14px', border:'1px solid #e5e0dd', borderRadius: 8, fontSize:16, background:'#fff'}} />
              <div style={{display:'flex', gap:14, justifyContent:'flex-end', marginTop:3}}>
                <button type="button" onClick={handleCloseForm} style={{padding:'12px 0', borderRadius:7, background:'#f2e9e2', color:'#cd8250', fontWeight:'bold', border:'none', fontSize:15, minWidth:90}}>Cancel</button>
                <button type="submit" style={{padding:'12px 0', borderRadius:7, background:'#FD5B61', color:'#fff', fontWeight:'bold', border:'none', fontSize:16, minWidth:130}}>{formMode==='request_tour'?"Request tour":"Send message"}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
