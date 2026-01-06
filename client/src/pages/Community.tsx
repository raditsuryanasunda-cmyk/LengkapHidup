import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Trophy, Calendar, Search, Plus } from "lucide-react";
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
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <div className="bg-slate-900 pb-20">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 -mt-10 flex-grow pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-heading font-bold text-white mb-2">Komunitas LaPed</h1>
            <p className="text-slate-300">Temukan teman mabar dan bangun jaringan olahragamu</p>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 text-white shadow-lg flex gap-2">
            <Plus className="w-4 h-4" /> Buat Komunitas
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-100 dark:border-slate-800 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Diskusi Populer</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary font-bold">Lihat Semua</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((post) => (
                  <div key={post} className="p-4 rounded-xl border border-slate-50 hover:border-primary/20 hover:bg-slate-50 transition-all cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                      <div>
                        <p className="font-bold text-sm">Ahmad Fauzi</p>
                        <p className="text-xs text-muted-foreground">2 jam yang lalu di Cikarang Futsal Lovers</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-4">
                      Ada yang mau mabar futsal besok sore di LaPed Arena Cikarang? Kurang 3 orang lagi nih.
                    </p>
                    <div className="flex gap-4 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 12 Komentar</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 5 Ikut mabar</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-slate-100 dark:border-slate-800 shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="pt-6">
                  <Trophy className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2">Turnamen Komunitas</h3>
                  <p className="text-sm text-muted-foreground mb-4">Ikuti kompetisi lokal dan menangkan hadiah menarik.</p>
                  <Button size="sm">Cek Jadwal</Button>
                </CardContent>
              </Card>
              <Card className="border-slate-100 dark:border-slate-800 shadow-sm bg-gradient-to-br from-secondary/5 to-transparent">
                <CardContent className="pt-6">
                  <Calendar className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="font-bold text-lg mb-2">Mabar Rutin</h3>
                  <p className="text-sm text-muted-foreground mb-4">Cari jadwal mabar terdekat dengan lokasimu.</p>
                  <Button variant="secondary" size="sm" className="text-white">Cari Mabar</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-slate-100 dark:border-slate-800 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Komunitas Rekomendasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {groups.map((group) => (
                  <div key={group.name} className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                    <img src={group.image} alt={group.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{group.name}</h4>
                      <p className="text-xs text-muted-foreground">{group.members} Anggota • {group.activity}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">Jelajahi Semua</Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-none shadow-xl">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">Fitur Badge Baru!</h3>
                <p className="text-sm text-slate-400 mb-4">Dapatkan badge khusus dengan aktif di komunitas dan mabar rutin.</p>
                <div className="flex gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50"><Trophy className="w-4 h-4 text-yellow-500" /></div>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50"><Users className="w-4 h-4 text-blue-500" /></div>
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50"><Calendar className="w-4 h-4 text-green-500" /></div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Lihat Pencapaian</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
