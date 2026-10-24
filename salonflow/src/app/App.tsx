
// Import React and useState so we can manage booking state and user inputs
import React, { useState } from 'react';

// This is our main App component with a fully functional Booking Form!
export default function App() {
  // Store what the user types into our form fields
  const [customerName, setCustomerName] = useState('');
  const [selectedService, setSelectedService] = useState('Haircut & Beard Trim');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  
  // Track whether the booking was successfully confirmed
  const [isConfirmed, setIsConfirmed] = useState(false);

  // This function runs when the user clicks the "Confirm Booking" button
  const handleBookingSubmit = (e: React.FormEvent) => {
    // Prevent the webpage from refreshing
    e.preventDefault();
    
    // Check if the user filled in their name
    if (!customerName.trim()) {
      alert('Please enter your full name!');
      return;
    }

    // Mark booking as confirmed!
    setIsConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      
      {/* Main Container */}
      <main className="mx-auto max-w-4xl px-4 py-16">
        
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Book Your Appointment ✂️
          </h1>
          <p className="mt-2 text-stone-600">
            Secure your spot in seconds and skip the waiting line.
          </p>
        </div>

        {/* Booking Card */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl border border-stone-100">
          
          {/* Show a success message if booked, otherwise show the form */}
          {isConfirmed ? (
            <div className="py-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl font-bold mb-4">
                ✓
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Booking Confirmed!</h2>
              <p className="mt-2 text-stone-600">
                Thanks <span className="font-semibold text-stone-900">{customerName}</span>! Your <span className="font-semibold text-stone-900">{selectedService}</span> is locked in for <span className="font-semibold text-stone-900">{bookingDate}</span> at <span className="font-semibold text-stone-900">{bookingTime}</span>.
              </p>
              
              <button
                onClick={() => {
                  setIsConfirmed(false);
                  setCustomerName('');
                }}
                className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-700"
              >
                Book another appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Customer Name Input */}
              <div>
                <label className="block text-sm font-semibold text-stone-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Prince Developer"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 focus:border-violet-600 focus:outline-none"
                  required
                />
              </div>

              {/* Service Selector Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-stone-700">
                  Choose Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 focus:border-violet-600 focus:outline-none bg-white"
                >
                  <option value="Classic Haircut">Classic Haircut ($25)</option>
                  <option value="Haircut & Beard Trim">Haircut & Beard Trim ($35)</option>
                  <option value="Luxury Hot Towel Shave">Luxury Hot Towel Shave ($30)</option>
                  <option value="Fade & Line Up">Fade & Line Up ($20)</option>
                </select>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-stone-700">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 focus:border-violet-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700">
                    Preferred Time
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 focus:border-violet-600 focus:outline-none bg-white"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-violet-600 py-4 font-bold text-white transition hover:bg-violet-700 shadow-lg shadow-violet-200"
              >
                Confirm Booking 🚀
              </button>

            </form>
          )}

        </div>

      </main>
    </div>
  );
}

