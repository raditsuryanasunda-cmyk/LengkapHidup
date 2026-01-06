import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VenueCard from "@/components/VenueCard";
import { MOCK_VENUES, CATEGORIES } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar as CalendarIcon, ChevronRight, Star, TrendingUp, Newspaper, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import heroImg from "@assets/generated_images/hero_background_of_diverse_people_playing_sports_like_futsal_and_badminton_energetically.png";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const newsItems = [
    { id: 1, title: "Timnas Futsal Indonesia Juara AFF 2026!", category: "Futsal", date: "Hari ini", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400" },
    { id: 2, title: "Kevin Sanjaya Umumkan Akademi Badminton di Cikarang", category: "Badminton", date: "2 jam yang lalu", image: "https://images.unsplash.com/photo-1626225967045-9c76db7b3ed4?auto=format&fit=crop&q=80&w=400" },
    { id: 3, title: "Liga Basket Mahasiswa Bekasi Dimulai Pekan Depan", category: "Basket", date: "Kemarin", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=400" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to login if not authenticated (Mock requirement)
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Sports Action" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-white font-bold text-xs tracking-widest uppercase">LAPANGAN PEDIA - CIKARANG & BEKASI</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-heading font-black text-white leading-[0.9] mb-8 italic tracking-tighter">
              TEMUKAN <br />
              <span className="logo-text-red drop-shadow-lg">LAPANGAN,</span> <br />
              <span className="text-white">WUJUDKAN MENANG.</span>
            </h1>
            
            {/* Custom Search Bar */}
            <div className="bg-white p-2 rounded-3xl shadow-2xl max-w-2xl flex flex-col md:flex-row gap-2 border-4 border-primary/10">
              <div className="flex-1 flex items-center px-6 border-b md:border-b-0 md:border-r border-slate-100 py-3 md:py-0">
                <Search className="w-5 h-5 text-primary mr-3" />
                <Input 
                  type="text" 
                  placeholder="Cari lapangan favorit..." 
                  className="border-none shadow-none focus-visible:ring-0 px-0 h-10 text-lg font-bold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                size="lg" 
                className="rounded-2xl h-14 px-10 font-black text-lg bg-secondary hover:bg-secondary/90 shadow-xl transition-all uppercase tracking-tighter italic"
                onClick={handleSearch}
              >
                Cek Jadwal
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-heading font-black italic tracking-tighter uppercase mb-2">Berita Olahraga</h2>
              <p className="text-muted-foreground font-medium">Update terkini dari dunia olahraga lokal & nasional</p>
            </div>
            <Button variant="outline" className="rounded-full font-bold border-2">Semua Berita</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <motion.div key={news.id} whileHover={{ y: -10 }} className="group cursor-pointer">
                <div className="rounded-[2.5rem] overflow-hidden bg-white shadow-lg border border-slate-100 h-full">
                  <div className="h-56 relative overflow-hidden">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <Badge className="absolute top-4 left-4 bg-secondary text-white font-bold">{news.category}</Badge>
                  </div>
                  <div className="p-8">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{news.date}</p>
                    <h3 className="text-xl font-bold font-heading leading-tight group-hover:text-secondary transition-colors mb-4">{news.title}</h3>
                    <div className="flex items-center text-primary font-bold text-sm">
                      Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues (Most Used) */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-heading font-black italic tracking-tighter uppercase mb-4">Paling Sering Digunakan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-medium text-lg">Lapangan dengan tingkat okupansi tertinggi dan favorit para atlet Cikarang.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {MOCK_VENUES.slice(0, 3).map((venue, idx) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
