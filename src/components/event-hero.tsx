"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CountdownTimer } from "@/components/countdown-timer"
import { Sparkles, Calendar, MapPin, Users, Award, ShieldCheck, ArrowRight, Download, CheckCircle2 } from "lucide-react"

export function EventHero() {
  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background Orbs & Radial Gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-primary/20 via-indigo-500/10 to-purple-500/0 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <Badge variant="outline" className="py-1.5 px-4 rounded-full border-primary/30 bg-primary/10 text-primary text-xs font-semibold gap-2 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              Annual Global Tech Innovation Summit 2026
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-[1.15]">
              Empower Your Tech Future at{" "}
              <span className="bg-gradient-to-r from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                TechPulse 2026
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed text-pretty">
              Join top engineers, researchers, and innovators. Register today to receive your personal 
              <span className="text-foreground font-semibold"> Instant QR Digital Event Badge</span> for instant venue check-in and access to keynote tracks.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Instant QR Check-in
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Certificates & Badges
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                4 Keynote Tracks
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#register">
                <Button size="lg" className="rounded-full px-8 py-6 text-sm font-semibold shadow-xl shadow-primary/20 bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 gap-2 group">
                  Register Participant
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>

              <a href="#tracks">
                <Button size="lg" variant="outline" className="rounded-full px-7 py-6 text-sm font-semibold border-border hover:bg-muted gap-2">
                  Explore Tracks
                </Button>
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 w-full border-t border-border/60">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">1,200+</div>
                <div className="text-xs text-muted-foreground font-medium mt-0.5">Participants Registered</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">15+</div>
                <div className="text-xs text-muted-foreground font-medium mt-0.5">Keynote Speakers</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">4 Tracks</div>
                <div className="text-xs text-muted-foreground font-medium mt-0.5">AI, Web3, Cloud, UX</div>
              </div>
            </div>
          </div>

          {/* Right Hero Countdown Card */}
          <div className="lg:col-span-5">
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>
  )
}
