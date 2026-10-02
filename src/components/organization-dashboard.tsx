"use client"

import React, { useState } from "react"
import { useApp } from "@/context/AppContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Building2,
  PlusCircle,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Search,
  Filter,
  UserCheck,
  XCircle,
  Sparkles,
  MapPin,
  TrendingUp,
  Tag,
  ShieldCheck,
  Eye,
  Trash2,
} from "lucide-react"

export function OrganizationDashboard() {
  const {
    currentUser,
    getOrganizationEvents,
    getOrganizationParticipants,
    addEvent,
    toggleCheckIn,
    cancelRegistration,
    exportCSV,
  } = useApp()

  const orgEvents = getOrganizationEvents()
  const orgParticipants = getOrganizationParticipants()

  const [createEventModalOpen, setCreateEventModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEventFilter, setSelectedEventFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewParticipantModal, setViewParticipantModal] = useState<any>(null)

  // New Event Form State
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    time: "09:00 AM - 05:00 PM",
    venue: "",
    city: "San Francisco, CA",
    track: "AI & Machine Learning",
    capacity: "300",
    price: "Free",
    description: "",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  })

  // Calculate Metrics
  const totalEvents = orgEvents.length
  const totalRegistrations = orgParticipants.length
  const checkedInCount = orgParticipants.filter((p) => p.checkedIn).length
  const totalCapacity = orgEvents.reduce((acc, ev) => acc + (ev.capacity || 0), 0)
  const occupancyRate = totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0

  // Filtered Participants Roster
  const filteredParticipants = orgParticipants.filter((p) => {
    const matchesEvent = selectedEventFilter === "all" || p.eventId === selectedEventFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "checked" && p.checkedIn) ||
      (statusFilter === "pending" && !p.checkedIn)

    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.ticketId.toLowerCase().includes(q) ||
      p.college.toLowerCase().includes(q) ||
      p.eventTitle.toLowerCase().includes(q)

    return matchesEvent && matchesStatus && matchesSearch
  })

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!eventForm.title || !eventForm.date || !eventForm.venue) return

    addEvent(eventForm)
    setCreateEventModalOpen(false)
    setEventForm({
      title: "",
      date: "",
      time: "09:00 AM - 05:00 PM",
      venue: "",
      city: "San Francisco, CA",
      track: "AI & Machine Learning",
      capacity: "300",
      price: "Free",
      description: "",
      banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    })
  }

  return (
    <div className="space-y-8 pt-24 pb-16 container mx-auto px-4">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white shadow-2xl overflow-hidden border border-indigo-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                Organization Portal
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs">
                Data Scope Isolated
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
              <Building2 className="h-8 w-8 text-indigo-400" />
              {currentUser.orgName || "Organization Dashboard"}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Conduct & publish events, manage delegate registrations, conduct real-time gate check-ins, and export participant data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setCreateEventModalOpen(true)}
              className="rounded-full px-6 py-5 font-semibold text-sm shadow-xl bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Conduct New Event
            </Button>

            <Button
              onClick={() => exportCSV(selectedEventFilter)}
              variant="outline"
              className="rounded-full px-5 py-5 font-semibold text-sm border-indigo-400/40 text-indigo-100 hover:bg-indigo-500/20 gap-2"
            >
              <Download className="h-4 w-4 text-indigo-400" />
              Export CSV Roster
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 rounded-2xl bg-card/80 backdrop-blur-xl border-primary/20 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Conducted Events</span>
            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black">{totalEvents}</div>
          <p className="text-[11px] text-muted-foreground mt-1">Events created by {currentUser.orgName}</p>
        </Card>

        <Card className="p-5 rounded-2xl bg-card/80 backdrop-blur-xl border-primary/20 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Registered Delegates</span>
            <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-indigo-600 dark:text-indigo-400">{totalRegistrations}</div>
          <p className="text-[11px] text-muted-foreground mt-1">Total participants across all your events</p>
        </Card>

        <Card className="p-5 rounded-2xl bg-card/80 backdrop-blur-xl border-primary/20 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Checked-In Attendees</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-emerald-600 dark:text-emerald-400">{checkedInCount}</div>
          <p className="text-[11px] text-muted-foreground mt-1">{totalRegistrations > 0 ? `${Math.round((checkedInCount / totalRegistrations) * 100)}% checked in at venue` : "No check-ins yet"}</p>
        </Card>

        <Card className="p-5 rounded-2xl bg-card/80 backdrop-blur-xl border-primary/20 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Capacity Utilization</span>
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-purple-600 dark:text-purple-400">{occupancyRate}%</div>
          <p className="text-[11px] text-muted-foreground mt-1">{totalRegistrations} / {totalCapacity} seats filled</p>
        </Card>
      </div>

      {/* Events Conducted Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Your Conducted Events ({orgEvents.length})
          </h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCreateEventModalOpen(true)}
            className="rounded-full text-xs font-semibold gap-1.5"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add Event
          </Button>
        </div>

        {orgEvents.length === 0 ? (
          <Card className="p-8 text-center rounded-2xl border-dashed">
            <p className="text-sm text-muted-foreground">No events conducted by your organization yet.</p>
            <Button onClick={() => setCreateEventModalOpen(true)} className="mt-3 rounded-full text-xs">
              Conduct First Event
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orgEvents.map((evt) => {
              const eventRegs = orgParticipants.filter((r) => r.eventId === evt.id)
              return (
                <Card
                  key={evt.id}
                  className="p-5 rounded-2xl bg-card/80 backdrop-blur-xl border-primary/20 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold">
                        {evt.track}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {evt.price}
                      </Badge>
                    </div>
                    <h3 className="font-extrabold text-base leading-snug line-clamp-2">{evt.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{evt.description}</p>
                    <div className="space-y-1 pt-1 text-xs text-muted-foreground font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        {evt.date} ({evt.time})
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {evt.venue}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {eventRegs.length} / {evt.capacity} Registered
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedEventFilter(evt.id)}
                      className="rounded-xl h-8 text-xs text-primary hover:text-primary"
                    >
                      View Participants &rarr;
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Participant Roster Table Section */}
      <Card className="p-6 rounded-3xl bg-card/80 backdrop-blur-xl border-primary/20 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight">Participant Registrations Roster</h2>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 font-mono">
                {filteredParticipants.length} Records
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Live registration data for events conducted by <strong className="text-foreground">{currentUser.orgName}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => exportCSV(selectedEventFilter)}
              size="sm"
              className="rounded-full gap-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Download className="h-3.5 w-3.5" />
              Download CSV
            </Button>
          </div>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search participant name, email, ticket ID, college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-xl h-10 bg-background/80 text-xs"
            />
          </div>

          {/* Filter by Conducted Event */}
          <Select value={selectedEventFilter} onValueChange={setSelectedEventFilter}>
            <SelectTrigger className="rounded-xl h-10 bg-background/80 text-xs">
              <SelectValue placeholder="Filter by Event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events ({orgEvents.length})</SelectItem>
              {orgEvents.map((evt) => (
                <SelectItem key={evt.id} value={evt.id}>
                  {evt.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter by Check-In Status */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="rounded-xl h-10 bg-background/80 text-xs">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="checked">Checked-In Only</SelectItem>
              <SelectItem value="pending">Pending Check-In</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Data Roster Table */}
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 text-muted-foreground uppercase text-[10px] font-semibold tracking-wider border-b border-border">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Participant</th>
                <th className="py-3 px-4">College / Dept</th>
                <th className="py-3 px-4">Event & Track</th>
                <th className="py-3 px-4">Gate Check-In</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredParticipants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    No participant registrations matched your search criteria.
                  </td>
                </tr>
              ) : (
                filteredParticipants.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {p.ticketId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-foreground">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground">{p.email} | {p.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground">{p.college}</div>
                      <div className="text-[10px] text-muted-foreground">{p.department} ({p.year})</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-semibold text-foreground truncate">{p.eventTitle}</div>
                      <Badge variant="outline" className="text-[9px] py-0 px-1.5 mt-0.5 border-primary/30 text-primary">
                        {p.track}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleCheckIn(p.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                          p.checkedIn
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25"
                            : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/25"
                        }`}
                      >
                        {p.checkedIn ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" /> Checked In
                          </>
                        ) : (
                          <>
                            <Clock className="h-3.5 w-3.5" /> Pending Check-In
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setViewParticipantModal(p)}
                          className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
                          title="View Participant Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => cancelRegistration(p.id)}
                          className="h-7 w-7 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                          title="Cancel Registration"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Conduct New Event Modal */}
      <Dialog open={createEventModalOpen} onOpenChange={setCreateEventModalOpen}>
        <DialogContent className="max-w-xl rounded-3xl p-6 bg-background/95 backdrop-blur-2xl border-primary/20">
          <DialogHeader className="mb-4">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <PlusCircle className="h-5 w-5 text-indigo-500" />
              Conduct & Publish New Event
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Event will be registered under <strong>{currentUser.orgName}</strong>. Participants will be able to register instantly.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateEventSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase font-semibold">Event Title *</Label>
              <Input
                required
                placeholder="e.g. AI & Robotics Hackathon 2026"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-semibold">Track / Category</Label>
                <Select
                  value={eventForm.track}
                  onValueChange={(val) => setEventForm({ ...eventForm, track: val })}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                    <SelectItem value="Full Stack & Cloud">Full Stack & Cloud</SelectItem>
                    <SelectItem value="Cybersecurity & Web3">Cybersecurity & Web3</SelectItem>
                    <SelectItem value="UI/UX & Product Design">UI/UX & Product Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-semibold">Event Date *</Label>
                <Input
                  type="date"
                  required
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-semibold">Venue Location *</Label>
                <Input
                  required
                  placeholder="e.g. Grand Auditorium, Block A"
                  value={eventForm.venue}
                  onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-semibold">Max Capacity</Label>
                <Input
                  type="number"
                  placeholder="e.g. 250"
                  value={eventForm.capacity}
                  onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase font-semibold">Description</Label>
              <Textarea
                rows={3}
                placeholder="Brief summary of event schedule, speakers, and goals..."
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="pt-3 border-t border-border flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setCreateEventModalOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-indigo-600 text-white font-semibold">
                Publish Event Now
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Detailed Participant Modal */}
      {viewParticipantModal && (
        <Dialog open={!!viewParticipantModal} onOpenChange={() => setViewParticipantModal(null)}>
          <DialogContent className="max-w-md rounded-3xl p-6 bg-background/95 backdrop-blur-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-indigo-500" />
                Delegate Details: {viewParticipantModal.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-muted/60 space-y-1 font-mono">
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">Ticket Code: {viewParticipantModal.ticketId}</div>
                <div>Registered: {new Date(viewParticipantModal.registeredAt).toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground font-semibold">Email:</span>
                  <div className="font-medium text-foreground">{viewParticipantModal.email}</div>
                </div>
                <div>
                  <span className="text-muted-foreground font-semibold">Phone:</span>
                  <div className="font-medium text-foreground">{viewParticipantModal.phone}</div>
                </div>
                <div>
                  <span className="text-muted-foreground font-semibold">College:</span>
                  <div className="font-medium text-foreground">{viewParticipantModal.college}</div>
                </div>
                <div>
                  <span className="text-muted-foreground font-semibold">Department:</span>
                  <div className="font-medium text-foreground">{viewParticipantModal.department} ({viewParticipantModal.year})</div>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground font-semibold">Event Registered:</span>
                <div className="font-semibold text-foreground">{viewParticipantModal.eventTitle}</div>
              </div>

              <div className="pt-3 flex justify-between items-center border-t">
                <Button
                  size="sm"
                  onClick={() => {
                    toggleCheckIn(viewParticipantModal.id)
                    setViewParticipantModal({ ...viewParticipantModal, checkedIn: !viewParticipantModal.checkedIn })
                  }}
                  className={`rounded-xl text-xs font-semibold ${
                    viewParticipantModal.checkedIn ? "bg-amber-600" : "bg-emerald-600"
                  }`}
                >
                  {viewParticipantModal.checkedIn ? "Mark as Pending" : "Mark as Checked-In"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setViewParticipantModal(null)} className="rounded-xl">
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
