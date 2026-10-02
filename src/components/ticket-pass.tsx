"use client"

import { useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Download, Printer, CheckCircle2, Share2, Copy, MapPin, Calendar, QrCode } from "lucide-react"

interface TicketPassProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  participant: {
    id: string
    ticketId: string
    name: string
    email: string
    phone: string
    college: string
    department: string
    year: string
    track: string
    eventEndAt?: string | null
  } | null
  qrDataUrl: string | null
}

export function TicketPass({ open, onOpenChange, participant, qrDataUrl }: TicketPassProps) {
  const ticketRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  if (!participant) return null

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(`Ticket ID: ${participant.ticketId} | ${participant.name} | ${participant.college}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    if (!qrDataUrl) return
    const link = document.createElement("a")
    link.href = qrDataUrl
    link.download = `${participant.name.replace(/\s+/g, "_")}_TechPulse_Ticket.png`
    link.click()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border-primary/20 bg-background/95 backdrop-blur-2xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            Official Event Ticket Pass
          </DialogTitle>
        </DialogHeader>

        {/* Printable & Downloadable Holographic Ticket Card */}
        <div className="p-6 pt-0 space-y-5">
          <div
            ref={ticketRef}
            className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-500/30 group"
          >
            {/* Background Holographic Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-indigo-500/30 pb-4 mb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">TechPulse Summit 2026</div>
                <div className="text-[10px] text-slate-400">Official Delegate Pass</div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-mono">
                CONFIRMED
              </Badge>
            </div>

            {/* Main Details & QR Code Grid */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-7 space-y-2">
                <div>
                  <div className="text-[10px] uppercase text-indigo-300 tracking-wider font-semibold">Attendee Name</div>
                  <div className="text-lg font-extrabold text-white tracking-tight leading-snug">{participant.name}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase text-indigo-300 tracking-wider font-semibold">Institution / College</div>
                  <div className="text-xs font-medium text-slate-200 line-clamp-1">{participant.college}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <div className="text-[10px] text-slate-400">Dept</div>
                    <div className="text-xs font-semibold text-slate-100">{participant.department}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Track</div>
                    <div className="text-xs font-semibold text-indigo-300 truncate">{participant.track || "General"}</div>
                  </div>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="col-span-5 flex flex-col items-center justify-center p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Registration QR Code"
                    className="w-28 h-28 rounded-lg bg-white p-1 shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-lg bg-slate-800 flex items-center justify-center">
                    <QrCode className="h-10 w-10 text-slate-500 animate-spin" />
                  </div>
                )}
                <div className="text-[10px] font-mono font-bold mt-1 text-indigo-300 tracking-widest">
                  {participant.ticketId}
                </div>
              </div>
            </div>

            {/* Footer Details */}
            <div className="mt-4 pt-3 border-t border-indigo-500/30 flex items-center justify-between text-[10px] text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-indigo-400" /> Grand Tech Hall, Gate A
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="h-3 w-3 text-indigo-400" /> 2026 Summit
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleDownload} className="rounded-xl gap-2 font-semibold shadow-md bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4" />
              Download Ticket
            </Button>

            <Button onClick={handleCopyTicket} variant="outline" className="rounded-xl gap-2 font-semibold">
              {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Details"}
            </Button>
          </div>

          <p className="text-[11px] text-center text-muted-foreground">
            Please display this QR code or Ticket ID ({participant.ticketId}) at the entrance gate for fast venue check-in.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
