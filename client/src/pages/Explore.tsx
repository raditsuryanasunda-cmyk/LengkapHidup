import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VenueCard from "@/components/VenueCard";
import { MOCK_VENUES, CATEGORIES, SportType } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([50000, 300000]);

  // Filter logic
  const filteredVenues = MOCK_VENUES.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(venue.type);
    
    const matchesPrice = venue.pricePerHour >= priceRange[0] && venue.pricePerHour <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <div className="bg-slate-900 pb-20">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 -mt-10 flex-grow pb-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 mb-8 border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Cari nama lapangan atau lokasi..." 
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 px-6 gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Pencarian</SheetTitle>
                </SheetHeader>
                
                <div className="py-6 space-y-8">
                  {/* Categories */}
                  <div>
                    <h4 className="font-bold mb-4">Kategori Olahraga</h4>
                    <div className="space-y-3">
                      {CATEGORIES.map(cat => (
                        <div key={cat.name} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`cat-${cat.name}`} 
                            checked={selectedCategories.includes(cat.name)}
                            onCheckedChange={() => toggleCategory(cat.name)}
                          />
                          <label
                            htmlFor={`cat-${cat.name}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {cat.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className="flex justify-between mb-4">
                      <h4 className="font-bold">Rentang Harga</h4>
                      <span className="text-sm text-muted-foreground">
                        {priceRange[0]/1000}k - {priceRange[1]/1000}k
                      </span>
                    </div>
                    <Slider 
                      defaultValue={[50000, 300000]} 
                      max={500000} 
                      step={10000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-8">
                  <Button variant="outline" className="flex-1" onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([50000, 300000]);
                  }}>Reset</Button>
                  <Button className="flex-1">Terapkan</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-heading">
            Menampilkan {filteredVenues.length} Venue
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Urutkan:</span>
            <select className="bg-transparent border-none font-medium text-foreground focus:ring-0 cursor-pointer">
              <option>Rekomendasi</option>
              <option>Harga Terendah</option>
              <option>Rating Tertinggi</option>
            </select>
          </div>
        </div>

        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVenues.map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">Tidak ada venue ditemukan</h3>
            <p className="text-slate-500">Coba ubah kata kunci atau filter pencarianmu.</p>
            <Button 
              variant="link" 
              className="mt-2 text-primary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategories([]);
              }}
            >
              Reset Pencarian
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
