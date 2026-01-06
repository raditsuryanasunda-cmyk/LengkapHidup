import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Trophy, Calendar, Search, Plus, MessageCircle, Share2, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Community() {
  const groups = [
    {
      name: "Cikarang Futsal Lovers",
      members: "1.2k",
      activity: "Sangat Aktif",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=200",
      description: "Komunitas pecinta futsal se-Cikarang Raya. Rutin mabar setiap weekend."
    },
    {
      name: "Badminton Bekasi Community",
      members: "850",
      activity: "Aktif",
      image: "https://images.unsplash.com/photo-1626225967045-9c76db7b3ed4?auto=format&fit=crop&q=80&w=200",
      description: "Wadah silaturahmi pemain badminton area Bekasi Kota dan sekitarnya."
    },
    {
      name: "Jababeka Runner",
      members: "420",
      activity: "Aktif",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=200",
      description: "Komunitas lari pagi/sore di sekitaran Jababeka & Living Plaza."
    },
    {
      name: "Bekasi Basket Squad",
      members: "610",
      activity: "Populer",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=200",
      description: "Main bareng basket di area Bekasi, dari pemula sampai pro."
    },
    {
      name: "Cikarang Tennis Club",
      members: "150",
      activity: "Baru",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=200",
      description: "Eksklusif untuk pecinta Tennis di Cikarang & Jababeka."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans">
      <div className="bg-primary pb-20 pt-10">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 -mt-10 flex-grow pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-white mb-2">Komunitas Kami</h1>
            <p className="text-white/60 font-bold">Bangun tim impianmu dan menangkan pertandingan!</p>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 text-white font-black italic uppercase tracking-tighter h-14 px-8 rounded-2xl shadow-xl flex gap-3">
            <Plus className="w-5 h-5" /> Buat Komunitas
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Feed - Discussion Board */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-white">
              <CardHeader className="bg-slate-50 border-b p-8">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-heading font-black italic uppercase tracking-tighter">Papan Diskusi & Mabar</CardTitle>
                  <Button variant="outline" size="sm" className="rounded-xl font-bold">Filter Kategori</Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {[
                  { user: "Ahmad Fauzi", group: "Cikarang Futsal Lovers", time: "10m ago", text: "Kurang 2 orang lagi buat mabar jam 7 malam ini di LaPed Arena! Yang minat langsung reply ya.", comments: 24, joins: 8 },
                  { user: "Siska Putri", group: "Badminton Bekasi", time: "1h ago", text: "Ada yang tau lapangan badminton yang kosong sabtu pagi daerah Tambun?", comments: 5, joins: 0 },
                  { user: "Rian Hidayat", group: "Bekasi Basket Squad", time: "3h ago", text: "Open sparring vs tim basket Lippo Cikarang. Level intermediate aja.", comments: 15, joins: 12 }
                ].map((post, i) => (
                  <div key={i} className="p-6 rounded-[2rem] border-2 border-slate-50 hover:border-primary/20 hover:bg-slate-50/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                         {post.user[0]}
                      </div>
                      <div>
                        <p className="font-black text-primary uppercase italic text-sm tracking-tighter">{post.user}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{post.time} • di {post.group}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-slate-700 leading-tight mb-6 italic">
                      "{post.text}"
                    </p>
                    <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest">
                       <span className="flex items-center gap-2 text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
                         <MessageCircle className="w-4 h-4" /> {post.comments} DISKUSI
                       </span>
                       <span className="flex items-center gap-2 text-secondary bg-secondary/5 px-3 py-1.5 rounded-full border border-secondary/10">
                         <Zap className="w-4 h-4" /> {post.joins} BERGABUNG
                       </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                 <Trophy className="w-12 h-12 text-secondary mb-6" />
                 <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter mb-2">Liga Amatir LaPed</h3>
                 <p className="text-white/60 font-bold mb-6">Daftarkan komunitasmu dan raih trophy bergengsi setiap bulan.</p>
                 <Button className="rounded-xl font-bold bg-white text-primary hover:bg-slate-100">Cek Klasemen</Button>
              </div>
              <div className="bg-secondary rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                 <MessageSquare className="w-12 h-12 text-primary mb-6" />
                 <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter mb-2">Mabar Terdekat</h3>
                 <p className="text-white/60 font-bold mb-6">Gak ada temen main? Cari jadwal mabar yang butuh orang sekarang.</p>
                 <Button className="rounded-xl font-bold bg-white text-secondary hover:bg-slate-100">Cari Jadwal</Button>
              </div>
            </div>
          </div>

          {/* Sidebar - Recommendations */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-white">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-xl font-heading font-black italic uppercase tracking-tighter">Temukan Komunitas</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-5">
                {groups.map((group, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-[1.5rem] hover:bg-slate-50 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
                    <img src={group.image} alt={group.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-primary truncate uppercase italic tracking-tighter">{group.name}</h4>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{group.members} ATLET • {group.activity}</p>
                      <Button variant="link" className="p-0 h-auto text-xs font-black text-secondary uppercase tracking-widest italic">Gabung Grup</Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full h-12 rounded-2xl font-bold mt-4" variant="outline">Lihat Semua Grup</Button>
              </CardContent>
            </Card>

            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
               <TrendingUp className="w-10 h-10 text-primary mb-6" />
               <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter mb-4">Top Player Cikarang</h3>
               <div className="space-y-4 mb-8">
                  {[1,2,3].map(rank => (
                    <div key={rank} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10">
                       <div className="flex items-center gap-3">
                          <span className="font-black text-secondary italic">#{rank}</span>
                          <span className="font-bold text-sm">Player Name {rank}</span>
                       </div>
                       <Badge variant="outline" className="text-white border-white/20">{1000 - (rank*100)} PTS</Badge>
                    </div>
                  ))}
               </div>
               <Button className="w-full h-12 rounded-2xl font-black italic uppercase tracking-tighter bg-primary text-white">Lihat Leaderboard</Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
