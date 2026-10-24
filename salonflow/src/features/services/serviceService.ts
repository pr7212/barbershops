// Import our Supabase client to talk to our database
import { supabase } from '../../lib/supabase';

// Define what a service item looks like in TypeScript
export interface SalonService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  created_at?: string;
}

// This object contains all our service management functions
export const serviceService = {
  // Fetch all available services from the database
  async getServices(): Promise<SalonService[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('price', { ascending: true });
      
    if (error) throw error;
    return data as SalonService[];
  },

  // Add a new service offering to the shop menu
  async createService(service: Omit<SalonService, 'id'>) {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select();
      
    if (error) throw error;
    return data[0] as SalonService;
  },

  // Update an existing service price, name, or duration
  async updateService(id: string, updates: Partial<SalonService>) {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    return data[0] as SalonService;
  },

  // Delete a service from the menu
  async deleteService(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};