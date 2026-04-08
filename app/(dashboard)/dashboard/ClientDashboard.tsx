'use client';

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsBar from "@/components/dashboard/StatsBar";
import ReviewCard from "@/components/dashboard/ReviewCard";
import EmptyState from "@/components/dashboard/EmptyState";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";

interface LocationItem { id: string; name: string;[key: string]: unknown; }
interface ReviewItem { id: string; location_id: string; reviewer_name?: string; rating: number; comment?: string; review_date: string; replied?: boolean; ai_reply_draft?: string | null;[key: string]: unknown; }

interface Props {
  isConnected: boolean;
  locations: LocationItem[];
  reviews: ReviewItem[];
  userName: string;
  userAvatar: string;
  userId: string;
}

export default function ClientDashboard({ isConnected, locations, reviews, userName, userAvatar, userId }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLocationId, setActiveLocationId] = useState<string | null>(
    locations.length > 0 ? locations[0].id : null
  );

  const [showTypeModal, setShowTypeModal] = useState(false);
  const [businessType, setBusinessType] = useState("");
  const [customType, setCustomType] = useState("");
  const [isSavingType, setIsSavingType] = useState(false);

  const options = [
    "Restaurante / Cafetería",
    "Clínica / Consultorio",
    "Salón de belleza / Spa",
    "Taller / Servicio técnico",
    "Hotel / Hospedaje",
    "Tienda / Comercio",
    "Otro"
  ];

  const activeLocation = locations.find(l => l.id === activeLocationId);

  useEffect(() => {
    if (activeLocation && (!activeLocation.business_type || activeLocation.business_type === 'negocio local')) {
      setShowTypeModal(true);
      setBusinessType("");
      setCustomType("");
    } else {
      setShowTypeModal(false);
    }
  }, [activeLocation]);


  const handleConnect = () => {
    window.location.href = "/api/auth/google";
  };

  const handleSync = () => {
    console.log("Syncing...");
  };

  const handleGenerate = async (id: string) => {
    console.log("Generating for", id);
  };

  const handleApprove = async (id: string, text: string) => {
    console.log("Approving", id, text);
  };

  const locationReviews = reviews.filter(r => r.location_id === activeLocationId);
  const answeredCount = locationReviews.filter(r => r.replied).length;
  
  const totalReviewsThisMonth = locationReviews.length;
  const avgRating = totalReviewsThisMonth > 0 
    ? (locationReviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviewsThisMonth).toFixed(1) 
    : "0.0";

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">

      {showTypeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Cuéntanos sobre tu negocio</h3>
            <p className="text-slate-600 mb-6">Para que la IA genere respuestas perfectas, indícanos qué tipo de negocio es <strong>{activeLocation?.name}</strong>.</p>
            
            <div className="space-y-3 mb-6">
              {options.map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${businessType === opt ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200'}`}>
                  <input type="radio" name="btype" value={opt} checked={businessType === opt} onChange={() => setBusinessType(opt)} className="w-5 h-5 text-blue-600 focus:ring-blue-600" />
                  <span className="font-medium text-slate-700">{opt}</span>
                </label>
              ))}
              
              {businessType === "Otro" && (
                <input 
                  type="text" 
                  placeholder="Ej: Agencia de marketing, Gimnasio..." 
                  className="w-full mt-2 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                />
              )}
            </div>

            <button 
              onClick={async () => {
                const finalType = businessType === "Otro" ? customType : businessType;
                if (!finalType.trim()) return;
                
                setIsSavingType(true);
                try {
                  const res = await fetch(`/api/locations/${activeLocationId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ business_type: finalType })
                  });
                  if (res.ok) {
                    setShowTypeModal(false);
                    if (activeLocation) {
                      activeLocation.business_type = finalType;
                    }
                  }
                } catch (e) {
                  console.error(e);
                } finally {
                  setIsSavingType(false);
                }
              }}
              disabled={!businessType || (businessType === "Otro" && !customType.trim()) || isSavingType}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSavingType ? "Guardando..." : "Guardar y continuar"}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Button - Top Right */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 right-4 z-30 p-2 bg-white rounded-lg shadow-sm border border-slate-200"
      >
        <Menu className="w-5 h-5 text-slate-600" />
      </button>

      {/* Sidebar with enhanced location switcher */}
      <Sidebar 
        userName={userName}
        userAvatar={userAvatar}
        plan="trial"
        locations={locations.map(l => ({ id: l.id, name: l.name }))}
        activeLocationId={activeLocationId}
        setActiveLocationId={setActiveLocationId}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main SaaS Content Area */}
      <main className="flex-1 flex flex-col items-center overflow-x-hidden">
         <div className="w-full max-w-5xl px-4 md:px-8 py-8 md:py-12">
            {!isConnected ? (
              <EmptyState 
                 hasGoogleConnected={false}
                 onConnect={handleConnect}
                 onSync={handleSync}
              />
            ) : (
               <>
                 <div className="mb-8">
                   <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Bienvenido, {userName}</h1>
                   <p className="text-slate-500">Aquí tienes el resumen y las reseñas recientes de tus ubicaciones.</p>
                 </div>

                 {/* Top modern metrics bar */}
                 <StatsBar 
                   pending={locationReviews.filter(r => !r.replied).length}
                   answeredThisMonth={answeredCount}
                   averageRating={avgRating}
                   totalThisMonth={totalReviewsThisMonth}
                 />

                 {locationReviews.length === 0 ? (
                    <EmptyState 
                       hasGoogleConnected={true}
                       onConnect={handleConnect}
                       onSync={handleSync}
                    />
                 ) : (
                    <div className="space-y-6">
                       <h2 className="text-xl font-bold text-slate-800">Reseñas de la Ubicación</h2>
                       {locationReviews.map(r => (
                         <ReviewCard 
                           key={r.id}
                           review={{
                              id: r.id,
                              reviewer_name: r.reviewer_name || "Anónimo",
                              rating: r.rating,
                              comment: r.comment || "Sin comentario provisto.",
                              date: new Date(r.review_date).toLocaleDateString(),
                              status: r.replied ? 'PUBLISHED' : 'PENDING',
                              ai_reply_draft: r.ai_reply_draft
                           }}
                           onGenerate={handleGenerate}
                           onApprove={handleApprove}
                         />
                       ))}
                    </div>
                 )}

                 {/* Analytics Section below reviews */}
                 {activeLocationId && (
                    <AnalyticsSection 
                       locationId={activeLocationId} 
                       userId={userId} 
                       locationName={activeLocation?.name || ""} 
                    />
                 )}
               </>
            )}
         </div>
      </main>
    </div>
  );
}
