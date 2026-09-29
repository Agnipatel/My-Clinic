// Restored the green version with popup, GHL, and logo
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Play, Plus, MapPin, Check, ChevronRight, Phone, Mail, XCircle, ShieldCheck, X, Loader2, Menu } from "lucide-react"
import { submitToGHL } from "@/app/actions"

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const FormContent = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState({ text: "", isError: false })

    async function handleAction(formData: FormData) {
      setIsSubmitting(true)
      setMessage({ text: "", isError: false })
      const result = await submitToGHL(formData)
      setIsSubmitting(false)
      setMessage({ text: result.message, isError: !result.success })
    }

    return (
      <form action={handleAction} className="space-y-6">
        {message.text && (
          <div className={`p-3 rounded-xl text-sm font-bold ${message.isError ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
            {message.text}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Your name</label>
            <input type="text" name="name" required placeholder="Dr. Priya Sharma" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#16a34a]/50 transition-all text-slate-900" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Clinic type</label>
            <div className="relative">
              <select name="clinicType" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#16a34a]/50 transition-all text-slate-500 appearance-none">
                <option value="">Select speciality</option>
                <option value="Dental">Dental</option>
                <option value="Skin/Cosmetic">Skin/Cosmetic</option>
                <option value="Fertility/IVF">Fertility/IVF</option>
                <option value="Physiotherapy">Physiotherapy</option>
                <option value="Other">Other</option>
              </select>
              <ChevronRight className="w-4 h-4 text-slate-400 absolute right-4 top-4 rotate-90 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Phone number</label>
            <input type="tel" name="phone" required placeholder="+91 98XXX XXXXX" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#16a34a]/50 transition-all text-slate-900" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Work email</label>
            <input type="email" name="email" required placeholder="you@clinic.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#16a34a]/50 transition-all text-slate-900" />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-70 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 mt-4 text-lg">
          {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : <>Book My Free Strategy Call <ChevronRight className="w-5 h-5" /></>}
        </button>

        <p className="text-center text-xs text-slate-400 font-medium pt-2">
          <Check className="w-3 h-3 inline mr-1" /> No spam. No pressure. Just a useful conversation.
        </p>
      </form>
    )
  }

  return (
    <div className="min-h-screen font-sans text-slate-800 selection:bg-green-600/30 relative">

      {/* Header */}
      <header className="bg-[#0a4bb8] text-white py-4 px-6 md:px-12 flex items-center justify-between border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center">
          <Image src="/logo1.png" alt="PANDAECE Logo" width={180} height={45} className="h-8 md:h-10 w-auto" />
        </div>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-blue-100">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#who-we-help" className="hover:text-white transition-colors">Who We Help</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#proof" className="hover:text-white transition-colors">Proof</a>
          <a href="#why-us" className="hover:text-white transition-colors">Why Us</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-white transition-colors">Free Strategy Call</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <button onClick={() => setIsModalOpen(true)} className="hidden sm:block bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-2.5 rounded text-sm font-bold transition-all shadow-lg shadow-green-600/20">
            Book in 2 Days <ChevronRight className="inline w-4 h-4" />
          </button>
          <button className="lg:hidden p-2 -mr-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-[69px] left-0 right-0 bg-[#0a4bb8] border-b border-white/10 shadow-2xl z-40 p-6 flex flex-col gap-6 backdrop-blur-xl bg-opacity-95">
          <nav className="flex flex-col gap-6 text-base font-bold text-blue-50">
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Services</a>
            <a href="#who-we-help" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Who We Help</a>
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">How It Works</a>
            <a href="#proof" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Proof</a>
            <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Why Us</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">FAQ</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Free Strategy Call</a>
          </nav>
          <button onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }} className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-4 rounded-xl text-base font-bold transition-all shadow-lg shadow-green-600/20 flex justify-center items-center">
            Book in 2 Days <ChevronRight className="inline w-5 h-5 ml-1" />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-[#0a4bb8] text-white pt-20 pb-16 lg:pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">

          {/* Left Content */}
          <div className="lg:w-[55%] space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-slate-300 uppercase">
              <span className="w-2 h-2 rounded-full bg-green-600"></span>
              Growth Partner for Clinics & Hospitals
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] tracking-tight">
              Performance marketing for <span className="text-[#22c55e]">hospitals and clinics</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
              We manage Meta ads, Google ads and your Google Business Profile (Google maps) that bring real patients to your clinic — not just clicks. Built specifically for dental, fertility, skin, diagnostic, and physio clinics.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-4 rounded text-base font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20">
                Book in 2 Days, Get 1 Month Free Management <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Right Dashboard Graphic (Mockup) */}
          <div className="lg:w-[45%] w-full relative">
            <div className="bg-[#1e293b] p-2 rounded-2xl border border-slate-700 shadow-2xl relative">
              <div className="absolute left-2 sm:-left-12 bottom-4 sm:bottom-12 bg-white text-slate-900 p-4 rounded-xl shadow-xl flex items-center gap-4 z-20 border border-slate-100">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Plus className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">New Booking</div>
                  <div className="font-bold text-sm">Dental Implant Consult</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 h-full relative overflow-hidden">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Campaign Snapshot</div>
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-2xl font-bold text-slate-900">New patient acquisition</h3>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Live</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-sm font-medium text-slate-500 mb-2">Appointments</div>
                    <div className="text-4xl font-bold text-slate-900 mb-2">148</div>
                    <div className="text-xs font-bold text-green-600">+38.2%</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-sm font-medium text-slate-500 mb-2">Cost per lead</div>
                    <div className="text-4xl font-bold text-slate-900 mb-2">₹180</div>
                    <div className="text-xs font-bold text-green-600">57% lower</div>
                  </div>
                </div>

                <div className="text-sm font-bold text-slate-900 mb-4 flex justify-between">
                  Booked appointments <span className="text-slate-400 font-normal">Last 6 months</span>
                </div>
                <div className="flex items-end justify-between h-32 gap-2 pb-6">
                  <div className="w-full bg-slate-200 rounded-t-sm h-[30%]"></div>
                  <div className="w-full bg-slate-200 rounded-t-sm h-[45%]"></div>
                  <div className="w-full bg-slate-200 rounded-t-sm h-[40%]"></div>
                  <div className="w-full bg-green-300 rounded-t-sm h-[60%]"></div>
                  <div className="w-full bg-green-400 rounded-t-sm h-[80%]"></div>
                  <div className="w-full bg-[#16a34a] rounded-t-sm h-[100%]"></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white py-6 px-6 border-b border-slate-100 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between md:justify-center md:gap-16 gap-6 text-sm font-bold text-slate-600 uppercase tracking-widest text-center">
          <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#16a34a]" /> Patient-Data Safe</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#16a34a]" /> Google & Meta Certified</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#16a34a]" /> Built for Hospitals & Clinics</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#16a34a]" /> No Long-Term Lock-In</div>
        </div>
      </div>

      {/* Our Services */}
      <section className="py-8 md:py-12 px-6 bg-slate-50 border-b border-slate-100" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-[#16a34a] font-bold tracking-widest uppercase text-sm mb-4">Our Core Services</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0b132b] mb-6">Patient Acquisition Systems</h2>
            <p className="text-lg text-slate-600">
              We manage the exact platforms where your future patients are spending their time and searching for treatments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: Meta Ads */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-green-500/30 transition-all text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0b132b] mb-4">Meta Ads</h3>
              <p className="text-slate-500 leading-relaxed">
                Hyper-targeted Facebook and Instagram campaigns that turn local scrollers into booked appointments for elective treatments.
              </p>
            </div>

            {/* Service 2: Google Ads */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-green-500/30 transition-all text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 13.9v-3.72h9.36c.14.73.23 1.5.23 2.37 0 3.23-1.07 6.1-2.92 8.16-1.74 1.94-4.23 3.1-7.05 3.1-5.74 0-10.46-4.63-10.46-10.36S5.87 3.09 11.61 3.09c2.77 0 5.16 1.02 7.03 2.76L16 8.35c-1.12-1.05-2.73-1.84-4.81-1.84-3.82 0-6.95 3.05-6.95 6.85 0 3.8 3.13 6.85 6.95 6.85 2.19 0 4.14-.84 5.39-2.28 1.05-1.21 1.48-2.6 1.63-4.03H11.99z"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0b132b] mb-4">Google Ads</h3>
              <p className="text-slate-500 leading-relaxed">
                Capture high-intent patients exactly when they are searching for "dentist near me" or specific medical treatments.
              </p>
            </div>

            {/* Service 3: Google Business Profile */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-green-500/30 transition-all text-center">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#0b132b] mb-4">Google Business Profile</h3>
              <p className="text-slate-500 leading-relaxed">
                Dominate local maps. We optimize your profile to rank #1 so patients find and trust your clinic instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-8 md:py-12 px-6 bg-white" id="who-we-help">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-[#16a34a] font-bold tracking-widest uppercase text-sm mb-4">Who This Is For</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0b132b] mb-6">Do You Run One of These Hospitals or Clinics?</h2>
            <p className="text-lg text-slate-600">
              If patients are already searching for your treatment online, we make sure they find YOU first.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "🦷", title: "Dentists", desc: "Implants, Aligners, Root Canals, Smile Makeovers" },
              { icon: "👶", title: "Fertility & Women's Health Clinics", desc: "Sensitive, compliant campaigns for IVF and women's health." },
              { icon: "✨", title: "Skin & Cosmetic Clinics", desc: "High-intent leads for dermatology and aesthetic procedures." },
              { icon: "🏥", title: "Small Hospitals & Diagnostic Centers", desc: "Multi-service campaigns mapped to departments and catchment areas." },
              { icon: "🦴", title: "Physiotherapy & Ortho Clinics", desc: "Local patient acquisition for physiotherapy and elective procedures." }
            ].map((item, i) => (
              <div key={i} className={`border-2 border-green-500/20 rounded-2xl p-6 sm:p-10 hover:shadow-xl hover:border-green-500/50 transition-all bg-white ${i === 4 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}>
                <div className="w-12 h-12 bg-green-50 text-[#16a34a] rounded-full flex items-center justify-center mb-6 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0b132b] mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-8 md:py-12 px-6 bg-[#f8fafc] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0b132b] mb-6">Generic Agencies Waste Your Ad Budget on Healthcare</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Problem Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-2xl font-bold text-[#0b132b] mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center"><XCircle className="w-6 h-6" /></span>
                The Problem
              </h3>
              <ul className="space-y-6 text-slate-600">
                <li className="flex gap-4 items-start">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Ad account suddenly stops running — no warning, no explanation</span>
                </li>
                <li className="flex gap-4 items-start">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>"Leads" that turn out to be random people who never show up or book</span>
                </li>
                <li className="flex gap-4 items-start">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Healthcare has strict, clinic-specific ad rules most agencies don't know</span>
                </li>
                <li className="flex gap-4 items-start">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Get it wrong → zero leads, or worse, your account gets shut down</span>
                </li>
              </ul>
            </div>

            {/* Solution Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-green-100 shadow-xl shadow-green-500/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
              <h3 className="text-2xl font-bold text-[#16a34a] mb-8 flex items-center gap-3 relative z-10">
                The Solution
              </h3>
              <ul className="space-y-6 text-slate-700 font-medium relative z-10 mb-10">
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#16a34a] shrink-0" />
                  <span>We know <strong>healthcare ad compliance inside-out</strong> — your account stays safe</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#16a34a] shrink-0" />
                  <span>Every campaign is <strong>built to filter for real, booking-ready patients</strong></span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#16a34a] shrink-0" />
                  <span>Your ads run <strong>within platform rules from day one</strong>, no shutdown risk</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#16a34a] shrink-0" />
                  <span>The result: <strong>appointments booked</strong>, not just clicks and confusion</span>
                </li>
              </ul>
              <button onClick={() => setIsModalOpen(true)} className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-green-600/20 relative z-10">
                Book Now, Get 1 Month Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 md:py-12 px-6 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h4 className="text-[#16a34a] font-bold tracking-widest uppercase text-sm mb-4">How It Works</h4>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0b132b] leading-[1.1]">4 Steps From Ad Spend to Booked Appointment</h2>
            </div>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-6 left-6 right-6 h-px bg-slate-300 z-0"></div>

            <div className="grid md:grid-cols-4 gap-12 relative z-10">
              {[
                { num: "01", title: "We Audit Your Setup", desc: "Website & AD account checked for compliance and lead-readiness." },
                { num: "02", title: "We Install Smart Tracking", desc: "So your ads keep improving, not getting blocked." },
                { num: "03", title: "We Build Trust-First Ads", desc: "Compliant creatives that make patients want to book." },
                { num: "04", title: "We Deliver Leads to You", desc: "Via WhatsApp, phone, or front desk — ready to convert." }
              ].map((step, i) => (
                <div key={i} className="bg-white">
                  <div className="w-12 h-12 bg-[#16a34a] text-white rounded-full flex items-center justify-center font-bold text-lg mb-8 shadow-lg shadow-green-600/30">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-[#0b132b] mb-4">{step.title}</h3>
                  <p className="text-slate-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof / Results Section */}
      <section className="py-8 md:py-12 px-6 bg-slate-50" id="proof">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h4 className="text-[#16a34a] font-bold tracking-widest uppercase text-sm mb-4">Proof, Not Promises</h4>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0b132b] leading-[1.1]">Real Clinics. Real Lead Numbers.</h2>
            </div>
            <div className="max-w-sm text-slate-600">
              Clear reporting, commercial outcomes, and campaigns built around what matters: new patients.
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-100 shadow-sm p-8 sm:p-10 rounded-2xl">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded flex items-center justify-center mb-16"><Check className="w-5 h-5" /></div>
              <div className="text-5xl font-bold text-[#0b132b] mb-4">57% <span className="text-2xl text-slate-500">Drop</span></div>
              <div className="text-slate-600 font-medium mb-12">in Cost Per Lead</div>
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                Dental Clinic <span className="w-1 h-1 rounded-full bg-slate-300"></span> Mumbai
              </div>
            </div>

            <div className="bg-white border border-slate-100 shadow-sm p-10 rounded-2xl">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded flex items-center justify-center mb-16"><Check className="w-5 h-5" /></div>
              <div className="text-5xl font-bold text-[#0b132b] mb-4">120+</div>
              <div className="text-slate-600 font-medium mb-12">New Patient Leads/Month</div>
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                IVF Clinic <span className="w-1 h-1 rounded-full bg-slate-300"></span> Delhi
              </div>
            </div>

            <div className="bg-white border border-slate-100 shadow-sm p-10 rounded-2xl">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded flex items-center justify-center mb-16"><Check className="w-5 h-5" /></div>
              <div className="text-5xl font-bold text-[#0b132b] mb-4">3x ROI</div>
              <div className="text-slate-600 font-medium mb-12">in First 90 Days</div>
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                Skin Clinic <span className="w-1 h-1 rounded-full bg-slate-300"></span> Bangalore
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Clinics Choose Us */}
      <section className="py-8 md:py-12 px-6 bg-[#f8fafc]" id="why-us">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-100 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-16">

            <div className="md:w-3/5 relative z-10">
              <h4 className="text-[#16a34a] font-bold tracking-widest uppercase text-sm mb-4">Why Clinics Choose Us</h4>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0b132b] mb-10 leading-[1.1]">Why Clinics Pick PANDAECE Over a Generic Agency</h2>

              <ul className="space-y-6 text-lg text-slate-600 font-medium mb-10">
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center shrink-0 mt-1"><Check className="w-4 h-4 text-[#16a34a]" /></span>
                  We speak "clinic," not just "marketing"
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center shrink-0 mt-1"><Check className="w-4 h-4 text-[#16a34a]" /></span>
                  Your patient data stays 100% private and compliant
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center shrink-0 mt-1"><Check className="w-4 h-4 text-[#16a34a]" /></span>
                  Ads built for high-value treatments, not random footfall
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center shrink-0 mt-1"><Check className="w-4 h-4 text-[#16a34a]" /></span>
                  Clear monthly reports — you always know where your money's going
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center shrink-0 mt-1"><Check className="w-4 h-4 text-[#16a34a]" /></span>
                  Cancel anytime, no scary contracts
                </li>
              </ul>
            </div>

            <div className="md:w-2/5 w-full relative z-10">
              <div className="bg-[#166534] text-white p-10 rounded-3xl shadow-xl text-center border border-green-700">
                <div className="inline-flex items-center gap-2 bg-black/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-green-200 uppercase mb-6">
                  2-Day Offer
                </div>
                <div className="text-4xl font-bold mb-4">1 Month<br />Management <span className="text-green-300">Free</span></div>
                <p className="text-green-100 mb-8 text-sm">Experience the difference of a dedicated healthcare growth partner.</p>
                <button onClick={() => setIsModalOpen(true)} className="w-full bg-white text-[#166534] hover:bg-green-50 py-4 rounded-xl font-bold transition-colors shadow-lg">
                  Claim Your Free Month
                </button>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-[#16a34a] opacity-[0.03] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-12 px-6 bg-white" id="faq">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3">
            <h4 className="text-[#16a34a] font-bold tracking-widest uppercase text-sm mb-4">FAQ</h4>
            <h2 className="text-4xl font-bold text-[#0b132b] mb-6">Your Questions, Answered</h2>
            <p className="text-slate-600 mb-8">
              Here are the answers clinic owners ask us most. Still unsure? Book a no-pressure strategy call.
            </p>
          </div>

          <div className="md:w-2/3 space-y-4">
            {[
              { q: "Will my patients' information be safe?", a: "Yes — 100%. We never share sensitive patient data with ad platforms." },
              { q: "How fast will I start getting patient inquiries?", a: "Most clinics start seeing quality leads within 2–3 weeks." },
              { q: "Do you promise results?", a: "We set clear, realistic lead targets with you before we spend a single rupee." },
              { q: "What's the minimum I need to spend?", a: "Depends upon your leads requirement. We'll outline a recommended budget based on the patient volume you want to acquire." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-slate-200 pb-6 pt-2">
                <details className="group cursor-pointer">
                  <summary className="flex items-center justify-between font-bold text-xl text-[#0b132b] list-none">
                    {faq.q}
                    <span className="bg-slate-100 text-[#16a34a] rounded p-1 group-open:rotate-45 transition-transform"><Plus className="w-5 h-5" /></span>
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed pr-12">{faq.a}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 px-6 bg-[#0a4bb8] border-t border-white/10" id="contact">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

          <div className="lg:w-1/2 text-white">
            <h4 className="text-[#16a34a] font-bold tracking-widest uppercase text-sm mb-4">Your Next Move</h4>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Fill Your<br />Calendar?</h2>
            <p className="text-slate-300 text-lg mb-10">
              Book a free 30-minute strategy call. No commitment. No jargon. Just a clear plan.
            </p>

            <ul className="space-y-6 mb-12">
              <li className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#16a34a]/10 flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-[#16a34a]" /></span>
                <span className="text-slate-300 font-medium">Clinic-specific opportunity audit</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#16a34a]/10 flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-[#16a34a]" /></span>
                <span className="text-slate-300 font-medium">Competitor and local demand review</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#16a34a]/10 flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-[#16a34a]" /></span>
                <span className="text-slate-300 font-medium">Practical 90-day growth roadmap</span>
              </li>
            </ul>

            <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5 items-start">
              <ShieldCheck className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400 leading-relaxed">
                Your information stays private and is used only to prepare your strategy conversation.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative">
              <div className="absolute top-8 right-8 w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center border border-slate-100">
                <Phone className="w-4 h-4" />
              </div>

              <h4 className="text-[#16a34a] font-bold tracking-widest uppercase text-xs mb-2">Free Strategy Call</h4>
              <h3 className="text-2xl font-bold text-[#0b132b] mb-8">Tell us about your clinic</h3>

              <FormContent />
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#063380] py-12 px-6 border-t border-white/10 text-blue-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center">
            <Image src="/logo1.png" alt="PANDAECE Logo" width={180} height={45} className="h-8 md:h-10 w-auto" />
          </div>

          <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#who-we-help" className="hover:text-white transition-colors">Who We Help</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#proof" className="hover:text-white transition-colors">Proof</a>
            <a href="#why-us" className="hover:text-white transition-colors">Why Us</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-white transition-colors">Free Strategy Call</a>
          </nav>

          <div className="flex items-center gap-4">
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium border-t border-white/5 pt-8 text-center md:text-left">
          <p>All ads run in compliance with Meta Health Advertising Policies, ASCI Guidelines & applicable medical advertising rules in India.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span>© {new Date().getFullYear()} PANDAECE. All rights reserved.</span>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Disclaimer</a>
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0b132b]/80 backdrop-blur-sm transition-all duration-300">
          <div
            className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative w-full max-w-2xl max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-50 text-slate-500 hover:text-slate-900 rounded-full flex items-center justify-center border border-slate-200 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="text-[#16a34a] font-bold tracking-widest uppercase text-xs mb-2 pr-12">Free Strategy Call</h4>
            <h3 className="text-2xl font-bold text-[#0b132b] mb-8 pr-12">Tell us about your clinic</h3>

            <FormContent />
          </div>
        </div>
      )}

    </div>
  )
}
