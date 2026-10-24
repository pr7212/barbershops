// Import our Supabase client to talk to our database
import { supabase } from '../../lib/supabase';

// Define what a business profile looks like in TypeScript
export interface BusinessProfile {
  id: string;
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  opening_hours: string;
  created_at?: string;
}

// This object contains all our business management functions
export const businessService = {
  // Fetch the barbershop business details from the database
  async getBusinessProfile(): Promise<BusinessProfile | null> {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .single();
      
    if (error) {
      console.error('Error fetching business profile:', error.message);
      return null;
    }
    
    return data as BusinessProfile;
  },

  // Update business profile details
  async updateBusinessProfile(updates: Partial<BusinessProfile>) {
    const { data, error } = await supabase
      .from('businesses')
      .update(updates)
      .select();
      
    if (error) throw error;
    return data[0] as BusinessProfile;
  }
};