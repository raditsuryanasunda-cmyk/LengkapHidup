import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In mockup, just redirect to home
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="flex flex-col items-center mb-8 cursor-pointer group">
            <div className="flex items-center gap-1">
               <span className="font-heading font-extrabold text-5xl tracking-tighter logo-text-blue group-hover:scale-105 transition-transform">LaP</span>
               <span className="font-heading font-extrabold text-5xl tracking-tighter logo-text-red group-hover:scale-105 transition-transform">e</span>
               <span className="font-heading font-extrabold text-5xl tracking-tighter logo-text-blue group-hover:scale-105 transition-transform">d</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] logo-text-blue -mt-2 opacity-80 italic">
              Zone ID
            </span>
          </Link>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter text-primary">SELAMAT DATANG KEMBALI</h2>
          <p className="text-muted-foreground font-bold text-sm">Masuk untuk melanjutkan kemenangan Anda!</p>
        </div>

        <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-white">
          <CardContent className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Akun</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <Input 
                    type="email" 
                    placeholder="nama@email.com" 
                    className="h-14 rounded-2xl pl-12 font-bold border-slate-100 bg-slate-50 focus:bg-white transition-all"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Kata Sandi</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="h-14 rounded-2xl pl-12 font-bold border-slate-100 bg-slate-50 focus:bg-white transition-all"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="link" className="text-xs font-bold text-primary p-0">Lupa Kata Sandi?</Button>
              </div>

              <Button className="w-full h-16 rounded-2xl bg-primary text-white font-black text-xl italic uppercase tracking-tighter shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                MASUK SEKARANG <ArrowRight className="w-6 h-6" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm font-bold text-muted-foreground">
                Belum punya akun? <Button variant="link" className="text-primary font-black p-0">DAFTAR DISINI</Button>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-10 flex items-center justify-center gap-2 text-slate-400">
           <ShieldCheck className="w-4 h-4" />
           <span className="text-[10px] font-black uppercase tracking-widest">SISTEM RESERVASI AMAN TERVERIFIKASI</span>
        </div>
      </div>
    </div>
  );
}
