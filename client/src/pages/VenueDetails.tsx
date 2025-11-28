import { useState } from "react";
import { useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_VENUES } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { MapPin, Star, Clock, CheckCircle2, Wifi, Droplets, Car, Utensils, Dumbbell, Share2, Heart } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

export default function VenueDetails() {
  const [, params] = useRoute("/venue/:id");
  const venueId = params?.id;
  const venue = MOCK_VENUES.find(v => v.id === venueId);
  const { toast } = useToast();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  if (!venue) return <div className="min-h-screen flex items-center justify-center">Venue not found</div>;

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", 
    "20:00", "21:00", "22:00"
  ];

  const handleBooking = () => {
    setIsBookingOpen(false);
    setTimeout(() => {
      setIsSuccessOpen(true);
    }, 500);
  };

  const FacilityIcon = ({ name }: { name: string }) => {
    switch (name) {
      case "Wifi": return <Wifi className="w-4 h-4" />;
      case "Shower": return <Droplets className="w-4 h-4" />;
      case "Parking": return <Car className="w-4 h-4" />;
      case "Canteen": return <Utensils className="w-4 h-4" />;
      case "Gym": return <Dumbbell className="w-4 h-4" />;
      default: return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 pb-10">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <Badge className="mb-4 bg-primary hover:bg-primary text-white border-none px-3 py-1 text-sm">{venue.type}</Badge>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">{venue.name}</h1>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-white">{venue.rating}</span>
                    <span>({venue.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold font-heading mb-4">Tentang Venue</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {venue.description}
              </p>
              
              <div className="mt-8">
                <h3 className="font-bold mb-4">Fasilitas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {venue.facilities.map(fac => (
                    <div key={fac} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                      <FacilityIcon name={fac} />
                      <span className="text-sm font-medium">{fac}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location Mock Map */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold font-heading mb-4">Lokasi</h2>
              <p className="text-slate-500 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {venue.address}
              </p>
              <div className="w-full h-64 bg-slate-200 rounded-xl flex items-center justify-center overflow-hidden relative group cursor-pointer">
                {/* Mock Map Pattern */}
                <div className="absolute inset-0 opacity-30" style={{ 
                  backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", 
                  backgroundSize: "20px 20px" 
                }}></div>
                <div className="bg-white p-4 rounded-full shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <Button variant="secondary" className="absolute bottom-4 right-4 z-10 shadow-lg">Buka di Google Maps</Button>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-800 sticky top-24">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-sm text-muted-foreground">Harga per jam</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">
                      Rp {venue.pricePerHour.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                  Tersedia
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pilih Tanggal</label>
                  <div className="border rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-primary transition-colors" onClick={() => setIsBookingOpen(true)}>
                    <span className="font-medium">
                      {date ? format(date, "EEEE, d MMMM yyyy", { locale: id }) : "Pilih tanggal"}
                    </span>
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Pilih Jam</label>
                  <div className="border rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-primary transition-colors" onClick={() => setIsBookingOpen(true)}>
                    <span className="font-medium">
                      {selectedTime || "Pilih jam main"}
                    </span>
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <Button 
                  className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20" 
                  onClick={() => setIsBookingOpen(true)}
                >
                  Booking Sekarang
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Dijamin aman. Pembatalan gratis hingga 24 jam sebelum jadwal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Jadwal & Booking</DialogTitle>
            <DialogDescription>
              Pilih tanggal dan waktu bermain di {venue.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
              <h4 className="font-bold mb-3 text-sm">Tanggal</h4>
              <div className="border rounded-lg p-2 flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-0"
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-sm">Jam Tersedia</h4>
              <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`py-2 px-1 rounded-md text-sm font-medium transition-all ${
                      selectedTime === time 
                        ? "bg-primary text-white shadow-md scale-105" 
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-3 border-t pt-4 mt-2">
            <div className="flex-1 flex justify-between items-center sm:justify-start sm:gap-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Total:</span>
                <span className="block font-bold text-lg text-primary">
                  Rp {selectedTime ? venue.pricePerHour.toLocaleString("id-ID") : "0"}
                </span>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => setIsBookingOpen(false)}>Batal</Button>
              <Button 
                className="flex-1 sm:flex-none bg-secondary hover:bg-secondary/90 text-white" 
                disabled={!selectedTime || !date}
                onClick={handleBooking}
              >
                Konfirmasi Booking
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md text-center py-10">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <DialogTitle className="text-2xl font-bold mb-2">Booking Berhasil!</DialogTitle>
          <DialogDescription className="text-base mb-6">
            Terima kasih! Booking anda di <strong>{venue.name}</strong> untuk tanggal <strong>{date && format(date, "d MMMM yyyy", { locale: id })}</strong> jam <strong>{selectedTime}</strong> telah terkonfirmasi.
          </DialogDescription>
          
          <div className="bg-slate-50 p-4 rounded-lg mb-6 text-left">
            <h4 className="font-bold text-sm mb-2 text-slate-700">Detail Pembayaran</h4>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Metode</span>
              <span className="font-medium">Bayar di Tempat (COD)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-primary">Rp {venue.pricePerHour.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={() => setIsSuccessOpen(false)}>Lihat Tiket Saya</Button>
            <Button variant="ghost" className="w-full" onClick={() => setIsSuccessOpen(false)}>Kembali ke Beranda</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}
