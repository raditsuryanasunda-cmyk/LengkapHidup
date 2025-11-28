import { Venue } from "@/lib/mockData";
import { MapPin, Star, Clock } from "lucide-react";
import { Link } from "wouter";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link href={`/venue/${venue.id}`}>
      <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-secondary-foreground font-bold backdrop-blur-sm hover:bg-white">
              {venue.type}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-full backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold">{venue.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-heading font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                {venue.name}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <MapPin className="w-3 h-3" />
                <span className="line-clamp-1">{venue.location}</span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
            {venue.description}
          </p>

          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground block">Mulai dari</span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-primary text-lg">
                  Rp {venue.pricePerHour.toLocaleString("id-ID")}
                </span>
                <span className="text-xs text-muted-foreground">/jam</span>
              </div>
            </div>
            <Button size="sm" className="rounded-full px-4 group-hover:bg-secondary group-hover:text-white transition-colors">
              Booking
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
