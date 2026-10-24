// Import React and useState for managing app state and views
import React, { useState, useEffect } from 'react';

// Import our Supabase client and feature services
import { serviceService, SalonService } from '../features/services/serviceService';
import { bookingService, Booking } from '../features/bookings/bookingService';
import { queueService, QueueItem } from '../features/queue/queueService';
import { businessService, BusinessProfile } from '../features/businesses/businessService';

// Import local hero image asset
import heroImage from '../../assets/hero.png';

// This is our main App component uniting all features: Services, Bookings, and Queue
export default function App() {
  // Application State
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'bookings' | 'queue'>('home');
  const [business, setBusiness] = useState<BusinessProfile | null>(null);
  const [services, setServices] = useState<SalonService[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Booking Form State
  const [customerName, setCustomerName] = useState('');
  const [selectedService, setSelectedService] = useState('Haircut & Beard Trim');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Walk-in Queue Form State
  const [walkinName, setWalkinName] = useState('');
  const [walkinService, setWalkinService] = useState('Classic Haircut');

  // Fetch initial data from Supabase on load
  useEffect(() => {
    async function loadAppData() {
      try {
        const [bizData, serviceData, bookingData, queueData] = await Promise.all([
          businessService.getBusinessProfile(),
          serviceService.getServices(),
          bookingService.getBookings(),
          queueService.getQueue(),
        ]);

        if (bizData) setBusiness(bizData);
        if (serviceData) setServices(serviceData);
        if (bookingData) setBookings(bookingData);
        if (queueData) setQueue(queueData);
      } catch (error) {
        console.error('Error loading app data from Supabase:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAppData();
  }, []);

  // Handle booking form submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert('Please enter your full name!');
      return;
    }

    try {
      const newBooking = await bookingService.createBooking({
        customer_name: customerName,
        service_name: selectedService,
        booking_date: bookingDate || new Date().toISOString().split('T')[0],
        booking_time: bookingTime,
        status: 'confirmed',
      });

      setBookings([newBooking, ...bookings]);
      setIsConfirmed(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to save booking. Please check your Supabase connection.');
    }
  };

  // Handle adding walk-in customer to queue
  const handleWalkinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName.trim()) return;

    try {
      const newItem = await queueService.addToQueue(walkinName, walkinService);
      setQueue([...queue, newItem]);
      setWalkinName('');
      alert(`${walkinName} was successfully added to the queue!`);
    } catch (error) {
      console.error('Error adding to queue:', error);
    }
  };

  // Filter services based on category selection
  const filteredServices = services.filter((service) => {
    if (filter === 'All') return true;
    return service.name.toLowerCase().includes(filter.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 text-stone-600">
        <div className="text-center">
          <div className="text-4xl animate-bounce">✂️</div>
          <p className="mt-4 font-semibold">Loading SalonFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-violet-600 selection:text-white">
      
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-xl font-bold text-white shadow-md shadow-violet-200">
              ✂️
            </span>
            <span className="text-xl font-black tracking-tight text-stone-900">
              {business?.name || 'SalonFlow'}
            </span>
          </div>

          <nav className="flex items-center gap-2 sm:gap-6">
            <button
              onClick={() => setActiveTab('home')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                activeTab === 'home' ? 'bg-violet-50 text-violet-600' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                activeTab === 'services' ? 'bg-violet-50 text-violet-600' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                activeTab === 'bookings' ? 'bg-violet-50 text-violet-600' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('queue')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                activeTab === 'queue' ? 'bg-violet-50 text-violet-600' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Live Queue
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Sections */}
      <main>
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-stone-900 text-white">
              <div className="absolute inset-0 z-0 opacity-40">
                <img
                  src={heroImage}
                  alt="Barbershop background"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
                <div className="max-w-2xl">
                  <span className="inline-block rounded-full bg-violet-500/20 px-4 py-1.5 text-sm font-bold text-violet-300 backdrop-blur-md mb-6">
                    {business?.tagline || 'Look sharp. Skip the queue.'}
                  </span>
                  <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
                    Premium grooming, <span className="text-violet-400">effortless booking.</span>
                  </h1>
                  <p className="mt-4 text-lg text-stone-300">
                    {business?.address ? `${business.address} • ` : ''} {business?.phone || 'Book your spot in seconds.'}
                  </p>
                  
                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="rounded-xl bg-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-700"
                    >
                      Book Appointment 🚀
                    </button>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="rounded-xl border border-stone-700 bg-stone-800/50 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:bg-stone-800"
                    >
                      View Service Menu
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-bold text-violet-600 uppercase tracking-wider text-xs">Our Menu</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">What do you need today?</h2>
                <p className="mt-2 text-stone-600">Choose from our professional cuts and grooming treatments.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['All', 'Haircut', 'Beard', 'Shave'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      filter === item
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                        : 'border border-stone-200 bg-white hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {item === 'All' ? 'All Services' : item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <div key={service.id} className="rounded-3xl bg-white p-6 shadow-sm border border-stone-200 flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-stone-900">{service.name}</h3>
                      <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-bold text-violet-600">
                        ${service.price}
                      </span>
                    </div>
                    <p className="mt-3 text-stone-600 text-sm leading-relaxed">{service.description}</p>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                    <span className="text-xs font-semibold text-stone-500">⏱️ {service.duration_minutes} mins</span>
                    <button
                      onClick={() => {
                        setSelectedService(service.name);
                        setActiveTab('bookings');
                      }}
                      className="rounded-xl bg-violet-50 px-4 py-2 text-sm font-bold text-violet-600 transition hover:bg-violet-600 hover:text-white"
                    >
                      Book this →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-xl border border-stone-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black tracking-tight">Book Your Appointment ✂️</h2>
                <p className="mt-2 text-stone-600">Secure your spot in seconds and skip the waiting line.</p>
              </div>

              {isConfirmed ? (
                <div className="py-8 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900">Booking Confirmed!</h3>
                  <p className="mt-2 text-stone-600">
                    Thanks <span className="font-semibold text-stone-900">{customerName}</span>! Your <span className="font-semibold text-stone-900">{selectedService}</span> is locked in for <span className="font-semibold text-stone-900">{bookingDate}</span> at <span className="font-semibold text-stone-900">{bookingTime}</span>.
                  </p>
                  
                  <button
                    onClick={() => {
                      setIsConfirmed(false);
                      setCustomerName('');
                    }}
                    className="mt-8 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-700"
                  >
                    Book another appointment
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Prince Developer"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 focus:border-violet-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700">Choose Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 focus:border-violet-600 focus:outline-none bg-white"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} (${s.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700">Preferred Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 focus:border-violet-600 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-stone-700">Preferred Time</label>
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

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-violet-600 py-4 font-bold text-white transition hover:bg-violet-700 shadow-lg shadow-violet-200"
                  >
                    Confirm Booking 🚀
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* QUEUE TAB */}
        {activeTab === 'queue' && (
          <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              
              {/* Add to Queue Form */}
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-stone-200 h-fit">
                <h3 className="text-xl font-bold text-stone-900 mb-4">Join Walk-in Queue</h3>
                <form onSubmit={handleWalkinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g., John Doe"
                      value={walkinName}
                      onChange={(e) => setWalkinName(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm focus:border-violet-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Service</label>
                    <select
                      value={walkinService}
                      onChange={(e) => setWalkinService(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm focus:border-violet-600 focus:outline-none bg-white"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
                  >
                    Get Queue Ticket 🎟️
                  </button>
                </form>
              </div>

              {/* Active Queue Display */}
              <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black">Live Queue Status</h2>
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                    {queue.length} in line
                  </span>
                </div>

                {queue.length === 0 ? (
                  <p className="text-stone-500 py-12 text-center text-sm">No one is currently in line. Be the first to join!</p>
                ) : (
                  <div className="space-y-4">
                    {queue.map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between rounded-2xl border border-stone-100 bg-stone-50 p-4">
                        <div className="flex items-center gap-4">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-bold text-white text-sm">
                            #{index + 1}
                          </span>
                          <div>
                            <h4 className="font-bold text-stone-900">{item.customer_name}</h4>
                            <p className="text-xs text-stone-500">{item.service_name}</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 capitalize">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-stone-200 bg-white py-8 text-center text-sm text-stone-500">
        <p>© {new Date().getFullYear()} {business?.name || 'SalonFlow'}. All rights reserved.</p>
      </footer>

    </div>
  );
}