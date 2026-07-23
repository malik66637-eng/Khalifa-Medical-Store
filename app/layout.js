import './globals.css'

export const metadata = {
  title: 'Khalifa Medical & General Store | Pharmacy in Kalaswala, Pakistan',
  description: 'Khalifa Medical & General Store is the No.1 trusted pharmacy in Kalaswala offering genuine medicines, wholesale medical supplies, baby milk (Meiji, Lactogen, NAN), Pampers, vitamins, honey, first aid supplies and general household essentials. Serving clinics, hospitals, doctors and retail customers.',
  keywords: 'Medical Store in Kalaswala, Pharmacy in Kalaswala, Wholesale Medicines Pakistan, Baby Milk, Pampers, Meiji, Lactogen, NAN, Healthcare Products, Medicine Store Near Me, Khalifa Medical Store, Panadol, Brufen, Augmentin, Calpol, BP Medicines, Diabetes Medicines',
  openGraph: {
    title: 'Khalifa Medical & General Store — Trusted Pharmacy in Kalaswala',
    description: 'Genuine medicines, wholesale medical supplies, baby care & general essentials in Kalaswala, Pakistan.',
    type: 'website',
  },
  robots: 'index, follow',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
