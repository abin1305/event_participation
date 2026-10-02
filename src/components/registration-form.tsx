"use client"

import type React from "react"
import { useState } from "react"
import QRCode from "qrcode"
import { useApp } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TicketPass } from "@/components/ticket-pass"
import { toast } from "sonner"
import { User, Mail, Phone, GraduationCap, MapPin, Wand2, ArrowRight, Calendar, Sparkles } from "lucide-react"

export function RegistrationForm({ selectedTrack }: { selectedTrack?: string }) {
  const { events, registerParticipant, selectedEventId, setSelectedEventId } = useApp()
  const [submitting, setSubmitting] = useState(false)
  const [ticketModalOpen, setTicketModalOpen] = useState(false)
  const [participantData, setParticipantData] = useState<any>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)

  const currentEvent = events.find((e) => e.id === selectedEventId) || events[0]

  const [form, setForm] = useState({
    name: "Alex Vance",
    email: "alex.vance@tech.edu",
    phone: "+1 (555) 987-6543",
    address: "100 Innovation Way",
    city: "San Jose",
    state: "CA",
    zip: "95110",
    college: "Stanford University",
    department: "Computer Science",
    year: "3rd Year",
    track: selectedTrack || currentEvent?.track || "AI & Machine Learning",
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setForm((f) => ({ ...f, [name]: value }))
  }

  const fillDemoData = () => {
    setForm({
      name: "Jordan Vance",
      email: "jordan.vance@tech.edu",
      phone: "+1 (555) 987-6543",
      address: "100 Innovation Way",
      city: "San Jose",
      state: "CA",
      zip: "95110",
      college: "California Institute of Technology",
      department: "Computer Science",
      year: "3rd Year",
      track: currentEvent?.track || "AI & Machine Learning",
    })
    toast.success("Auto-filled registration details!")
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.college) {
      toast.error("Please fill in required fields")
      return
    }

    setSubmitting(true)

    try {
      // Register participant in app context and local storage
      const { registration, event } = registerParticipant(form, currentEvent.id)

      // Generate QR Code
      const payload = JSON.stringify({
        id: registration.id,
        ticketId: registration.ticketId,
        name: registration.name,
        college: registration.college,
        eventTitle: event.title,
      })
      const url = await QRCode.toDataURL(payload, { errorCorrectionLevel: "M", margin: 2, width: 300 })

      setQrDataUrl(url)
      setParticipantData(registration)

      setTicketModalOpen(true)
      toast.success(`Registered successfully for ${event.title}! Ticket ID: ${registration.ticketId}`)
    } catch (err: any) {
      toast.error(err?.message || "Registration failed. Please check form fields.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Card className="relative p-6 sm:p-10 bg-card/80 backdrop-blur-xl border-primary/20 shadow-2xl rounded-3xl overflow-hidden">
        {/* Top Accent Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-indigo-500 to-purple-600" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/30 text-primary bg-primary/10 mb-2">
              Fast-Track Event Portal
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Participant Registration Form</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Hosting Organization: <strong className="text-foreground">{currentEvent?.organizationName}</strong>
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={fillDemoData}
            className="rounded-full text-xs font-semibold gap-1.5 border-dashed border-primary/40 hover:border-primary text-primary"
          >
            <Wand2 className="h-3.5 w-3.5" />
            Auto-Fill Sample Data
          </Button>
        </div>

        {/* Select Target Event Dropdown */}
        <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            Select Event to Register For:
          </Label>
          <Select value={currentEvent?.id} onValueChange={(val) => setSelectedEventId(val)}>
            <SelectTrigger className="rounded-xl h-12 bg-background font-semibold text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {events.map((evt) => (
                <SelectItem key={evt.id} value={evt.id}>
                  {evt.title} — Hosted by {evt.organizationName} ({evt.price})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={onSubmit}>
          <Field label="Full Name" name="name" value={form.name} onChange={onChange} icon={User} placeholder="e.g. Alex Rivera" required />
          <Field label="Email Address" name="email" type="email" value={form.email} onChange={onChange} icon={Mail} placeholder="alex@university.edu" required />
          <Field label="Phone Number" name="phone" value={form.phone} onChange={onChange} icon={Phone} placeholder="+1 (555) 000-0000" required />

          {/* Select Track */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="track" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Selected Workshop Track
            </Label>
            <Select value={form.track} onValueChange={(val) => handleSelectChange("track", val)}>
              <SelectTrigger className="rounded-xl h-11 bg-background/80">
                <SelectValue placeholder="Select Track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                <SelectItem value="Full Stack & Cloud">Full Stack & Cloud Native</SelectItem>
                <SelectItem value="Cybersecurity & Web3">Cybersecurity & Web3</SelectItem>
                <SelectItem value="UI/UX & Product Design">UI/UX & Product Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Field label="College / University" name="college" value={form.college} onChange={onChange} icon={GraduationCap} placeholder="e.g. Stanford University" required />

          {/* Department Select */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="department" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Department / Major
            </Label>
            <Select value={form.department} onValueChange={(val) => handleSelectChange("department", val)}>
              <SelectTrigger className="rounded-xl h-11 bg-background/80">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Design & HCI">Design & HCI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Academic Year */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="year" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Academic Year
            </Label>
            <Select value={form.year} onValueChange={(val) => handleSelectChange("year", val)}>
              <SelectTrigger className="rounded-xl h-11 bg-background/80">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st Year">1st Year</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
                <SelectItem value="4th Year">4th Year</SelectItem>
                <SelectItem value="Graduate / Post-Grad">Graduate / Post-Grad</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Field label="City" name="city" value={form.city} onChange={onChange} icon={MapPin} placeholder="e.g. San Jose" required />
          <Field label="State / Province" name="state" value={form.state} onChange={onChange} placeholder="e.g. CA" required />
          <Field label="ZIP Code" name="zip" value={form.zip} onChange={onChange} placeholder="e.g. 95110" required />

          <div className="md:col-span-2">
            <Field label="Street Address" name="address" value={form.address} onChange={onChange} placeholder="123 Campus Blvd..." required />
          </div>

          <div className="md:col-span-2 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground">
              Instant digital ticket generated upon submission.
            </div>

            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 py-6 text-sm font-semibold shadow-lg shadow-primary/20 bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:opacity-90 gap-2"
            >
              {submitting ? "Processing Registration..." : "Complete Registration & Get Ticket"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>

      {/* Ticket Pass Pop-up Modal */}
      <TicketPass
        open={ticketModalOpen}
        onOpenChange={setTicketModalOpen}
        participant={participantData}
        qrDataUrl={qrDataUrl}
      />
    </>
  )
}

function Field(props: {
  label: string
  name: string
  value: string
  onChange: (e: any) => void
  type?: string
  placeholder?: string
  required?: boolean
  icon?: any
}) {
  const { label, name, value, onChange, type = "text", placeholder, required, icon: Icon } = props
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-rose-500">*</span>}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        {name === "address" ? (
          <Textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="rounded-xl min-h-[70px] bg-background/80"
          />
        ) : (
          <Input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            required={required}
            className={`rounded-xl h-11 bg-background/80 ${Icon ? "pl-10" : ""}`}
          />
        )}
      </div>
    </div>
  )
}
