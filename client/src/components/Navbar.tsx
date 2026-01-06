import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search, User, Bell, Settings, LogOut, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MOCK_USER } from "@/lib/mockData";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Booking Anda di Jababeka dikonfirmasi!", time: "2m ago", read: false },
    { id: 2, text: "Promo mabar weekend ini!", time: "1h ago", read: false },
    { id: 3, text: "Poin Anda bertambah 50!", time: "5h ago", read: true },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Cari Lapangan", href: "/explore" },
    { name: "Komunitas", href: "/community" },
    { name: "Mitra", href: "/partner" },
  ];

  const handleLogout = () => {
    // In a real app, this would clear session
    setLocation("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location !== "/"
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Replacement with custom SVG reflecting the new logo style */}
        <Link href="/" className="flex flex-col items-center group cursor-pointer">
          <div className="flex items-center gap-1">
             <span className="font-heading font-extrabold text-2xl tracking-tighter logo-text-blue">LaP</span>
             <span className="font-heading font-extrabold text-2xl tracking-tighter logo-text-red">e</span>
             <span className="font-heading font-extrabold text-2xl tracking-tighter logo-text-blue">d</span>
          </div>
          <span className="text-[6px] font-bold uppercase tracking-[0.2em] logo-text-blue -mt-1 opacity-80">
            Zone ID
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-bold tracking-tight hover:text-secondary transition-colors cursor-pointer ${
                location === link.href
                  ? "text-secondary underline underline-offset-4"
                  : isScrolled || location !== "/"
                  ? "text-primary"
                  : "text-white hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className={`relative ${isScrolled || location !== "/" ? "text-primary" : "text-white hover:bg-white/20"}`}>
                <Bell className="w-5 h-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 shadow-2xl border-slate-100" align="end">
              <div className="p-4 border-b flex justify-between items-center">
                <h4 className="font-bold">Notifikasi</h4>
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setNotifications(n => n.map(x => ({...x, read: true})))}>
                  Tandai semua dibaca
                </Button>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`p-4 border-b last:border-0 hover:bg-slate-50 cursor-pointer ${!n.read ? "bg-slate-50/50" : ""}`}>
                    <p className="text-sm font-medium">{n.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="h-6 w-px bg-slate-200 mx-1"></div>

          {/* Profile Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-primary/20 overflow-hidden group-hover:border-secondary transition-all">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${MOCK_USER.name}`} 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="end">
              <div className="p-3 border-b mb-2">
                <p className="font-bold text-sm">{MOCK_USER.name}</p>
                <p className="text-xs text-muted-foreground">{MOCK_USER.points} Poin Lapangan</p>
              </div>
              <Link href="/profile">
                <Button variant="ghost" className="w-full justify-start gap-2 h-9 text-sm">
                  <User className="w-4 h-4" /> Profil Saya
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start gap-2 h-9 text-sm">
                <Settings className="w-4 h-4" /> Pengaturan
              </Button>
              <div className="h-px bg-slate-100 my-1"></div>
              <Button variant="ghost" className="w-full justify-start gap-2 h-9 text-sm text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                <LogOut className="w-4 h-4" /> Keluar
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
           <Button variant="ghost" size="icon" className={isScrolled || location !== "/" ? "text-primary" : "text-white"}>
              <Bell className="w-5 h-5" />
           </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled || location !== "/" ? "text-primary" : "text-white"}>
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className="text-xl font-bold text-primary hover:text-secondary transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-slate-100 my-4"></div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                   <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${MOCK_USER.name}`} 
                    alt="User" 
                    className="w-12 h-12 rounded-full border-2 border-primary"
                  />
                  <div>
                    <p className="font-bold">{MOCK_USER.name}</p>
                    <p className="text-xs text-muted-foreground">{MOCK_USER.points} Poin</p>
                  </div>
                </div>
                <Button className="w-full h-12 rounded-xl bg-primary font-bold">Profil Saya</Button>
                <Button variant="outline" className="w-full h-12 rounded-xl text-red-500 font-bold" onClick={handleLogout}>Keluar</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
