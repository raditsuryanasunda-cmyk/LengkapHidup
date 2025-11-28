import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_USER, MOCK_VENUES } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Clock, MapPin, LogOut, Settings, User } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function Profile() {
  const upcomingBookings = MOCK_USER.bookings.filter(b => b.status === "confirmed" || b.status === "pending");
  const pastBookings = MOCK_USER.bookings.filter(b => b.status === "completed" || b.status === "cancelled");

  const getVenueName = (id: string) => MOCK_VENUES.find(v => v.id === id)?.name || "Unknown Venue";
  const getVenueLocation = (id: string) => MOCK_VENUES.find(v => v.id === id)?.location || "Unknown Location";
  const getVenueImage = (id: string) => MOCK_VENUES.find(v => v.id === id)?.image || "";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <div className="bg-slate-900 pb-20">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 -mt-10 flex-grow pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden">
              <div className="h-24 bg-primary/20"></div>
              <div className="px-6 relative">
                <div className="w-20 h-20 rounded-full bg-white p-1 absolute -top-10 left-1/2 -translate-x-1/2 shadow-sm">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${MOCK_USER.name}`} 
                    alt="User" 
                    className="w-full h-full rounded-full bg-slate-100"
                  />
                </div>
              </div>
              <div className="pt-12 pb-6 px-6 text-center">
                <h2 className="font-bold text-xl font-heading">{MOCK_USER.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{MOCK_USER.email}</p>
                
                <div className="bg-primary/10 rounded-xl p-3 flex items-center justify-center gap-2 mb-6">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-bold text-primary">{MOCK_USER.points} Poin</span>
                </div>

                <div className="space-y-2 text-left">
                  <Button variant="ghost" className="w-full justify-start gap-2 font-medium">
                    <User className="w-4 h-4" /> Edit Profil
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-2 font-medium">
                    <Settings className="w-4 h-4" /> Pengaturan
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-2 font-medium text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" /> Keluar
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-slate-100 dark:border-slate-800 shadow-lg min-h-[500px]">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Riwayat Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
                    <TabsTrigger 
                      value="upcoming"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-6"
                    >
                      Akan Datang
                    </TabsTrigger>
                    <TabsTrigger 
                      value="history"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-6"
                    >
                      Selesai
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="space-y-4">
                    {upcomingBookings.length > 0 ? (
                      upcomingBookings.map(booking => (
                        <BookingItem key={booking.id} booking={booking} getVenueName={getVenueName} getVenueLocation={getVenueLocation} getVenueImage={getVenueImage} />
                      ))
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Belum ada booking yang akan datang.</p>
                        <Button variant="link" className="text-primary mt-2">Cari Lapangan</Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4">
                    {pastBookings.length > 0 ? (
                      pastBookings.map(booking => (
                        <BookingItem key={booking.id} booking={booking} getVenueName={getVenueName} getVenueLocation={getVenueLocation} getVenueImage={getVenueImage} isHistory />
                      ))
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <p>Belum ada riwayat booking.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function BookingItem({ booking, getVenueName, getVenueLocation, getVenueImage, isHistory = false }: any) {
  return (
    <div className="flex flex-col md:flex-row gap-4 border border-slate-100 dark:border-slate-800 rounded-xl p-4 hover:shadow-md transition-shadow bg-white dark:bg-slate-900">
      <div className="w-full md:w-32 h-32 md:h-auto rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
        <img src={getVenueImage(booking.venueId)} alt="Venue" className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg font-heading">{getVenueName(booking.venueId)}</h3>
            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"} className={booking.status === "confirmed" ? "bg-green-500" : ""}>
              {booking.status === "confirmed" ? "Confirmed" : booking.status}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1 mb-3">
            <MapPin className="w-3 h-3" />
            <span>{getVenueLocation(booking.venueId)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium">{format(booking.date, "d MMM yyyy", { locale: id })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-medium">{booking.time} ({booking.duration} Jam)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-end items-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 mt-2 md:mt-0">
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Total Bayar</span>
          <p className="font-bold text-lg text-primary">Rp {booking.totalPrice.toLocaleString("id-ID")}</p>
        </div>
        {!isHistory && (
          <Button size="sm" className="w-full md:w-auto">Lihat Tiket</Button>
        )}
        {isHistory && (
          <Button size="sm" variant="outline" className="w-full md:w-auto">Booking Lagi</Button>
        )}
      </div>
    </div>
  );
}
