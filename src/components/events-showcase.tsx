"use client"

import React, { useState } from "react"
import { useApp } from "@/context/AppContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Calendar, MapPin, Users, Building2, Tag, ArrowRight, Search, CheckCircle2 } from "lucide-react"

export function EventsShowcase() {
  const { events, setSelectedEventId, registrations } = useApp()
  const [search, setSearch] = useState("")
  const [selectedTrackFilter, setSelectedTrackFilter] = useState("all")

  const filteredEvents = events.filter((evt) => {
    const matchesTrack = selectedTrackFilter === "all" || evt.track === selectedTrackFilter
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      evt.title.toLowerCase().includes(q) ||
      evt.organizationName.toLowerCase().includes(q) ||
      evt.venue.toLowerCase().includes(q) ||
      evt.description.toLowerCase().includes(q)

    return matchesTrack && matchesSearch
  })

  const handleSelectToRegister = (eventId: string) => {
    setSelectedEventId(eventId)
    const el = document.getElementById("register")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="events" className="py-16 bg-muted/20">
      <div className="container mx-auto px-4 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/30 text-primary bg-primary/10">
            Hosted Tech Events
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Explore Upcoming Events & Summits
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Participate in top conferences and hackathons hosted by verified partner organizations.
          </p>
        </div>

        {/* Search & Track Filter Controls */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search event title, organization, venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-2xl h-11 bg-background/80"
            />
          </div>

          <Select value={selectedTrackFilter} onValueChange={setSelectedTrackFilter}>
            <SelectTrigger className="rounded-2xl h-11 bg-background/80">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
              <SelectItem value="Full Stack & Cloud">Full Stack & Cloud</SelectItem>
              <SelectItem value="Cybersecurity & Web3">Cybersecurity & Web3</SelectItem>
              <SelectItem value="UI/UX & Product Design">UI/UX & Product Design</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No events found matching your search. Try adjusting filters.
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const count = registrations.filter((r) => r.eventId === evt.id).length
              return (
                <Card
                  key={evt.id}
                  className="relative overflow-hidden p-6 rounded-3xl bg-card/80 backdrop-blur-xl border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
                        {evt.track}
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                        {evt.price}
                      </Badge>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 uppercase tracking-wider mb-1">
                        <Building2 className="h-3.5 w-3.5" />
                        Host: {evt.organizationName}
                      </div>
                      <h3 className="text-xl font-extrabold leading-snug group-hover:text-primary transition-colors">
                        {evt.title}
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-border text-xs text-muted-foreground font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {evt.date} ({evt.time})
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {evt.venue}, {evt.city}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-indigo-500" />
                        {count} Registered / Max {evt.capacity} Capacity
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSelectToRegister(evt.id)}
                    className="mt-6 w-full rounded-2xl gap-2 font-semibold shadow-md bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 text-white"
                  >
                    Register For Event
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
