import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, BarChart3, ShieldCheck, ArrowRight, Building2, TrendingUp, Users, DollarSign, Smartphone, QrCode } from "lucide-react";
import { motion } from "framer-motion";

export default function Partner() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans">
      <div className="bg-primary pb-32 pt-16">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 -mt-24 flex-grow pb-24">
        {/* Hero Headline */}
        <div className="max-w-4xl mx-auto text-center mb-20 text-white">
          <Badge className="bg-secondary text-white border-none mb-6 px-6 py-2 text-xs font-black uppercase tracking-[0.2em] italic shadow-lg">LaPed Business Solution</Badge>
          <h1 className="text-6xl md:text-8xl font-heading font-black italic uppercase tracking-tighter mb-8 leading-[0.85]">
            DOMINASI PASAR <br />
            <span className="logo-text-red">OLAHRAGA LOKAL</span>
          </h1>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-bold italic leading-relaxed">
            Sistem manajemen venue tercanggih untuk pemilik GOR di Cikarang & Bekasi. 
            Otomatisasi jadwal, tingkatkan okupansi, dan maksimalkan cuan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="h-18 px-12 text-xl font-black italic uppercase tracking-tighter bg-secondary hover:bg-secondary/90 shadow-2xl shadow-secondary/40 rounded-2xl">
              DAFTAR MITRA SEKARANG
            </Button>
            <Button size="lg" variant="outline" className="h-18 px-12 text-xl font-black italic uppercase tracking-tighter bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl backdrop-blur-md">
              DASHBOARD DEMO
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { title: "OTOMATISASI JADWAL", desc: "Sistem booking 24 jam tanpa perlu admin manual. No more double booking.", icon: Zap },
            { title: "SMART ANALYTICS", desc: "Pantau jam ramai dan pendapatan harian lewat dashboard interaktif.", icon: BarChart3 },
            { title: "PEMBAYARAN QRIS", desc: "Dana masuk otomatis ke rekening Anda. Aman dan terintegrasi penuh.", icon: QrCode },
            { title: "PROMO DINAMIS", desc: "Buat promo otomatis di jam sepi untuk meningkatkan okupansi lapangan.", icon: TrendingUp }
          ].map((f, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <Card className="h-full rounded-[2.5rem] border-none shadow-2xl bg-white p-8 group overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                 <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    <f.icon className="w-8 h-8" />
                 </div>
                 <h3 className="text-lg font-black italic uppercase tracking-tighter mb-4 text-primary">{f.title}</h3>
                 <p className="text-sm font-medium text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Business Ecosystem Section */}
        <div className="bg-slate-900 rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,50,50,0.1)_0%,transparent_50%)]"></div>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(50,50,255,0.1)_0%,transparent_50%)]"></div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="text-white">
                 <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter mb-8 leading-tight">
                    EKOSISTEM BISNIS <br />
                    <span className="text-primary">MENGUNTUNGKAN</span>
                 </h2>
                 <div className="space-y-8 mb-12">
                    {[
                      { icon: Users, title: "AKSES 50.000+ USER", desc: "Venue Anda langsung terlihat oleh ribuan atlet aktif di daerah Cikarang & Bekasi." },
                      { icon: Smartphone, title: "MOBILE MANAGEMENT", desc: "Kontrol penuh bisnis Anda langsung dari smartphone kapanpun dan dimanapun." },
                      { icon: ShieldCheck, title: "BRANDING PREMIUM", desc: "Tingkatkan kelas GOR Anda dengan sistem reservasi digital standar internasional." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6">
                         <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                            <item.icon className="w-6 h-6 text-primary" />
                         </div>
                         <div>
                            <h4 className="font-black italic uppercase tracking-tighter text-lg">{item.title}</h4>
                            <p className="text-white/50 text-sm font-medium">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <Button className="h-14 px-10 rounded-2xl bg-primary text-white font-black italic uppercase tracking-tighter flex gap-3">
                    HUBUNGI TIM SALES KAMI <ArrowRight className="w-5 h-5" />
                 </Button>
              </div>

              <div className="relative">
                 <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                       <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                       </div>
                       <Badge className="bg-primary/20 text-primary font-bold">GOR PATRIOT DASHBOARD</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                       <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">TOTAL BOOKING</p>
                          <p className="text-2xl font-black italic tracking-tighter text-primary">1,248</p>
                       </div>
                       <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">REVENUE</p>
                          <p className="text-2xl font-black italic tracking-tighter text-secondary">Rp 128M</p>
                       </div>
                    </div>
                    
                    <div className="h-48 w-full bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-6">
                       <div className="w-full h-full flex items-end gap-2">
                          {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60].map((h, i) => (
                            <motion.div 
                              key={i} 
                              initial={{ height: 0 }} 
                              whileInView={{ height: `${h}%` }} 
                              className="flex-1 bg-primary/40 rounded-t-sm border-t-2 border-primary"
                            />
                          ))}
                       </div>
                    </div>
                 </div>
                 
                 {/* Floating Badge */}
                 <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border-4 border-slate-900 animate-bounce">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                          <DollarSign className="w-7 h-7" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">STATUS</p>
                          <p className="font-black italic uppercase tracking-tighter text-slate-900">PROFITABLE</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
