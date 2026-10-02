"use client"

import React, { useState } from "react"
import { useApp } from "@/context/AppContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TicketPass } from "@/components/ticket-pass"
import QRCode from "qrcode"
import { Ticket, Calendar, QrCode, MapPin, CheckCircle2, Download, UserCheck, Sparkles } from "lucide-react"

export function ParticipantTickets() {
  const { currentUser, getParticipantRegistrations, events } = useApp()
  const myRegistrations = getParticipantRegistrations()

  const [activeTicketModal, setActiveTicketModal] = useState<any>(null)
  const [qrUrl, setQrUrl] = useState<string | null>(null)

  const handleOpenTicket = async (reg: any) => {
    const payload = JSON.stringify({
      id: reg.id,
      ticketId: reg.ticketId,
      name: reg.name,
      college: reg.college,
      eventTitle: reg.eventTitle,
    })
    const dataUrl = await QRCode.toDataURL(payload, { errorCorrectionLevel: "M", margin: 2, width: 300 })
    setQrUrl(dataUrl)
    setActiveTicketModal(reg)
  }

  return (
    <div className="space-y-8 pt-24 pb-16 container mx-auto px-4">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-2xl overflow-hidden border border-emerald-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                <UserCheck className="h-3.5 w-3.5 mr-1" />
                Participant Pass Center
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
              <Ticket className="h-8 w-8 text-emerald-400" />
              My Digital Ticket Passes
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Registered as <strong className="text-white">{currentUser.name}</strong> ({currentUser.email}). Present these QR passes at the venue gate for instant check-in.
            </p>
          </div>

          <Badge variant="outline" className="text-xs py-2 px-4 border-emerald-400/40 text-emerald-200 font-mono self-start md:self-auto">
            {myRegistrations.length} Active Registrations
          </Badge>
        </div>
      </div>

      {/* Passes List */}
      {myRegistrations.length === 0 ? (
        <Card className="p-12 text-center rounded-3xl border-dashed bg-card/60 backdrop-blur-xl">
          <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-40 animate-bounce" />
          <h3 className="text-xl font-bold">No Event Registrations Found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            You haven't registered for any upcoming events under {currentUser.email} yet. Explore events on the home page and get your ticket!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRegistrations.map((reg) => {
            const eventInfo = events.find((e) => e.id === reg.eventId)
            return (
              <Card
                key={reg.id}
                className="relative overflow-hidden p-6 rounded-3xl bg-card/80 backdrop-blur-xl border-emerald-500/20 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                      {reg.ticketId}
                    </Badge>
                    <Badge
                      className={`text-[10px] font-semibold uppercase ${
                        reg.checkedIn
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                      }`}
                    >
                      {reg.checkedIn ? "Checked In Gate" : "Confirmed"}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold leading-snug line-clamp-2">{reg.eventTitle}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Host: <strong className="text-foreground">{eventInfo?.organizationName || "Event Host"}</strong>
                    </p>
                  </div>

                  <div className="space-y-1 text-xs text-muted-foreground pt-1 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                      {eventInfo?.date || "Upcoming"} ({eventInfo?.time || "TBD"})
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                      {eventInfo?.venue || "Main Auditorium"}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-muted/60 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Attendee:</span>
                      <span className="font-semibold">{reg.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">College:</span>
                      <span className="font-semibold truncate max-w-[180px]">{reg.college}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Track:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{reg.track}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleOpenTicket(reg)}
                  className="mt-5 w-full rounded-2xl gap-2 font-semibold shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white"
                >
                  <QrCode className="h-4 w-4" />
                  View & Download Holographic QR Pass
                </Button>
              </Card>
            )
          })}
        </div>
      )}

      {/* Ticket Pass Modal */}
      {activeTicketModal && (
        <TicketPass
          open={!!activeTicketModal}
          onOpenChange={() => setActiveTicketModal(null)}
          participant={activeTicketModal}
          qrDataUrl={qrUrl}
        />
      )}
    </div>
  )
}
