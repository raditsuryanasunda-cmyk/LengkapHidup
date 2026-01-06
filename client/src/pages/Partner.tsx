import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, BarChart3, Users, DollarSign, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Partner() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <div className="bg-slate-900 pb-20">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 -mt-10 flex-grow pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16 text-white">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4 px-4 py-1 text-sm font-bold uppercase tracking-wider">LaPed Partner Program</Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight">
            Digitalisasi Venue Anda & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Tingkatkan Pendapatan</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-light">
            Bergabunglah dengan ratusan pemilik GOR di Cikarang & Bekasi yang telah beralih ke sistem booking digital otomatis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl shadow-primary/20">Daftar Jadi Mitra</Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold bg-white/5 border-white/20 text-white hover:bg-white/10">Pelajari Fitur</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Manajemen Otomatis",
              desc: "Kelola jadwal lapangan 24/7 tanpa perlu admin standby terus menerus.",
              icon: Zap,
              color: "bg-blue-500"
            },
            {
              title: "Analitik Bisnis",
              desc: "Pantau laporan pendapatan dan tingkat okupansi lapangan secara real-time.",
              icon: BarChart3,
              color: "bg-primary"
            },
            {
              title: "Pembayaran Aman",
              desc: "Sistem pembayaran digital terintegrasi yang menjamin dana masuk tepat waktu.",
              icon: ShieldCheck,
              color: "bg-secondary"
            }
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-8">
                  <div className={`w-14 h-14 rounded-2xl ${benefit.color} text-white flex items-center justify-center mb-6 shadow-lg`}>
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Kelola Venue dalam Satu Genggaman</h2>
              <ul className="space-y-4 mb-8">
                {[
                  "Update harga di hari libur secara otomatis",
                  "Sistem informasi keolahragaan terintegrasi",
                  "Promo khusus untuk hari besar & tanggal kembar",
                  "Sistem verifikasi booking via QR Code"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                      <Zap className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold h-12 px-8">
                Mulai Dashboard Demo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <Badge variant="outline" className="text-white border-white/20">Live Dashboard</Badge>
              </div>
              <div className="space-y-4 opacity-50 select-none">
                <div className="h-8 bg-white/10 rounded w-1/3"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-white/10 rounded-xl"></div>
                  <div className="h-24 bg-white/10 rounded-xl"></div>
                  <div className="h-24 bg-white/10 rounded-xl"></div>
                </div>
                <div className="h-40 bg-white/10 rounded-xl"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white text-slate-900 px-6 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-2 animate-bounce">
                  <TrendingUp className="w-5 h-5 text-primary" /> +35% Booking Baru
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
