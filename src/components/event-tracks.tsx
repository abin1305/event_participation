"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Cpu, Globe, Shield, Palette, Users, ArrowUpRight, CheckCircle2 } from "lucide-react"

export const TRACKS = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Deep dive into Generative AI, LLM fine-tuning, Neural Networks, and PySpark pipelines.",
    icon: Cpu,
    color: "from-blue-500 to-indigo-600",
    badge: "Hot Track",
    seats: "35 Seats Left",
    speaker: "Dr. Elena Vance (AI Lead)",
  },
  {
    id: "fullstack-cloud",
    title: "Full Stack & Cloud Native",
    description: "Build high-scale React Next.js apps, microservices, Docker, and Kubernetes deployment.",
    icon: Globe,
    color: "from-indigo-500 to-purple-600",
    badge: "Popular",
    seats: "42 Seats Left",
    speaker: "Marcus Brody (Principal Architect)",
  },
  {
    id: "cyber-web3",
    title: "Cybersecurity & Web3",
    description: "Ethical hacking, zero-trust security architecture, smart contracts, and cryptography.",
    icon: Shield,
    color: "from-emerald-500 to-teal-600",
    badge: "Advanced",
    seats: "18 Seats Left",
    speaker: "Sarah Jenkins (Security Director)",
  },
  {
    id: "uiux-design",
    title: "UI/UX & Product Design",
    description: "Design systems, interactive motion UI, user research, accessibility, and glassmorphism.",
    icon: Palette,
    color: "from-rose-500 to-pink-600",
    badge: "Creative",
    seats: "29 Seats Left",
    speaker: "Alex Rivera (Design Fellow)",
  },
]

export function EventTracks({ onSelectTrack }: { onSelectTrack?: (trackTitle: string) => void }) {
  return (
    <section id="tracks" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/30 text-primary bg-primary/10">
            Specialized Tracks
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Choose Your Workshop Track
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Every registered attendee gets access to hands-on workshops, keynote sessions, and networking break-out rooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRACKS.map((track) => {
            const Icon = track.icon
            return (
              <Card
                key={track.id}
                className="relative overflow-hidden p-6 bg-card border-border/60 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group"
              >
                {/* Top Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${track.color}`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${track.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider">
                      {track.badge}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{track.speaker}</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{track.seats}</span>
                  </div>

                  <a href="#register" onClick={() => onSelectTrack?.(track.title)}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full rounded-xl text-xs font-semibold justify-between group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    >
                      Select & Register
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
