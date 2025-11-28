import { Calendar, MapPin, Star, Trophy, Users, Clock, CreditCard } from "lucide-react";

// Types
export type SportType = "Futsal" | "Badminton" | "Basketball" | "Tennis" | "Volleyball";

export interface Venue {
  id: string;
  name: string;
  type: SportType;
  location: string;
  address: string;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  facilities: string[];
  coordinates: { lat: number; lng: number };
}

export interface Booking {
  id: string;
  venueId: string;
  date: Date;
  time: string;
  duration: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "completed" | "cancelled";
}

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  bookings: Booking[];
}

// Mock Data

// Import images (using paths relative to src/App.tsx context or public)
// Ideally these would be the generated images, but for mock data file we'll use the paths
// In a real app we'd import them, but for this data file we'll use string paths 
// and handle imports in the components that use them

import heroImg from "@assets/generated_images/hero_background_of_diverse_people_playing_sports_like_futsal_and_badminton_energetically.png";
import futsalImg from "@assets/generated_images/modern_indoor_futsal_court_with_artificial_grass.png";
import badmintonImg from "@assets/generated_images/professional_badminton_court_with_green_flooring.png";
import basketImg from "@assets/generated_images/outdoor_basketball_court_at_sunset.png";

export const MOCK_VENUES: Venue[] = [
  {
    id: "v1",
    name: "LaPed Arena Center",
    type: "Futsal",
    location: "Jakarta Selatan",
    address: "Jl. Fatmawati No. 15, Cilandak",
    pricePerHour: 150000,
    rating: 4.8,
    reviewCount: 124,
    image: futsalImg,
    description: "Lapangan futsal standar internasional dengan rumput sintetis kualitas terbaik. Dilengkapi dengan tribun penonton dan ruang ganti nyaman.",
    facilities: ["Wifi", "Shower", "Locker", "Canteen", "Parking"],
    coordinates: { lat: -6.2, lng: 106.8 }
  },
  {
    id: "v2",
    name: "Smash Badminton Hall",
    type: "Badminton",
    location: "Jakarta Barat",
    address: "Jl. Panjang No. 88, Kebon Jeruk",
    pricePerHour: 80000,
    rating: 4.6,
    reviewCount: 89,
    image: badmintonImg,
    description: "Hall badminton dengan 6 lapangan karpet standar BWF. Pencahayaan anti-glare dan sirkulasi udara yang baik.",
    facilities: ["Pro Shop", "Toilet", "Parking", "Water Refill"],
    coordinates: { lat: -6.19, lng: 106.77 }
  },
  {
    id: "v3",
    name: "Sunset Hoops Park",
    type: "Basketball",
    location: "Jakarta Pusat",
    address: "Jl. Sudirman Park, Tanah Abang",
    pricePerHour: 200000,
    rating: 4.9,
    reviewCount: 210,
    image: basketImg,
    description: "Lapangan basket outdoor dengan view kota Jakarta. Lantai rubber berkualitas dan ring standar FIBA. Sangat cocok untuk sore hingga malam hari.",
    facilities: ["Lighting", "Bench", "Vending Machine"],
    coordinates: { lat: -6.21, lng: 106.82 }
  },
  {
    id: "v4",
    name: "Champion Futsal 2",
    type: "Futsal",
    location: "Depok",
    address: "Jl. Margonda Raya No. 400",
    pricePerHour: 120000,
    rating: 4.5,
    reviewCount: 56,
    image: futsalImg,
    description: "Cabang kedua dari Champion Futsal. Harga terjangkau untuk pelajar dan mahasiswa.",
    facilities: ["Parking", "Toilet", "Musholla"],
    coordinates: { lat: -6.37, lng: 106.83 }
  },
  {
    id: "v5",
    name: "Victory Badminton",
    type: "Badminton",
    location: "Tangerang Selatan",
    address: "Jl. Raya Serpong KM 7",
    pricePerHour: 90000,
    rating: 4.7,
    reviewCount: 112,
    image: badmintonImg,
    description: "Tempat latihan atlet profesional yang dibuka untuk umum. Kualitas lapangan terjamin.",
    facilities: ["Shower", "Locker", "Gym", "Cafe"],
    coordinates: { lat: -6.25, lng: 106.65 }
  }
];

export const MOCK_USER: User = {
  id: "u1",
  name: "Radit Suryana",
  email: "radit@example.com",
  points: 1250,
  bookings: [
    {
      id: "b1",
      venueId: "v1",
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      time: "19:00",
      duration: 2,
      totalPrice: 300000,
      status: "completed"
    },
    {
      id: "b2",
      venueId: "v2",
      date: new Date(Date.now() + 86400000), // tomorrow
      time: "20:00",
      duration: 1,
      totalPrice: 80000,
      status: "confirmed"
    }
  ]
};

export const CATEGORIES = [
  { name: "Futsal", icon: Trophy },
  { name: "Badminton", icon: Users }, // Using Users as generic representation or maybe activity
  { name: "Basketball", icon: Users },
  { name: "Tennis", icon: Trophy },
  { name: "Volleyball", icon: Users },
];
