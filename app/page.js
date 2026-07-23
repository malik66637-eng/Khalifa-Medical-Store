'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Phone, MessageCircle, ShoppingCart, Search, Upload, MapPin, Clock, Star, Menu, X,
  Pill, Baby, Milk, Droplet, Heart, Stethoscope, ShieldCheck, Truck, DollarSign,
  Sparkles, Zap, Users, ArrowUp, Globe, ChevronRight, CheckCircle2, Award, Package
} from 'lucide-react'

const PHONE = '+92 345 4610008'
const WA_NUMBER = '923454610008'
const ADDRESS_EN = '6J2X+FGX, Main Bazar, Madina Town, Kalaswala, Pakistan'
const ADDRESS_UR = '6J2X+FGX، مین بازار، مدینہ ٹاؤن، کلاسوالہ، پاکستان'

const t = {
  en: {
    nav: { home: 'Home', products: 'Products', brands: 'Brands', wholesale: 'Wholesale', reviews: 'Reviews', contact: 'Contact' },
    hero: {
      badge: 'Trusted Pharmacy in Kalaswala since years',
      title1: 'Your Trusted Pharmacy for',
      title2: 'Quality Medicines & Healthcare',
      sub: 'Providing genuine medicines, healthcare products, baby essentials and wholesale medical supplies in Kalaswala.',
      call: 'Call Now', wa: 'WhatsApp Order', browse: 'Browse Products',
    },
    search: {
      placeholder: 'Search medicines, baby milk, vitamins, pampers…',
      upload: 'Upload Prescription',
      empty: 'No products found. Try another search.',
    },
    sections: {
      categoriesTitle: 'Product Categories',
      categoriesSub: 'Everything you need for health, wellness and daily essentials — all in one store.',
      brandsTitle: 'Trusted Brands We Offer',
      brandsSub: 'We stock only 100% genuine products from world-leading manufacturers.',
      wholesaleTitle: 'Wholesale Medical Supply',
      wholesaleText: 'We provide wholesale medicines and healthcare products for clinics, hospitals, medical stores, doctors, healthcare centers and retail shops across the region.',
      wholesaleBtn: 'Request Wholesale Quote',
      whyTitle: 'Why Choose Khalifa Medical Store',
      whySub: 'Seven reasons families and professionals across Kalaswala trust us every day.',
      reviewsTitle: 'What Our Customers Say',
      reviewsSub: 'Real reviews from real customers in Kalaswala.',
      contactTitle: 'Get in Touch',
      contactSub: 'Call, WhatsApp or visit our store — we\'re happy to help.',
    },
    productCard: { inquire: 'Inquire Now', inStock: 'In Stock' },
    form: {
      name: 'Your Name', phone: 'Phone Number', medicine: 'Medicine / Product Required',
      message: 'Message', submit: 'Send via WhatsApp', sent: 'Opening WhatsApp with your inquiry…',
    },
    footer: {
      tagline: 'Genuine medicines, wholesale supply and everyday essentials — trusted by Kalaswala.',
      quickLinks: 'Quick Links', hours: 'Business Hours', hoursValue: 'Friday – Thursday, 8:00 AM – 10:00 PM',
      contact: 'Contact', rights: 'All rights reserved.',
    },
  },
  ur: {
    nav: { home: 'ہوم', products: 'مصنوعات', brands: 'برانڈز', wholesale: 'ہول سیل', reviews: 'ریویوز', contact: 'رابطہ' },
    hero: {
      badge: 'کلاسوالہ کا معتبر میڈیکل اسٹور',
      title1: 'معیاری ادویات اور ہیلتھ کیئر کے لیے',
      title2: 'آپ کا قابل اعتماد میڈیکل اسٹور',
      sub: 'کلاسوالہ میں اصل ادویات، ہیلتھ کیئر مصنوعات، بچوں کی ضروریات اور ہول سیل میڈیکل سپلائی۔',
      call: 'ابھی کال کریں', wa: 'واٹس ایپ آرڈر', browse: 'مصنوعات دیکھیں',
    },
    search: {
      placeholder: 'ادویات، بیبی ملک، وٹامنز، پیمپرز تلاش کریں…',
      upload: 'نسخہ اپلوڈ کریں',
      empty: 'کوئی مصنوعات نہیں ملیں۔',
    },
    sections: {
      categoriesTitle: 'مصنوعات کی اقسام',
      categoriesSub: 'صحت، تندرستی اور روزمرہ کی تمام ضروریات — ایک ہی اسٹور میں۔',
      brandsTitle: 'معتبر برانڈز',
      brandsSub: 'ہم صرف 100% اصل مصنوعات فراہم کرتے ہیں۔',
      wholesaleTitle: 'ہول سیل میڈیکل سپلائی',
      wholesaleText: 'کلینکس، ہسپتالوں، میڈیکل اسٹورز، ڈاکٹرز، ہیلتھ کیئر سینٹرز اور ریٹیل شاپس کے لیے ہول سیل ادویات۔',
      wholesaleBtn: 'ہول سیل کوٹ حاصل کریں',
      whyTitle: 'خلیفہ میڈیکل اسٹور کیوں چنیں؟',
      whySub: 'سات وجوہات جن پر کلاسوالہ کے خاندان اور پیشہ ور روزانہ اعتماد کرتے ہیں۔',
      reviewsTitle: 'ہمارے گاہک کیا کہتے ہیں',
      reviewsSub: 'کلاسوالہ کے اصلی گاہکوں کے حقیقی ریویوز۔',
      contactTitle: 'ہم سے رابطہ کریں',
      contactSub: 'کال، واٹس ایپ یا اسٹور پر تشریف لائیں۔',
    },
    productCard: { inquire: 'ابھی پوچھیں', inStock: 'دستیاب' },
    form: {
      name: 'آپ کا نام', phone: 'فون نمبر', medicine: 'مطلوبہ دوا / پروڈکٹ',
      message: 'پیغام', submit: 'واٹس ایپ پر بھیجیں', sent: 'واٹس ایپ کھولا جا رہا ہے…',
    },
    footer: {
      tagline: 'اصل ادویات، ہول سیل سپلائی اور روزمرہ ضروریات — کلاسوالہ کا اعتماد۔',
      quickLinks: 'کوئیک لنکس', hours: 'اوقاتِ کار', hoursValue: 'جمعہ – جمعرات، صبح 8 بجے – رات 10 بجے',
      contact: 'رابطہ', rights: 'جملہ حقوق محفوظ ہیں۔',
    },
  },
}

// Category data (id must be unique kebab-case)
const CATEGORIES = [
  {
    id: 'medicines',
    icon: Pill,
    color: 'from-blue-500 to-blue-700',
    name: { en: 'Medicines', ur: 'ادویات' },
    products: [
      { name: 'Panadol', desc: 'Fast pain & fever relief tablets', tags: ['pain', 'fever'] },
      { name: 'Brufen', desc: 'Ibuprofen anti-inflammatory tablets', tags: ['pain'] },
      { name: 'Augmentin', desc: 'Broad-spectrum antibiotic syrup & tablets', tags: ['antibiotic'] },
      { name: 'Calpol', desc: 'Paracetamol syrup for children', tags: ['fever', 'children'] },
      { name: 'Flagyl', desc: 'Metronidazole antibiotic', tags: ['antibiotic'] },
      { name: 'Disprin', desc: 'Aspirin fast-acting tablets', tags: ['pain'] },
      { name: 'ORS', desc: 'Oral rehydration salts', tags: ['digestive'] },
      { name: 'Paracetamol', desc: 'Pain & fever medicine', tags: ['pain', 'fever'] },
      { name: 'BP Medicines', desc: 'Blood pressure control tablets', tags: ['bp'] },
      { name: 'Diabetes Medicines', desc: 'Metformin & other diabetes drugs', tags: ['diabetes'] },
      { name: 'Allergy Medicines', desc: 'Antihistamines & anti-allergy', tags: ['allergy'] },
      { name: 'Cough Syrup', desc: 'Effective cough & cold syrups', tags: ['cough'] },
    ],
  },
  {
    id: 'baby-care',
    icon: Baby,
    color: 'from-pink-400 to-pink-600',
    name: { en: 'Baby Care', ur: 'بچوں کی نگہداشت' },
    products: [
      { name: 'Pampers', desc: 'Premium baby diapers all sizes', tags: ['baby'] },
      { name: 'Baby Wipes', desc: 'Gentle wipes for delicate skin', tags: ['baby'] },
      { name: 'Baby Powder', desc: 'Soft, soothing baby powder', tags: ['baby'] },
      { name: 'Baby Lotion', desc: 'Moisturizing baby lotion', tags: ['baby'] },
      { name: 'Baby Shampoo', desc: 'No-tears formula', tags: ['baby'] },
      { name: 'Baby Soap', desc: 'Mild baby soap bar', tags: ['baby'] },
      { name: 'Feeding Bottles', desc: 'BPA-free feeding bottles', tags: ['baby'] },
      { name: 'Baby Accessories', desc: 'Everyday baby essentials', tags: ['baby'] },
    ],
  },
  {
    id: 'baby-milk',
    icon: Milk,
    color: 'from-amber-400 to-amber-600',
    name: { en: 'Baby Milk', ur: 'بچوں کا دودھ' },
    products: [
      { name: 'Meiji', desc: 'Premium Japanese infant formula', tags: ['milk'] },
      { name: 'Lactogen', desc: 'Nestlé infant formula, stage 1-4', tags: ['milk'] },
      { name: 'NAN', desc: 'Nestlé NAN infant formula', tags: ['milk'] },
      { name: 'Morinaga', desc: 'Japanese premium formula (if available)', tags: ['milk'] },
    ],
  },
  {
    id: 'honey-nutrition',
    icon: Droplet,
    color: 'from-yellow-500 to-orange-500',
    name: { en: 'Honey & Nutrition', ur: 'شہد اور غذائیت' },
    products: [
      { name: 'Natural Honey', desc: 'Pure natural honey', tags: ['honey'] },
      { name: 'Organic Honey', desc: 'Certified organic honey', tags: ['honey'] },
      { name: 'Vitamin Supplements', desc: 'Multivitamins for all ages', tags: ['vitamin'] },
      { name: 'Vitamin C', desc: 'Immunity booster tablets', tags: ['vitamin'] },
      { name: 'Protein Supplements', desc: 'Protein powders & bars', tags: ['nutrition'] },
      { name: 'Nutrition Drinks', desc: 'Ensure, Pediasure & more', tags: ['nutrition'] },
    ],
  },
  {
    id: 'personal-care',
    icon: Heart,
    color: 'from-rose-400 to-rose-600',
    name: { en: 'Personal Care', ur: 'ذاتی نگہداشت' },
    products: [
      { name: 'Shampoo', desc: 'Wide range of premium shampoos', tags: ['personal'] },
      { name: 'Soap', desc: 'Beauty & medicated soaps', tags: ['personal'] },
      { name: 'Face Wash', desc: 'Skin-type specific face washes', tags: ['personal'] },
      { name: 'Body Lotion', desc: 'Moisturizing body lotions', tags: ['personal'] },
      { name: 'Toothpaste', desc: 'Colgate, Sensodyne & more', tags: ['personal'] },
      { name: 'Toothbrush', desc: 'Soft, medium & hard bristles', tags: ['personal'] },
      { name: 'Hand Wash', desc: 'Anti-bacterial hand wash', tags: ['personal'] },
      { name: 'Sanitizer', desc: 'Alcohol-based hand sanitizer', tags: ['personal'] },
      { name: 'Skin Care', desc: 'Creams, serums & sunscreens', tags: ['personal'] },
    ],
  },
  {
    id: 'medical-equipment',
    icon: Stethoscope,
    color: 'from-emerald-500 to-emerald-700',
    name: { en: 'Medical Equipment', ur: 'میڈیکل آلات' },
    products: [
      { name: 'Thermometers', desc: 'Mercury & digital thermometers', tags: ['equipment'] },
      { name: 'BP Machine', desc: 'Digital blood pressure monitors', tags: ['equipment'] },
      { name: 'Nebulizer', desc: 'Portable nebulizer machines', tags: ['equipment'] },
      { name: 'Face Masks', desc: 'Surgical & N95 masks', tags: ['equipment'] },
      { name: 'Gloves', desc: 'Latex & nitrile examination gloves', tags: ['equipment'] },
      { name: 'Bandages', desc: 'First-aid bandages & gauze', tags: ['equipment'] },
      { name: 'Digital Thermometer', desc: 'Accurate digital thermometers', tags: ['equipment'] },
    ],
  },
]

const BRANDS = [
  { name: 'GSK', desc: 'GlaxoSmithKline — global pharma leader', color: 'bg-orange-500' },
  { name: 'Pfizer', desc: 'World renowned pharmaceutical brand', color: 'bg-blue-600' },
  { name: 'Getz Pharma', desc: 'Pakistan\'s trusted pharma company', color: 'bg-red-500' },
  { name: 'Hilton Pharma', desc: 'Premium quality medicines', color: 'bg-indigo-600' },
  { name: 'Searle', desc: 'IBL — reliable pharma partner', color: 'bg-emerald-600' },
  { name: 'AGP', desc: 'AGP Limited — quality healthcare', color: 'bg-cyan-600' },
  { name: 'Abbott', desc: 'Global healthcare innovator', color: 'bg-blue-700' },
  { name: 'Sanofi', desc: 'Life-saving medicines worldwide', color: 'bg-violet-600' },
  { name: 'Meiji', desc: 'Premium Japanese baby formula', color: 'bg-red-600' },
  { name: 'Nestlé', desc: 'Nutrition, health & wellness', color: 'bg-slate-700' },
  { name: 'Pampers', desc: 'World\'s No.1 baby diaper brand', color: 'bg-yellow-500' },
]

const WHY_US = [
  { icon: ShieldCheck, en: '100% Genuine Medicines', ur: '100% اصل ادویات' },
  { icon: Users, en: 'Experienced Staff', ur: 'تجربہ کار عملہ' },
  { icon: Truck, en: 'Wholesale Supply', ur: 'ہول سیل سپلائی' },
  { icon: DollarSign, en: 'Affordable Prices', ur: 'مناسب قیمتیں' },
  { icon: Award, en: 'Quality Healthcare Products', ur: 'معیاری ہیلتھ کیئر' },
  { icon: Zap, en: 'Fast Service', ur: 'تیز خدمت' },
  { icon: Heart, en: 'Customer Satisfaction', ur: 'کسٹمر اطمینان' },
]

const REVIEWS = [
  { name: 'Rana Zain Ul Abidin', text: { en: 'No.1 medical store in town.', ur: 'شہر کا نمبر 1 میڈیکل اسٹور۔' } },
  { name: 'Mian Imam', text: { en: 'Khalifa Medical Store is the best pharmacy in Kalaswala.', ur: 'خلیفہ میڈیکل اسٹور کلاسوالہ کا بہترین اسٹور ہے۔' } },
  { name: 'Ahmad Raza', text: { en: 'Highly recommended for genuine medicines and excellent customer service.', ur: 'اصل ادویات اور بہترین سروس کے لیے انتہائی سفارش کی جاتی ہے۔' } },
  { name: 'Fatima Bibi', text: { en: 'Always find every medicine I need. Friendly staff and fair prices.', ur: 'ہر دوا یہاں دستیاب ہوتی ہے۔ عملہ خوش اخلاق اور قیمتیں مناسب۔' } },
]

const ANNOUNCEMENTS_EN = [
  '✔ Genuine Medicines Available', '✔ Wholesale Medicines', '✔ BP Medicines',
  '✔ Diabetes Medicines', '✔ Pain Relief Medicines', '✔ Cough Syrups',
  '✔ Fever Medicines', '✔ Baby Milk', '✔ Pampers', '✔ Honey',
  '✔ Vitamins', '✔ First Aid Supplies', '✔ Fast Customer Service',
]
const ANNOUNCEMENTS_UR = [
  '✔ اصل ادویات دستیاب', '✔ ہول سیل ادویات', '✔ بلڈ پریشر کی ادویات',
  '✔ ذیابیطس کی ادویات', '✔ درد کی ادویات', '✔ کھانسی کے شربت',
  '✔ بخار کی ادویات', '✔ بچوں کا دودھ', '✔ پیمپرز', '✔ شہد',
  '✔ وٹامنز', '✔ فرسٹ ایڈ', '✔ تیز کسٹمر سروس',
]

const HERO_IMG = 'https://images.unsplash.com/photo-1642055514517-7b52288890ec?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHw0fHxwaGFybWFjeXxlbnwwfHx8fDE3ODQ4MzUxNTh8MA&ixlib=rb-4.1.0&q=85'
const PHARMACY_IMG_2 = 'https://images.unsplash.com/photo-1576602976047-174e57a47881?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwyfHxwaGFybWFjeXxlbnwwfHx8fDE3ODQ4MzUxNTh8MA&ixlib=rb-4.1.0&q=85'
const SHELVES_IMG = 'https://images.unsplash.com/photo-1596419900480-7012e6746bcf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxtZWRpY2luZSUyMHNoZWx2ZXN8ZW58MHx8fHwxNzg0ODM1MTU4fDA&ixlib=rb-4.1.0&q=85'
const PHARMACIST_IMG = 'https://images.pexels.com/photos/9629685/pexels-photo-9629685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
const WHOLESALE_IMG = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHdob2xlc2FsZXxlbnwwfHx8Ymx1ZXwxNzg0ODM1MTUyfDA&ixlib=rb-4.1.0&q=85'

function App() {
  const [lang, setLang] = useState('en')
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [toast, setToast] = useState(null)
  const fileInputRef = useRef(null)
  const L = t[lang]
  const isUrdu = lang === 'ur'

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Flatten all products for search
  const allProducts = useMemo(() =>
    CATEGORIES.flatMap(c => c.products.map(p => ({ ...p, category: c.id, catName: c.name[lang] })))
  , [lang])

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allProducts.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)).slice(0, 8)
  }, [query, allProducts])

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return CATEGORIES
    const q = query.toLowerCase()
    return CATEGORIES.map(c => ({
      ...c,
      products: c.products.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)),
    })).filter(c => c.products.length > 0)
  }, [query])

  const openWA = (message) => {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const callNow = () => { window.location.href = `tel:${PHONE.replace(/\s/g, '')}` }

  const handleProductInquiry = (productName) => {
    const msg = `Hello Khalifa Medical Store,\n\nI would like to inquire about: *${productName}*.\n\nPlease share availability & price. Thank you!`
    openWA(msg)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const name = fd.get('name') || ''
    const phone = fd.get('phone') || ''
    const medicine = fd.get('medicine') || ''
    const message = fd.get('message') || ''
    const msg = `Hello,\nMy name is ${name}.\n\nI would like to inquire about:\n${medicine}\n\nPhone:\n${phone}\n\nMessage:\n${message}`
    openWA(msg)
    setToast(L.form.sent)
    setTimeout(() => setToast(null), 3500)
    e.target.reset()
    // Fire-and-forget backend log
    fetch('/api/inquiry', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ name, phone, medicine, message, ts: Date.now() }) }).catch(() => {})
  }

  const handlePrescriptionUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const msg = `Hello Khalifa Medical Store,\n\nI'm sending my prescription (attached separately). File name: ${file.name}\n\nPlease confirm availability. Thank you!`
    openWA(msg)
    setToast('WhatsApp opened — please attach your prescription file.')
    setTimeout(() => setToast(null), 4000)
  }

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSuggestionClick = (p) => {
    setQuery(p.name)
    setShowSuggestions(false)
    setTimeout(() => scrollToId(`prod-${p.category}-${p.name.replace(/\s+/g, '-').toLowerCase()}`), 100)
  }

  const announcements = isUrdu ? ANNOUNCEMENTS_UR : ANNOUNCEMENTS_EN

  return (
    <div className={isUrdu ? 'urdu' : ''} dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Top contact strip */}
      <div className="bg-[#0a6ebd] text-white text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-green-200"><Phone size={14}/> {PHONE}</a>
            <span className="hidden md:flex items-center gap-1"><Clock size={14}/> 8:00 AM – 10:00 PM</span>
            <span className="hidden lg:flex items-center gap-1"><MapPin size={14}/> Kalaswala, Pakistan</span>
          </div>
          <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="flex items-center gap-1 bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full transition">
            <Globe size={14}/> {lang === 'en' ? 'اردو' : 'English'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0a6ebd] to-[#16a34a] flex items-center justify-center text-white shadow-lg">
              <Pill size={22}/>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-slate-900 text-sm md:text-base">Khalifa Medical</div>
              <div className="text-[10px] md:text-xs text-slate-500">& General Store</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <a href="#home" className="hover:text-[#0a6ebd] transition">{L.nav.home}</a>
            <a href="#products" className="hover:text-[#0a6ebd] transition">{L.nav.products}</a>
            <a href="#brands" className="hover:text-[#0a6ebd] transition">{L.nav.brands}</a>
            <a href="#wholesale" className="hover:text-[#0a6ebd] transition">{L.nav.wholesale}</a>
            <a href="#reviews" className="hover:text-[#0a6ebd] transition">{L.nav.reviews}</a>
            <a href="#contact" className="hover:text-[#0a6ebd] transition">{L.nav.contact}</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button onClick={() => openWA('Hello, I would like to place an order.')} className="hidden md:inline-flex bg-[#16a34a] hover:bg-green-700 text-white rounded-full">
              <MessageCircle size={16} className="mr-1"/> WhatsApp
            </Button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-slate-700">
              {menuOpen ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <nav className="flex flex-col p-4 gap-3 text-sm font-medium">
              {['home','products','brands','wholesale','reviews','contact'].map(k => (
                <a key={k} href={`#${k}`} onClick={() => setMenuOpen(false)} className="py-2 border-b border-slate-100 last:border-0">{L.nav[k]}</a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Announcement Marquee */}
      <div className="bg-gradient-to-r from-[#16a34a] to-emerald-600 text-white overflow-hidden py-2.5">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...announcements, ...announcements].map((a, i) => (
            <span key={i} className="mx-6 text-sm font-medium flex items-center gap-2">
              <Sparkles size={14}/> {a}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Modern pharmacy with medicine shelves" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a6ebd]/95 via-[#0a6ebd]/85 to-[#16a34a]/70"/>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 text-white">
          <div className="max-w-3xl animate-fadeUp">
            <Badge className="bg-white/20 text-white border-white/30 mb-5 backdrop-blur-sm">
              <ShieldCheck size={14} className="mr-1"/> {L.hero.badge}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              {L.hero.title1} <span className="block mt-2 text-green-300">{L.hero.title2}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">{L.hero.sub}</p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={callNow} className="bg-white text-[#0a6ebd] hover:bg-slate-100 rounded-full px-6 h-12 text-base font-semibold shadow-xl">
                <Phone size={18} className="mr-2"/> {L.hero.call}
              </Button>
              <Button onClick={() => openWA('Hello, I would like to place an order.')} className="bg-[#16a34a] hover:bg-green-700 rounded-full px-6 h-12 text-base font-semibold shadow-xl pulse-ring">
                <MessageCircle size={18} className="mr-2"/> {L.hero.wa}
              </Button>
              <Button onClick={() => scrollToId('products')} variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0a6ebd] rounded-full px-6 h-12 text-base font-semibold">
                <ShoppingCart size={18} className="mr-2"/> {L.hero.browse}
              </Button>
            </div>

            {/* Trust chips */}
            <div className="mt-10 flex flex-wrap gap-4 text-sm">
              {[
                { icon: ShieldCheck, en: '100% Genuine', ur: '100% اصل' },
                { icon: Truck, en: 'Wholesale Ready', ur: 'ہول سیل' },
                { icon: Zap, en: 'Fast Service', ur: 'تیز سروس' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <c.icon size={16}/> <span>{isUrdu ? c.ur : c.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="bg-[#f3f7fb] py-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                <Input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true) }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder={L.search.placeholder}
                  className="pl-12 h-14 rounded-full border-2 border-slate-200 focus:border-[#0a6ebd] text-base shadow-sm"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-30 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                    {suggestions.map((s, i) => (
                      <button key={i} onClick={() => handleSuggestionClick(s)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 text-left transition">
                        <div>
                          <div className="font-semibold text-slate-800">{s.name}</div>
                          <div className="text-xs text-slate-500">{s.desc}</div>
                        </div>
                        <ChevronRight size={16} className="text-slate-400"/>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={handlePrescriptionUpload} className="hidden"/>
              <Button onClick={() => fileInputRef.current?.click()} className="h-14 rounded-full px-6 bg-[#0a6ebd] hover:bg-[#084e88] text-white font-semibold shadow-md">
                <Upload size={18} className="mr-2"/> {L.search.upload}
              </Button>
            </div>
            {query && filteredCategories.length === 0 && (
              <div className="mt-4 text-center text-slate-500">{L.search.empty}</div>
            )}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-blue-50 text-[#0a6ebd] border-blue-200 mb-3">{isUrdu ? 'مصنوعات' : 'Categories'}</Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-3"><span className="text-gradient">{L.sections.categoriesTitle}</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{L.sections.categoriesSub}</p>
          </div>

          {filteredCategories.map((cat) => (
            <div key={cat.id} id={`cat-${cat.id}`} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md`}>
                  <cat.icon size={22}/>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{cat.name[lang]}</h3>
                  <div className="text-sm text-slate-500">{cat.products.length} {isUrdu ? 'مصنوعات' : 'products'}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {cat.products.map((p, i) => (
                  <Card key={i} id={`prod-${cat.id}-${p.name.replace(/\s+/g, '-').toLowerCase()}`} className="card-lift rounded-2xl overflow-hidden border-slate-200 group">
                    <div className={`h-24 md:h-28 bg-gradient-to-br ${cat.color} flex items-center justify-center relative overflow-hidden`}>
                      <cat.icon size={44} className="text-white/90 group-hover:scale-110 transition-transform duration-500"/>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-white/25 text-white border-0 text-[10px]">
                          <CheckCircle2 size={10} className="mr-1"/> {L.productCard.inStock}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="font-bold text-slate-900 mb-1 truncate">{p.name}</div>
                      <div className="text-xs text-slate-500 mb-3 line-clamp-2 h-8">{p.desc}</div>
                      <Button onClick={() => handleProductInquiry(p.name)} className="w-full h-9 text-xs rounded-lg bg-[#0a6ebd] hover:bg-[#084e88]">
                        <MessageCircle size={12} className="mr-1"/> {L.productCard.inquire}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" className="py-16 md:py-20 bg-[#f3f7fb]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-green-50 text-green-700 border-green-200 mb-3">{isUrdu ? 'برانڈز' : 'Brands'}</Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-3"><span className="text-gradient">{L.sections.brandsTitle}</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{L.sections.brandsSub}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {BRANDS.map((b, i) => (
              <Card key={i} className="card-lift rounded-2xl border-slate-200 bg-white group cursor-pointer">
                <CardContent className="p-5 text-center">
                  <div className={`w-16 h-16 mx-auto ${b.color} rounded-2xl flex items-center justify-center text-white font-black text-lg mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                    {b.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="font-bold text-slate-900 text-sm">{b.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">{b.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHOLESALE */}
      <section id="wholesale" className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl order-2 md:order-1">
            <img src={WHOLESALE_IMG} alt="Wholesale medicines" className="w-full h-[420px] object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a6ebd]/80 via-transparent to-transparent"/>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-3">
                <Package size={28}/>
                <div>
                  <div className="font-bold text-lg">{isUrdu ? 'بلک آرڈرز کا خیر مقدم' : 'Bulk orders welcome'}</div>
                  <div className="text-sm text-white/80">{isUrdu ? 'خصوصی ہول سیل قیمتیں' : 'Special wholesale pricing'}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Badge className="bg-blue-50 text-[#0a6ebd] border-blue-200 mb-3">{isUrdu ? 'ہول سیل' : 'Wholesale'}</Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4"><span className="text-gradient">{L.sections.wholesaleTitle}</span></h2>
            <p className="text-slate-600 mb-6 text-lg">{L.sections.wholesaleText}</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {(isUrdu
                ? ['کلینکس', 'ہسپتال', 'میڈیکل اسٹورز', 'ڈاکٹرز', 'ہیلتھ سینٹرز', 'ریٹیل شاپس']
                : ['Clinics', 'Hospitals', 'Medical Stores', 'Doctors', 'Healthcare Centers', 'Retail Shops']
              ).map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 size={18} className="text-[#16a34a] flex-shrink-0"/>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Button onClick={() => openWA('Hello, I would like to request a wholesale quote. Please share your best wholesale rates. Thank you.')} className="h-12 px-8 rounded-full bg-[#16a34a] hover:bg-green-700 text-white text-base font-semibold shadow-lg">
              <MessageCircle size={18} className="mr-2"/> {L.sections.wholesaleBtn}
            </Button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#0a6ebd] to-[#084e88] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={SHELVES_IMG} alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-white/20 text-white border-white/30 mb-3">{isUrdu ? 'ہم پر بھروسہ کیوں' : 'Why Us'}</Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-3">{L.sections.whyTitle}</h2>
            <p className="text-white/85 max-w-2xl mx-auto">{L.sections.whySub}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {WHY_US.map((w, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center hover:bg-white/20 hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white text-[#0a6ebd] flex items-center justify-center mb-3 shadow-md">
                  <w.icon size={24}/>
                </div>
                <div className="text-sm font-semibold leading-tight">{isUrdu ? w.ur : w.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 mb-3">{isUrdu ? 'ریویوز' : 'Reviews'}</Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-3"><span className="text-gradient">{L.sections.reviewsTitle}</span></h2>
            <p className="text-slate-600">{L.sections.reviewsSub}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r, i) => (
              <Card key={i} className="card-lift rounded-2xl border-slate-200">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-yellow-400 text-yellow-400"/>)}
                  </div>
                  <p className="text-slate-700 mb-4 leading-relaxed">&ldquo;{r.text[lang]}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0a6ebd] to-[#16a34a] flex items-center justify-center text-white font-bold">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">— {r.name}</div>
                      <div className="text-xs text-slate-500">{isUrdu ? 'تصدیق شدہ گاہک' : 'Verified customer'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 md:py-20 bg-[#f3f7fb]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-blue-50 text-[#0a6ebd] border-blue-200 mb-3">{isUrdu ? 'رابطہ' : 'Contact'}</Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-3"><span className="text-gradient">{L.sections.contactTitle}</span></h2>
            <p className="text-slate-600">{L.sections.contactSub}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact info + map */}
            <div className="space-y-4">
              <Card className="rounded-2xl border-slate-200">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0a6ebd] flex items-center justify-center flex-shrink-0"><MapPin size={20}/></div>
                    <div>
                      <div className="font-semibold text-slate-900">{isUrdu ? 'پتہ' : 'Address'}</div>
                      <div className="text-slate-600 text-sm">{isUrdu ? ADDRESS_UR : ADDRESS_EN}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-[#16a34a] flex items-center justify-center flex-shrink-0"><Phone size={20}/></div>
                    <div>
                      <div className="font-semibold text-slate-900">{isUrdu ? 'فون / واٹس ایپ' : 'Phone / WhatsApp'}</div>
                      <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-slate-600 text-sm hover:text-[#0a6ebd]">{PHONE}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0a6ebd] flex items-center justify-center flex-shrink-0"><Clock size={20}/></div>
                    <div>
                      <div className="font-semibold text-slate-900">{isUrdu ? 'اوقات' : 'Business Hours'}</div>
                      <div className="text-slate-600 text-sm">{L.footer.hoursValue}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 h-72">
                <iframe
                  title="Khalifa Medical Store Location"
                  src="https://www.google.com/maps?q=6J2X%2BFGX%20Main%20Bazar%20Madina%20Town%20Kalaswala&output=embed"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <Card className="rounded-2xl border-slate-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{isUrdu ? 'ابھی پوچھیں' : 'Send an Inquiry'}</h3>
                <p className="text-sm text-slate-500 mb-5">{isUrdu ? 'فارم بھر کر واٹس ایپ پر بھیجیں' : 'Fill the form to send directly on WhatsApp'}</p>
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <Input required name="name" placeholder={L.form.name} className="h-11 rounded-lg"/>
                  <Input required name="phone" type="tel" placeholder={L.form.phone} className="h-11 rounded-lg"/>
                  <Input required name="medicine" placeholder={L.form.medicine} className="h-11 rounded-lg"/>
                  <Textarea name="message" placeholder={L.form.message} rows={4} className="rounded-lg"/>
                  <Button type="submit" className="w-full h-12 rounded-lg bg-[#16a34a] hover:bg-green-700 text-white font-semibold text-base shadow-md">
                    <MessageCircle size={18} className="mr-2"/> {L.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 pt-14 pb-6">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0a6ebd] to-[#16a34a] flex items-center justify-center text-white">
                <Pill size={22}/>
              </div>
              <div>
                <div className="font-bold text-white text-lg">Khalifa Medical & General Store</div>
                <div className="text-xs text-slate-400">{isUrdu ? 'کلاسوالہ کا معتبر میڈیکل اسٹور' : 'Trusted Pharmacy in Kalaswala'}</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md mb-4">{L.footer.tagline}</p>
            <div className="flex gap-2">
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0a6ebd] flex items-center justify-center transition"><Phone size={16}/></a>
              <button onClick={() => openWA('Hello Khalifa Medical Store')} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#16a34a] flex items-center justify-center transition"><MessageCircle size={16}/></button>
              <a href="https://www.google.com/maps?q=6J2X%2BFGX+Kalaswala" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0a6ebd] flex items-center justify-center transition"><MapPin size={16}/></a>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">{L.footer.quickLinks}</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="hover:text-white">{L.nav.products}</a></li>
              <li><a href="#wholesale" className="hover:text-white">{L.nav.wholesale}</a></li>
              <li><a href="#brands" className="hover:text-white">{L.nav.brands}</a></li>
              <li><a href="#reviews" className="hover:text-white">{L.nav.reviews}</a></li>
              <li><a href="#contact" className="hover:text-white">{L.nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">{L.footer.contact}</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-1 flex-shrink-0"/> <span>{isUrdu ? ADDRESS_UR : ADDRESS_EN}</span></li>
              <li className="flex items-center gap-2"><Phone size={14}/> {PHONE}</li>
              <li className="flex items-center gap-2"><Clock size={14}/> {L.footer.hoursValue}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Khalifa Medical & General Store. {L.footer.rights}
        </div>
      </footer>

      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {showTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-700 transition flex items-center justify-center">
            <ArrowUp size={20}/>
          </button>
        )}
        <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="w-14 h-14 rounded-full bg-[#0a6ebd] text-white shadow-xl hover:bg-[#084e88] transition flex items-center justify-center animate-floaty">
          <Phone size={22}/>
        </a>
        <button onClick={() => openWA('Hello Khalifa Medical Store, I would like to place an order.')} className="w-14 h-14 rounded-full bg-[#16a34a] text-white shadow-xl hover:bg-green-700 transition flex items-center justify-center pulse-ring">
          <MessageCircle size={24}/>
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl text-sm animate-fadeUp">
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400"/> {toast}</div>
        </div>
      )}
    </div>
  )
}

export default App
