import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, CheckCircle2, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const BookDemoPage: React.FC = () => {
  const { settings, submitLead } = useCms();

  // Generate the next 7 business days
  const getUpcomingDates = () => {
    const dates = [];
    const today = new Date();
    let current = new Date(today);
    while (dates.length < 7) {
      current.setDate(current.getDate() + 1);
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        dates.push(new Date(current));
      }
    }
    return dates;
  };

  const datesList = getUpcomingDates();
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const availableSlots = [
    '09:30 AM CET / 12:30 AM PST',
    '11:00 AM CET / 02:00 AM PST',
    '02:30 PM CET / 05:30 AM PST',
    '04:00 PM CET / 07:00 AM PST',
    '06:30 PM CET / 09:30 AM PST',
    '08:00 PM CET / 11:00 AM PST',
  ];

  const [selectedSlot, setSelectedSlot] = useState(availableSlots[1]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    annualRevenue: '$5M - $20M ARR',
    focusTopic: 'Full Website Architecture & CMS',
  });

  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedDate = datesList[selectedDateIndex];
  const dateFormatted = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please provide your name and work email.');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMsg('Please enter a valid business email.');
      return;
    }

    setLoading(true);
    try {
      await submitLead({
        type: 'demo',
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        details: {
          scheduledDate: dateFormatted,
          scheduledTime: selectedSlot,
          annualRevenue: formData.annualRevenue,
          focusTopic: formData.focusTopic,
          meetingHost: 'Elena Rostova & Soren Lindqvist',
        },
      });
      setBooked(true);
    } catch (e) {
      setErrorMsg('Booking failure. Please try again or reach out directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title="Schedule Strategy Session & Demo"
        description="Book a confidential 30-minute discovery session with KINETIX founding partners to audit your marketing funnel and CMS architecture."
      />

      <Breadcrumbs items={[{ label: 'Book Demo' }]} />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          Executive Discovery Session
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Reserve a 30-Minute Strategy Session
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          Direct 1-on-1 strategy call with our Founding Partner & Technical Director. We will review your current website metrics, identify high-friction drop-offs, and outline an architectural roadmap.
        </p>
      </div>

      {booked ? (
        <div className="p-10 sm:p-16 rounded-2xl bg-neutral-900 border border-neutral-800 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Strategy Session Confirmed</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              A calendar invitation with Google Meet connection details has been transmitted to{' '}
              <strong className="text-white">{formData.email}</strong>.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800/80 text-left space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
              <span className="text-neutral-500">Date:</span>
              <span className="font-semibold text-white">{dateFormatted}</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
              <span className="text-neutral-500">Time:</span>
              <span className="font-semibold text-amber-400 font-mono">{selectedSlot}</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
              <span className="text-neutral-500">Host:</span>
              <span className="font-semibold text-white">Elena Rostova (Executive Creative Director)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Focus:</span>
              <span className="font-semibold text-neutral-300">{formData.focusTopic}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              <span>Explore case studies in the meantime &rarr;</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Meeting Info */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Session Format</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                A high-signal, zero-fluff strategy session designed for founders, CMOs, and VPs of Marketing.
              </p>
            </div>

            <div className="space-y-4 text-xs text-neutral-300">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>30 Minutes Duration</span>
              </div>
              <div className="flex items-center gap-3">
                <Video className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Google Meet / High-Def Screen Share</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Covered by Bilateral NDA Protocol</span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 space-y-3 text-xs">
              <p className="font-mono uppercase text-neutral-400">Discussion Agenda</p>
              <ul className="space-y-2 text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">01.</span>
                  <span>Diagnostic review of your current conversion drop-offs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">02.</span>
                  <span>Evaluation of headless CMS vs legacy bottlenecks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">03.</span>
                  <span>Fixed-timeline scope and investment range estimate.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Date, Slot, and Details Form */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-8">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            {/* 1. Date Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                1. Select Available Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {datesList.map((d, idx) => {
                  const isSelected = selectedDateIndex === idx;
                  const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
                  const dayNum = d.getDate();
                  const monthName = d.toLocaleDateString('en-US', { month: 'short' });
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDateIndex(idx)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-amber-400 border-amber-400 text-neutral-950 font-bold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <p className="text-[10px] font-mono uppercase">{weekday}</p>
                      <p className="text-lg font-extrabold tabular-nums my-0.5">{dayNum}</p>
                      <p className="text-[10px] opacity-75">{monthName}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Time Slot Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                2. Select Time Window ({dateFormatted})
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {availableSlots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-2.5 rounded-lg border text-xs text-left transition-colors font-mono ${
                        isSelected
                          ? 'bg-neutral-800 border-amber-400 text-amber-300 font-semibold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Attendee Details Form */}
            <form onSubmit={handleBooking} className="space-y-4 pt-4 border-t border-neutral-800">
              <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider block">
                3. Your Coordinates
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] text-neutral-400">Full Name *</span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vanessa Sterling"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-neutral-400">Work Email *</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="v.sterling@enterprise.io"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] text-neutral-400">Company / Venture</span>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Arc Dynamics"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-neutral-400">Company Stage / ARR</span>
                  <select
                    value={formData.annualRevenue}
                    onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Pre-Revenue / Seed">Pre-Revenue / Seed</option>
                    <option value="$1M - $5M ARR">$1M - $5M ARR</option>
                    <option value="$5M - $20M ARR">$5M - $20M ARR</option>
                    <option value="$20M - $100M ARR">$20M - $100M ARR</option>
                    <option value="$100M+ / Public Enterprise">$100M+ / Public Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-neutral-400">Primary Exploration Area</span>
                <select
                  value={formData.focusTopic}
                  onChange={(e) => setFormData({ ...formData, focusTopic: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Full Website Architecture & CMS">Full Website Architecture & Headless CMS</option>
                  <option value="Brand Identity & Visual System">Brand Identity & Visual System</option>
                  <option value="Scientific Conversion Rate Optimization">Scientific Conversion Rate Optimization (CRO)</option>
                  <option value="Enterprise Performance Marketing Retainer">Enterprise Performance Marketing Retainer</option>
                  <option value="General Strategic Partnership">General Strategic Partnership</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <span>{loading ? 'Confirming Reservation...' : 'Lock In Strategy Slot'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
