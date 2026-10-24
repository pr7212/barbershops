// Define what a single booking record looks like in our database
export interface Booking {
  id: string;
  customer_name: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

// Define the shape of data needed when creating a brand new booking
export interface CreateBookingDTO {
  customer_name: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
}