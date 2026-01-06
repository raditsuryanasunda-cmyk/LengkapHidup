import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_USER, MOCK_VENUES } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Clock, MapPin, LogOut, Settings, User, Camera, Bell, Shield, Wallet } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useLocation } from "wouter";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    phone: "0812-3456-7890",
    city: "Cikarang"
  });

  const upcomingBookings = MOCK_USER.bookings.filter(b => b.status === "confirmed" || b.status === "pending");
  const pastBookings = MOCK_USER.bookings.filter(b => b.status === "completed" || b.status === "cancelled");

  const getVenueData = (id: string) => MOCK_VENUES.find(v => v.id === id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <div className="bg-primary pb-24 pt-10">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 -mt-16 flex-grow pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Sidebar - Navigation & Quick Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white">
              <div className="h-32 bg-secondary relative">
                 <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="px-8 relative -mt-16 pb-8">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-[2rem] bg-white p-1 shadow-2xl overflow-hidden border-4 border-white">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`} 
                      alt="User" 
                      className="w-full h-full rounded-[1.5rem] bg-slate-100"
                    />
                  </div>
                  <Button size="icon" className="absolute bottom-0 right-0 rounded-xl h-10 w-10 shadow-lg border-2 border-white">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <h2 className="font-heading font-black text-3xl uppercase italic tracking-tighter logo-text-blue">{userData.name}</h2>
                <p className="text-muted-foreground font-bold mb-6">{userData.email}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                     <Trophy className="w-6 h-6 text-primary mb-2" />
                     <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">POIN</p>
                     <p className="text-xl font-black italic tracking-tighter text-primary">{MOCK_USER.points}</p>
                  </div>
                  <div className="bg-secondary/5 rounded-2xl p-4 border border-secondary/10">
                     <Wallet className="w-6 h-6 text-secondary mb-2" />
                     <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">SALDO</p>
                     <p className="text-xl font-black italic tracking-tighter text-secondary">Rp 0</p>
                  </div>
                </div>

                <div className="space-y-2">
                   <Button variant="ghost" className="w-full justify-between h-14 rounded-2xl hover:bg-slate-50 group px-6">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-primary" />
                        <span className="font-bold">Notifikasi</span>
                      </div>
                      <Badge className="bg-secondary">3</Badge>
                   </Button>
                   <Button variant="ghost" className="w-full justify-start gap-3 h-14 rounded-2xl hover:bg-slate-50 px-6 font-bold">
                      <Shield className="w-5 h-5 text-primary" /> Keamanan Akun
                   </Button>
                   <Button variant="ghost" className="w-full justify-start gap-3 h-14 rounded-2xl hover:bg-slate-50 px-6 font-bold text-red-500 hover:text-red-600" onClick={() => setLocation("/login")}>
                      <LogOut className="w-5 h-5" /> Keluar
                   </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-8">
            <Card className="rounded-[3rem] border-none shadow-2xl bg-white overflow-hidden min-h-[700px]">
              <Tabs defaultValue="profile" className="w-full h-full flex flex-col">
                <div className="px-8 pt-8 border-b">
                  <TabsList className="bg-transparent h-auto p-0 gap-8">
                    <TabsTrigger value="profile" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-0 font-black italic uppercase tracking-tighter text-lg text-muted-foreground data-[state=active]:text-primary">Profil</TabsTrigger>
                    <TabsTrigger value="bookings" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-0 font-black italic uppercase tracking-tighter text-lg text-muted-foreground data-[state=active]:text-primary">Jadwal Main</TabsTrigger>
                    <TabsTrigger value="settings" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-0 font-black italic uppercase tracking-tighter text-lg text-muted-foreground data-[state=active]:text-primary">Pengaturan</TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex-grow p-10">
                  <TabsContent value="profile" className="mt-0">
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter">Informasi Pribadi</h3>
                      {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} className="rounded-xl px-8 font-bold">Edit Profil</Button>
                      ) : (
                        <div className="flex gap-2">
                           <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-xl px-8 font-bold">Batal</Button>
                           <Button onClick={() => setIsEditing(false)} className="rounded-xl px-8 font-bold bg-secondary hover:bg-secondary/90">Simpan</Button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <Label className="font-black uppercase tracking-widest text-[10px] text-muted-foreground">Nama Lengkap</Label>
                          {isEditing ? (
                            <Input value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} className="h-12 rounded-xl font-bold" />
                          ) : (
                            <p className="text-lg font-bold text-primary bg-slate-50 p-4 rounded-2xl border border-slate-100">{userData.name}</p>
                          )}
                       </div>
                       <div className="space-y-3">
                          <Label className="font-black uppercase tracking-widest text-[10px] text-muted-foreground">Email</Label>
                          {isEditing ? (
                            <Input value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} className="h-12 rounded-xl font-bold" />
                          ) : (
                            <p className="text-lg font-bold text-primary bg-slate-50 p-4 rounded-2xl border border-slate-100">{userData.email}</p>
                          )}
                       </div>
                       <div className="space-y-3">
                          <Label className="font-black uppercase tracking-widest text-[10px] text-muted-foreground">Nomor Telepon</Label>
                          {isEditing ? (
                            <Input value={userData.phone} onChange={e => setUserData({...userData, phone: e.target.value})} className="h-12 rounded-xl font-bold" />
                          ) : (
                            <p className="text-lg font-bold text-primary bg-slate-50 p-4 rounded-2xl border border-slate-100">{userData.phone}</p>
                          )}
                       </div>
                       <div className="space-y-3">
                          <Label className="font-black uppercase tracking-widest text-[10px] text-muted-foreground">Domisili</Label>
                          {isEditing ? (
                            <Input value={userData.city} onChange={e => setUserData({...userData, city: e.target.value})} className="h-12 rounded-xl font-bold" />
                          ) : (
                            <p className="text-lg font-bold text-primary bg-slate-50 p-4 rounded-2xl border border-slate-100">{userData.city}</p>
                          )}
                       </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bookings" className="mt-0 space-y-6">
                     <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter mb-8">Riwayat Bermain</h3>
                     {upcomingBookings.map(b => (
                       <div key={b.id} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 group hover:shadow-xl transition-all">
                          <img src={getVenueData(b.venueId)?.image} className="w-24 h-24 rounded-2xl object-cover" alt="Venue" />
                          <div className="flex-grow text-center md:text-left">
                             <h4 className="font-black text-xl italic uppercase tracking-tighter text-primary">{getVenueData(b.venueId)?.name}</h4>
                             <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm font-bold text-muted-foreground">
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-secondary" /> {format(b.date, "d MMM yyyy")}</span>
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-secondary" /> {b.time}</span>
                             </div>
                          </div>
                          <Button className="rounded-2xl h-12 px-8 font-black uppercase italic tracking-tighter">LIHAT TIKET</Button>
                       </div>
                     ))}
                  </TabsContent>

                  <TabsContent value="settings" className="mt-0">
                     <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter mb-10">Preferensi & Akun</h3>
                     <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                           <div>
                              <p className="font-bold text-lg">Notifikasi Aplikasi</p>
                              <p className="text-sm text-muted-foreground">Terima update jadwal dan promo terbaru.</p>
                           </div>
                           <Button variant="outline" className="rounded-xl border-primary text-primary font-bold">AKTIF</Button>
                        </div>
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                           <div>
                              <p className="font-bold text-lg">Mode Gelap</p>
                              <p className="text-sm text-muted-foreground">Gunakan tema gelap untuk aplikasi.</p>
                           </div>
                           <Button variant="outline" className="rounded-xl font-bold">NONAKTIF</Button>
                        </div>
                        <div className="flex items-center justify-between p-6 bg-red-50 rounded-3xl border border-red-100">
                           <div>
                              <p className="font-bold text-lg text-red-600">Hapus Akun</p>
                              <p className="text-sm text-red-400">Tindakan ini tidak dapat dibatalkan.</p>
                           </div>
                           <Button variant="destructive" className="rounded-xl font-bold">HAPUS AKUN</Button>
                        </div>
                     </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
