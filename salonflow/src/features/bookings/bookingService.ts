// Import our Supabase client to talk to our database
import { supabase } from '../../lib/supabase';

// Define what a booking object looks like in TypeScript
export interface Booking {
  id?: string;
  customer_name: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
  status?: string;
  created_at?: string;
}

// This object contains all our booking functions
export const bookingService = {
  // Fetch all existing bookings from the database
  async getBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as Booking[];
  },

  // Create a brand new booking in the database
  async createBooking(booking: Booking) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select();
      
    if (error) throw error;
    return data[0] as Booking;
  },

  // Delete a booking by its unique ID
  async deleteBooking(id: string) {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};