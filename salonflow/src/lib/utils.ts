// Import clsx and twMerge to help us combine and clean up Tailwind CSS classes safely
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// This helper function combines multiple CSS classes and resolves any Tailwind conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}