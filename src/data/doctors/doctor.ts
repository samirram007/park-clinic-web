export interface Doctor {
  id: number;
  name: string;
  title: string;
  rating: number;
  image: string;
  // Optional fields to accommodate different data sets
  experience?: string;
  reviews?: number;
}