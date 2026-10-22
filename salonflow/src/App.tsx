import { useState } from 'react';

const services = [
  {
    id: 1,
    name: 'Classic Haircut',
    category: 'Barbershop',
    price: 300,
    duration: 30,
    icon: '✂️',
  },
  {
    id: 2,
    name: 'Beard Trim',
    category: 'Barbershop',
    price: 150,
    duration: 15,
    icon: '🪒',
  },
  {
    id: 3,
    name: 'Hair Styling',
    category: 'Salon',
    price: 800,
    duration: 60,
    icon: '💇',
  },
  {
    id: 4,
    name: 'Braiding',
    category: 'Salon',
    price: 1500,
    duration: 120,
    icon: '✨',
  },
  {
    id: 5,
    name: 'Hair Wash',
    category: 'Salon',
    price: 400,
    duration: 30,
    icon: '🧴',
  },
  {
    id: 6,
    name: 'Haircut & Beard',
    category: 'Barbershop',
    price: 450,
    duration: 45,
    icon: '💈',
  },
];

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

type Booking = {
  serviceName: string;
  price: number;
  date: string;
  time: string;
  customerName: string;
  phone: string;
};

function App() {
  const [filter, setFilter] = useState('All');
  const [selectedService, setSelectedService] = useState<
    (typeof services)[number] | null
  >(null);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');

  const today = new Date().toLocaleDateString('en-CA');

  const filteredServices =
    filter === 'All'
      ? services
      : services.filter((service) => service.category === filter);

  function openBooking(service: (typeof services)[number]) {
    setSelectedService(service);
    setDate('');
    setTime('');
    setCustomerName('');
    setPhone('');
    setError('');
    setBooking(null);
  }

  function submitBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedService || !date || !time) {
      setError('Please select a date and time.');
      return;
    }

    const [hourText, minuteText] = time.split(':');
    const hour = Number(hourText);
    const minute = Number(minuteText.slice(0, 2));
    const isPM = time.includes('PM');
    const hour24 = (hour % 12) + (isPM ? 12 : 0);

    const appointment = new Date(`${date}T00:00:00`);
    appointment.setHours(hour24, minute, 0, 0);

    if (appointment.getTime() <= Date.now()) {
      setError('Please choose a future appointment time.');
      return;
    }

    setBooking({
      serviceName: selectedService.name,
      price: selectedService.price,
      date,
      time,
      customerName,
      phone,
    });

    setError('');
  }

  function closeBooking() {
    setSelectedService(null);
    setBooking(null);
    setError('');
  }

  return (
    <div className='min-h-screen bg-stone-50 text-stone-900'>
      <header className='sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between px-5 py-4'>
          <a href='#home' className='text-2xl font-black tracking-tight'>
            Salon<span className='text-violet-600'>Flow</span>
          </a>

          <div className='hidden items-center gap-7 text-sm font-medium md:flex'>
            <a href='#services' className='hover:text-violet-600'>
              Services
            </a>
            <a href='#how-it-works' className='hover:text-violet-600'>
              How it works
            </a>
          </div>

          <a
            href='#services'
            className='rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700'
          >
            Book a service
          </a>
        </nav>
      </header>

      <main>
        <section id='home' className='relative overflow-hidden bg-white'>
          <div className='mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24'>
            <div>
              <span className='inline-flex rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700'>
                Your time matters
              </span>

              <h1 className='mt-6 max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-6xl'>
                Good hair days.
                <span className='block text-violet-600'>Less waiting.</span>
              </h1>

              <p className='mt-6 max-w-lg text-lg leading-8 text-stone-600'>
                Find your next haircut or salon appointment. Choose your
                service, pick a time and plan your visit with confidence.
              </p>

              <div className='mt-8 flex flex-wrap gap-3'>
                <a
                  href='#services'
                  className='rounded-xl bg-violet-600 px-6 py-3.5 font-bold text-white transition hover:bg-violet-700'
                >
                  Explore services →
                </a>

                <a
                  href='#how-it-works'
                  className='rounded-xl border border-stone-300 px-6 py-3.5 font-bold transition hover:bg-stone-100'
                >
                  How it works
                </a>
              </div>

              <div className='mt-9 flex flex-wrap gap-5 text-sm text-stone-600'>
                <span>✓ Simple booking</span>
                <span>✓ Clear prices</span>
                <span>✓ Mobile friendly</span>
              </div>
            </div>

            <div className='relative'>
              <div className='absolute -inset-5 rounded-[2rem] bg-violet-100 blur-2xl' />

              <img
                src='https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1100&q=85'
                alt='Modern barbershop interior'
                className='relative h-[340px] w-full rounded-3xl object-cover shadow-xl sm:h-[470px]'
              />

              <div className='absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur'>
                <p className='text-xs font-semibold uppercase tracking-widest text-violet-600'>
                  Your next appointment
                </p>
                <p className='mt-1 text-lg font-bold'>
                  Choose a time that works for you.
                </p>
                <p className='mt-1 text-sm text-stone-500'>
                  Book ahead. Spend less time waiting.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id='services' className='mx-auto max-w-7xl px-5 py-16'>
          <div className='flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <p className='font-semibold text-violet-600'>FIND YOUR SERVICE</p>
              <h2 className='mt-2 text-3xl font-black tracking-tight sm:text-4xl'>
                What do you need today?
              </h2>
              <p className='mt-3 text-stone-600'>
                Explore our sample service menu and choose what works for you.
              </p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {['All', 'Salon', 'Barbershop'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    filter === item
                      ? 'bg-violet-600 text-white'
                      : 'border border-stone-200 bg-white hover:bg-stone-100'
                  }`}
                >
                  {item === 'All' ? 'All services' : item}
                </button>
              ))}
            </div>
          </div>

          <div className='mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className='group rounded-2xl border border-stone-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-2xl'>
                    {service.icon}
                  </div>

                  <span className='rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600'>
                    {service.category}
                  </span>
                </div>

                <h3 className='mt-5 text-xl font-bold'>{service.name}</h3>

                <p className='mt-2 text-sm text-stone-500'>
                  Approx. {service.duration} minutes
                </p>

                <div className='mt-6 flex items-center justify-between border-t border-stone-100 pt-5'>
                  <div>
                    <p className='text-xs text-stone-500'>Starting at</p>
                    <p className='mt-1 text-2xl font-black'>
                      KSh {service.price.toLocaleString('en-KE')}
                    </p>
                  </div>

                  <button
                    onClick={() => openBooking(service)}
                    className='rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-600'
                  >
                    Book now
                  </button>
                </div>
              </article>
            ))}
          </div>

          <p className='mt-6 text-sm text-stone-500'>
            Demo prices only. Actual services and prices will come from
            participating businesses.
          </p>
        </section>

        <section
          id='how-it-works'
          className='border-y border-stone-200 bg-white py-16'
        >
          <div className='mx-auto max-w-7xl px-5'>
            <div className='mx-auto max-w-2xl text-center'>
              <p className='font-semibold text-violet-600'>SIMPLE BY DESIGN</p>
              <h2 className='mt-2 text-3xl font-black sm:text-4xl'>
                Your appointment in three steps
              </h2>
            </div>

            <div className='mt-10 grid gap-6 md:grid-cols-3'>
              {[
                {
                  number: '01',
                  title: 'Choose a service',
                  description:
                    'Find the service you need and see its sample price and duration.',
                },
                {
                  number: '02',
                  title: 'Pick a time',
                  description:
                    'Select a preferred date and time and enter your contact details.',
                },
                {
                  number: '03',
                  title: 'Get confirmation',
                  description:
                    'Review your booking details before visiting your chosen business.',
                },
              ].map((step) => (
                <div key={step.number} className='rounded-2xl bg-stone-50 p-7'>
                  <p className='text-3xl font-black text-violet-600'>
                    {step.number}
                  </p>
                  <h3 className='mt-4 text-xl font-bold'>{step.title}</h3>
                  <p className='mt-3 leading-7 text-stone-600'>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className='bg-stone-950 px-5 py-8 text-white'>
        <div className='mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-xl font-black'>
            Salon<span className='text-violet-400'>Flow</span>
          </p>
          <p className='text-sm text-stone-400'>
            Built for Nairobi's salons and barbershops.
          </p>
        </div>
      </footer>

      {selectedService && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/60 p-4'
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeBooking();
          }}
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='booking-title'
            className='my-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8'
          >
            {booking ? (
              <div>
                <div className='flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700'>
                  ✓
                </div>

                <h2 className='mt-5 text-2xl font-black'>
                  Demo booking created!
                </h2>

                <p className='mt-2 text-stone-600'>
                  {booking.customerName}, review your appointment details. This
                  is a local demonstration, not a confirmed booking with a real
                  business.
                </p>

                <div className='mt-6 space-y-3 rounded-2xl bg-stone-50 p-5'>
                  <p>
                    <span className='text-stone-500'>Service:</span>{' '}
                    <strong>{booking.serviceName}</strong>
                  </p>
                  <p>
                    <span className='text-stone-500'>Date:</span>{' '}
                    <strong>{booking.date}</strong>
                  </p>
                  <p>
                    <span className='text-stone-500'>Time:</span>{' '}
                    <strong>{booking.time}</strong>
                  </p>
                  <p>
                    <span className='text-stone-500'>Phone:</span>{' '}
                    <strong>{booking.phone}</strong>
                  </p>
                  <p className='border-t border-stone-200 pt-3 text-lg'>
                    Total:{' '}
                    <strong>KSh {booking.price.toLocaleString('en-KE')}</strong>
                  </p>
                </div>

                <button
                  onClick={closeBooking}
                  className='mt-6 w-full rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-700'
                >
                  Back to services
                </button>
              </div>
            ) : (
              <>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <p className='text-sm font-semibold text-violet-600'>
                      YOUR APPOINTMENT
                    </p>
                    <h2 id='booking-title' className='mt-2 text-2xl font-black'>
                      Book {selectedService.name}
                    </h2>
                    <p className='mt-2 text-sm text-stone-500'>
                      KSh {selectedService.price.toLocaleString('en-KE')}
                      {' · '}
                      {selectedService.duration} minutes
                    </p>
                  </div>

                  <button
                    onClick={closeBooking}
                    aria-label='Close booking form'
                    className='rounded-lg px-3 py-2 text-xl hover:bg-stone-100'
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={submitBooking} className='mt-6 space-y-4'>
                  <div>
                    <label
                      htmlFor='customer-name'
                      className='mb-2 block text-sm font-semibold'
                    >
                      Your name
                    </label>
                    <input
                      id='customer-name'
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete='name'
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      placeholder='Enter your name'
                      className='w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='customer-phone'
                      className='mb-2 block text-sm font-semibold'
                    >
                      Phone number
                    </label>
                    <input
                      id='customer-phone'
                      required
                      type='tel'
                      autoComplete='tel'
                      maxLength={20}
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder='e.g. 0712345678'
                      className='w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='appointment-date'
                      className='mb-2 block text-sm font-semibold'
                    >
                      Appointment date
                    </label>
                    <input
                      id='appointment-date'
                      type='date'
                      required
                      min={today}
                      value={date}
                      onChange={(event) => {
                        setDate(event.target.value);
                        setTime('');
                      }}
                      className='w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100'
                    />
                  </div>

                  <fieldset>
                    <legend className='mb-3 text-sm font-semibold'>
                      Preferred time
                    </legend>
                    <div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type='button'
                          onClick={() => setTime(slot)}
                          className={`rounded-xl border px-2 py-3 text-sm font-semibold transition ${
                            time === slot
                              ? 'border-violet-600 bg-violet-600 text-white'
                              : 'border-stone-200 hover:border-violet-400'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {error && (
                    <p
                      role='alert'
                      className='text-sm font-medium text-red-600'
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type='submit'
                    className='w-full rounded-xl bg-violet-600 px-5 py-3.5 font-bold text-white transition hover:bg-violet-700'
                  >
                    Review booking
                  </button>

                  <p className='text-center text-xs leading-5 text-stone-500'>
                    Demo only. Availability is not checked against a real
                    business, and bookings are not saved permanently.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
