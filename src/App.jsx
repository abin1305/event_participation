import { useState } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { AppProvider } from '@/context/AppContext'
import { Navbar } from '@/components/navbar'
import { EventHero } from '@/components/event-hero'
import { EventsShowcase } from '@/components/events-showcase'
import { EventTracks } from '@/components/event-tracks'
import { RegistrationForm } from '@/components/registration-form'
import { ScheduleSection } from '@/components/schedule-section'
import { FaqVenueSection } from '@/components/faq-venue-section'
import { Testimonials } from '@/components/testimonials'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { OrganizationDashboard } from '@/components/organization-dashboard'
import { ParticipantTickets } from '@/components/participant-tickets'
import { Toaster } from 'sonner'
import './App.css'

function AppContent() {
  const [activeTab, setActiveTab] = useState('main') // 'main' | 'organization' | 'my-tickets'
  const [selectedTrack, setSelectedTrack] = useState()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">
        {activeTab === 'organization' && <OrganizationDashboard />}

        {activeTab === 'my-tickets' && <ParticipantTickets />}

        {activeTab === 'main' && (
          <>
            <EventHero />
            <EventsShowcase />
            <EventTracks onSelectTrack={setSelectedTrack} />
            <section id="register" className="py-16 container mx-auto px-4 max-w-4xl">
              <RegistrationForm selectedTrack={selectedTrack} />
            </section>
            <ScheduleSection />
            <FaqVenueSection />
            <Testimonials />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  )
}
