import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_VENUES, MOCK_USER } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { MapPin, Star, Clock, CheckCircle2, MessageSquare, Send, CreditCard, Landmark, QrCode, Ticket } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function VenueDetails() {
  const [, params] = useRoute("/venue/:id");
  const [, setLocation] = useLocation();
  const venueId = params?.id;
  const venue = MOCK_VENUES.find(v => v.id === venueId);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  
  // Comments state
  const [comments, setComments] = useState([
    { id: 1, user: "Davi Kurniawan", text: "Lapangan mantap, rumputnya masih empuk banget!", rating: 5, date: "3 hari lalu" },
    { id: 2, user: "Ghina Nabila", text: "Parkirnya luas, kantinnya enak-enak snacknya.", rating: 4, date: "1 minggu lalu" }
  ]);
  const [newComment, setNewComment] = useState("");

  if (!venue) return null;

  const handleBooking = () => {
    setIsBookingOpen(false);
    setIsSuccessOpen(true);
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([{
      id: Date.now(),
      user: MOCK_USER.name,
      text: newComment,
      rating: 5,
      date: "Baru saja"
    }, ...comments]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-secondary text-white font-bold">{venue.type}</Badge>
                <div className="flex items-center text-yellow-500 font-bold">
                  <Star className="w-4 h-4 fill-current mr-1" /> {venue.rating}
                </div>
              </div>
              <h1 className="text-5xl font-heading font-black uppercase italic tracking-tighter mb-4">{venue.name}</h1>
              <p className="flex items-center text-muted-foreground font-medium">
                <MapPin className="w-4 h-4 mr-2 text-primary" /> {venue.address}
              </p>
            </div>

            {/* Images */}
            <div className="rounded-[3rem] overflow-hidden h-[400px] shadow-2xl">
              <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
            </div>

            {/* About */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold font-heading mb-4 italic uppercase">Informasi Lapangan</h2>
              <p className="text-slate-600 leading-relaxed mb-6">{venue.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {venue.facilities.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm font-bold bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold font-heading mb-8 italic uppercase flex items-center gap-2">
                <MessageSquare className="w-6 h-6" /> Ulasan Pengguna
              </h2>
              
              <div className="space-y-6 mb-10">
                {comments.map(c => (
                  <div key={c.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-bold text-primary">{c.user}</p>
                      <span className="text-xs text-muted-foreground font-medium">{c.date}</span>
                    </div>
                    <p className="text-slate-600 text-sm font-medium">{c.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Input 
                  placeholder="Tambahkan ulasan Anda..." 
                  className="rounded-xl h-12 font-medium"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button className="h-12 w-12 rounded-xl" onClick={addComment}>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar Booking */}
          <div className="lg:col-span-1">
            <div className="bg-primary text-white rounded-[3rem] p-8 shadow-2xl sticky top-32 border-4 border-white/10 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="relative z-10">
                 <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-1">Mulai Dari</p>
                 <div className="flex items-baseline gap-2 mb-8">
                   <span className="text-4xl font-black italic tracking-tighter">Rp {venue.pricePerHour.toLocaleString()}</span>
                   <span className="text-white/60 font-bold text-sm">/jam</span>
                 </div>

                 <div className="space-y-6">
                    <Button 
                      className="w-full h-16 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-xl italic uppercase tracking-tighter shadow-lg"
                      onClick={() => setIsBookingOpen(true)}
                    >
                      Booking Sekarang
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-16 rounded-2xl bg-white/10 border-white/20 text-white font-black text-xl italic uppercase tracking-tighter hover:bg-white/20"
                      onClick={() => setLocation("/login")}
                    >
                      Lihat Lokasi
                    </Button>
                 </div>

                 <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between text-sm font-bold">
                    <div className="flex items-center gap-2">
                       <Clock className="w-4 h-4 text-secondary" /> <span>08:00 - 22:00</span>
                    </div>
                    <div className="text-green-400">● Tersedia</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-2xl rounded-[2.5rem] p-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-heading font-black italic uppercase tracking-tighter">Detail Reservasi</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
            <div className="space-y-6">
               <div>
                 <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-3">Pilih Tanggal</label>
                 <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-2xl p-4 bg-slate-50" />
               </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-3">Metode Pembayaran</label>
                <div className="grid grid-cols-1 gap-2">
                  <button 
                    onClick={() => setPaymentMethod("qris")}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all font-bold ${paymentMethod === "qris" ? "border-primary bg-primary/5" : "border-slate-100"}`}
                  >
                    <QrCode className="w-6 h-6 text-primary" /> <span>QRIS / E-Wallet</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod("va")}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all font-bold ${paymentMethod === "va" ? "border-primary bg-primary/5" : "border-slate-100"}`}
                  >
                    <Landmark className="w-6 h-6 text-primary" /> <span>Virtual Account</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all font-bold ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-slate-100"}`}
                  >
                    <CreditCard className="w-6 h-6 text-primary" /> <span>Kartu Kredit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex-row gap-4 border-t pt-8">
            <div className="flex-1">
              <span className="text-xs font-bold text-muted-foreground uppercase">Estimasi Total</span>
              <p className="text-2xl font-black italic tracking-tighter text-primary">Rp {venue.pricePerHour.toLocaleString()}</p>
            </div>
            <Button className="h-14 px-10 rounded-2xl font-black uppercase italic tracking-tighter text-lg" disabled={!paymentMethod} onClick={handleBooking}>
              Bayar Sekarang
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success/Ticket Interaction */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-primary p-10 text-white text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
             <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-md">
                <CheckCircle2 className="w-10 h-10 text-white" />
             </div>
             <h2 className="text-3xl font-heading font-black italic uppercase tracking-tighter mb-2">Booking Berhasil!</h2>
             <p className="text-white/60 font-bold">Siapkan kemenangan Anda!</p>
          </div>
          
          <div className="p-10 bg-white">
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-r-2 border-dashed border-slate-200"></div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-l-2 border-dashed border-slate-200"></div>
              
              <div className="flex justify-between items-center mb-4">
                 <div className="font-heading font-black text-primary text-xl tracking-tighter uppercase italic">{venue.name}</div>
                 <Badge className="bg-secondary">PAID</Badge>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-muted-foreground uppercase">TANGGAL</span>
                  <span className="text-sm font-black text-primary">{date ? format(date, "d MMM yyyy") : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-muted-foreground uppercase">JAM</span>
                  <span className="text-sm font-black text-primary">08:00 WIB</span>
                </div>
              </div>

              <div className="flex justify-center p-4 bg-white rounded-2xl mb-4 border border-slate-100">
                 <QrCode className="w-32 h-32 text-primary" />
              </div>
              <p className="text-[10px] text-center text-muted-foreground font-bold uppercase tracking-widest">TUNJUKKAN QR SAAT TIBA DI LOKASI</p>
            </div>
            
            <div className="mt-8 flex gap-4">
               <Button className="flex-1 h-14 rounded-2xl font-black uppercase italic tracking-tighter" onClick={() => setIsSuccessOpen(false)}>Kembali Ke Beranda</Button>
               <Button variant="outline" className="h-14 w-14 rounded-2xl"><Ticket className="w-6 h-6" /></Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
