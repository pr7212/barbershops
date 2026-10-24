// Import our Supabase client to talk to our database
import { supabase } from '../../lib/supabase';

// Define what a queue item looks like in TypeScript
export interface QueueItem {
  id: string;
  customer_name: string;
  service_name: string;
  status: 'waiting' | 'in-service' | 'completed' | 'cancelled';
  position: number;
  created_at: string;
}

// This object contains all our queue management functions
export const queueService = {
  // Fetch all active queue items from the database
  async getQueue() {
    const { data, error } = await supabase
      .from('queue')
      .select('*')
      .order('position', { ascending: true });
      
    if (error) throw error;
    return data as QueueItem[];
  },

  // Add a new customer to the walk-in queue
  async addToQueue(customerName: string, serviceName: string) {
    // First, find out how many people are already in line
    const currentQueue = await this.getQueue();
    const nextPosition = currentQueue.length + 1;

    const { data, error } = await supabase
      .from('queue')
      .insert([
        {
          customer_name: customerName,
          service_name: serviceName,
          status: 'waiting',
          position: nextPosition,
        },
      ])
      .select();
      
    if (error) throw error;
    return data[0] as QueueItem;
  },

  // Update a customer's queue status (e.g., moving them from waiting to in-service)
  async updateQueueStatus(id: string, status: QueueItem['status']) {
    const { data, error } = await supabase
      .from('queue')
      .update({ status })
      .eq('id', id)
      .select();
      
    if (error) throw error;
    return data[0] as QueueItem;
  },

  // Remove a customer from the queue
  async removeFromQueue(id: string) {
    const { error } = await supabase
      .from('queue')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};