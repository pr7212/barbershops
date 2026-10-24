// Define our database schema types for TypeScript support
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string
          name: string
          tagline: string | null
          address: string | null
          phone: string | null
          email: string | null
          opening_hours: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          tagline?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          opening_hours?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          tagline?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          opening_hours?: string | null
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          duration_minutes: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          duration_minutes: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          duration_minutes?: number
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          customer_name: string
          service_name: string
          booking_date: string
          booking_time: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          service_name: string
          booking_date: string
          booking_time: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          service_name?: string
          booking_date?: string
          booking_time?: string
          status?: string
          created_at?: string
        }
      }
      queue: {
        Row: {
          id: string
          customer_name: string
          service_name: string
          status: string
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          service_name: string
          status?: string
          position: number
          created_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          service_name?: string
          status?: string
          position?: number
          created_at?: string
        }
      }
    }
  }
}