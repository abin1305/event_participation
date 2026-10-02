"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import { toast } from "sonner"

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setSubmitting(true)
    setTimeout(() => {
      toast.success("Thank you! Your inquiry has been sent to the event organizers.")
      setForm({ name: "", email: "", message: "" })
      setSubmitting(false)
    }, 600)
  }

  return (
    <section id="contact" className="py-16 bg-muted/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="p-8 sm:p-10 rounded-3xl bg-card/80 backdrop-blur-xl border-primary/20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-4">
              <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/30 text-primary bg-primary/10">
                Organizers Contact
              </Badge>
              <h3 className="text-2xl font-black tracking-tight">Have Questions? Get In Touch</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Need custom sponsorship options or assistance regarding registrations? Drop us a line below.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email Inquiry</div>
                    <div className="text-muted-foreground">support@techpulse2026.org</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Helpline</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Headquarters</div>
                    <div className="text-muted-foreground">Grand Tech Pavilion, Gate A</div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <Input
                  placeholder="Your Name *"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl h-11 bg-background/80"
                />
              </div>

              <div className="space-y-1.5">
                <Input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl h-11 bg-background/80"
                />
              </div>

              <div className="space-y-1.5">
                <Textarea
                  placeholder="How can we help you? *"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="rounded-xl bg-background/80"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl py-5 font-semibold bg-gradient-to-r from-primary to-indigo-600 text-white gap-2 shadow-md"
              >
                {submitting ? "Sending Message..." : "Send Message"}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </section>
  )
}
