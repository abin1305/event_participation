"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { MapPin, Search, HelpCircle, Mail, Phone, Calendar, Navigation, Wifi, Coffee, Car } from "lucide-react"

const FAQS = [
  {
    q: "How do I check in at the event venue?",
    a: "After submitting your registration form, a Digital QR Event Pass will be generated instantly. Present this QR code on your phone or bring a printed copy to Gate A for immediate check-in.",
  },
  {
    q: "Can I change my workshop track after registering?",
    a: "Yes! Simply visit the entrance helpdesk on Day 1 or contact our support team. Seat availability is updated in real-time.",
  },
  {
    q: "Are food, drinks, and Wi-Fi provided?",
    a: "Yes! Free high-speed 5G Wi-Fi, complimentary coffee, lunch buffets, and networking snacks are provided for all registered delegates.",
  },
  {
    q: "What should I bring to the event?",
    a: "Please bring a valid student/government ID, your laptop for hands-on workshop tracks, and your digital QR Ticket pass.",
  },
  {
    q: "Will certificates be provided?",
    a: "Official verifiable digital certificates of participation and workshop completion will be emailed to all attended participants within 48 hours post-event.",
  },
]

export function FaqVenueSection() {
  const [search, setSearch] = useState("")

  const filteredFaqs = FAQS.filter(
    (f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section id="venue-faq" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Venue & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/30 text-primary bg-primary/10 mb-2">
                Venue & Logistics
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight">Location & Info</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Everything you need to know about getting to the venue and amenities.
              </p>
            </div>

            <Card className="p-6 bg-card border-border/60 rounded-3xl space-y-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Summit Venue</div>
                  <div className="font-bold text-foreground">Grand Tech Innovation Center</div>
                  <div className="text-xs text-muted-foreground mt-0.5">123 Event Innovation Way, Gate A, Silicon Hub</div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-border/50">
                <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Desk</div>
                  <div className="font-bold text-foreground">events@techpulse2026.org</div>
                  <div className="text-xs text-muted-foreground mt-0.5">+1 (555) 123-4567 (Mon-Sat, 9AM-6PM)</div>
                </div>
              </div>

              {/* Amenities Pills */}
              <div className="pt-4 border-t border-border/50">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Venue Amenities</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/50 border">
                    <Wifi className="h-4 w-4 text-emerald-500" /> High-Speed Wi-Fi
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/50 border">
                    <Coffee className="h-4 w-4 text-amber-500" /> Free Coffee & Refreshments
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/50 border">
                    <Car className="h-4 w-4 text-blue-500" /> On-site Parking
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/50 border">
                    <Navigation className="h-4 w-4 text-purple-500" /> Accessible Entrance
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Searchable FAQ Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/30 text-primary bg-primary/10 mb-2">
                Help Center
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
            </div>

            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions (e.g. check-in, wifi, track)..."
                className="pl-10 rounded-2xl h-12 bg-background/80"
              />
            </div>

            <Card className="p-6 bg-card border-border/60 rounded-3xl shadow-sm">
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredFaqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border-border/50 rounded-2xl px-2">
                    <AccordionTrigger className="text-left font-bold text-sm hover:no-underline hover:text-primary py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No matching FAQs found for "{search}". Contact support above!
                  </div>
                )}
              </Accordion>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
