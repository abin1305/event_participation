"use client"

import useSWR from "swr"
import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle, Sparkles } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function CountdownTimer({ onExpired }: { onExpired?: () => void }) {
  const { data } = useSWR<{ endAt: string | null }>("/api/config", fetcher, { refreshInterval: 5_000 })
  const [expired, setExpired] = useState(false)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const endAt = data?.endAt ? new Date(data.endAt) : null

  const remaining = useMemo(() => {
    if (!endAt) return null
    const diff = endAt.getTime() - now
    if (diff <= 0) return 0
    return diff
  }, [endAt, now])

  useEffect(() => {
    if (remaining === 0 && !expired) {
      setExpired(true)
      onExpired?.()
    }
  }, [remaining, expired, onExpired])

  const parts = useMemo(() => {
    if (remaining === null) return null
    const total = remaining
    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((total % (1000 * 60)) / 1000)
    return { days, hours, minutes, seconds }
  }, [remaining])

  return (
    <Card className="relative overflow-hidden p-6 sm:p-8 bg-card/60 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl group">
      {/* Background ambient glow */}
      <div className="absolute -right-20 -top-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all" />
      <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-5">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="py-1 px-3 bg-primary/10 text-primary border-primary/20 gap-1.5 font-medium rounded-full">
            <Clock className="h-3.5 w-3.5 animate-spin-slow text-primary" />
            Registration Deadline
          </Badge>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Event Registration Countdown</h3>

        {!endAt ? (
          <div className="py-6 text-muted-foreground flex flex-col items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary/40 animate-bounce" />
            <p>Registration timeline is currently open.</p>
          </div>
        ) : remaining === 0 ? (
          <div className="py-6 flex flex-col items-center gap-2 text-destructive">
            <AlertCircle className="h-10 w-10 animate-bounce" />
            <p className="font-semibold text-lg">Registration is Official Closed!</p>
            <p className="text-xs text-muted-foreground">Contact support for late entry waitlist.</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full my-2">
            <TimeBox label="Days" value={parts!.days} />
            <TimeBox label="Hours" value={parts!.hours} />
            <TimeBox label="Mins" value={parts!.minutes} />
            <TimeBox label="Secs" value={parts!.seconds} highlight />
          </div>
        )}

        <div className="w-full pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
          <span>Venue: Tech Innovation Hall</span>
          <span>{endAt ? `Closes: ${endAt.toLocaleDateString()}` : "Seats Filling Fast"}</span>
        </div>
      </div>
    </Card>
  )
}

function TimeBox({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all ${
      highlight
        ? "bg-primary/10 border-primary/40 text-primary shadow-inner"
        : "bg-background/80 border-border/60"
    }`}>
      <div className="text-2xl sm:text-4xl font-extrabold tracking-tight font-mono">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  )
}
