"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Clock, MapPin, User, Calendar, Bookmark, BookmarkCheck } from "lucide-react"
import { toast } from "sonner"

const SCHEDULE_DATA = [
  {
    day: "day1",
    time: "09:00 AM - 10:00 AM",
    title: "Opening Ceremony & Keynote Speech",
    speaker: "Dr. Aris Thorne (Future Tech Labs)",
    room: "Main Auditorium A",
    track: "Keynote",
    description: "Welcome address, summit roadmap, and key trends shaping AI, Web3, and Cloud computing.",
  },
  {
    day: "day1",
    time: "10:30 AM - 12:30 PM",
    title: "Hands-on Generative AI & Fine-Tuning Workshop",
    speaker: "Dr. Elena Vance (AI Lead)",
    room: "Lab 301 - Innovation Wing",
    track: "AI & Machine Learning",
    description: "Build, fine-tune, and evaluate open-weights LLMs using PyTorch and HuggingFace.",
  },
  {
    day: "day1",
    time: "01:30 PM - 03:30 PM",
    title: "Full-Stack Serverless Architecture with Next.js 15",
    speaker: "Marcus Brody (Principal Architect)",
    room: "Tech Hall B",
    track: "Full Stack & Cloud",
    description: "Design reactive scalable web platforms with Server Actions, Tailwind CSS v4, and MongoDB.",
  },
  {
    day: "day2",
    time: "09:30 AM - 11:30 AM",
    title: "Zero-Trust Security & Web3 Penetration Testing",
    speaker: "Sarah Jenkins (Security Director)",
    room: "Cyber Lab 102",
    track: "Cybersecurity & Web3",
    description: "Interactive live exploit demonstration, smart contract security auditing, and zero-knowledge proofs.",
  },
  {
    day: "day2",
    time: "12:00 PM - 02:00 PM",
    title: "Designing Design Systems for High-Growth Apps",
    speaker: "Alex Rivera (Design Fellow)",
    room: "Creative Studio C",
    track: "UI/UX & Product Design",
    description: "Crafting unified color tokens, accessible micro-interactions, and glassmorphic user interfaces.",
  },
  {
    day: "day2",
    time: "03:00 PM - 05:00 PM",
    title: "Hackathon Showcase & Grand Prize Ceremony",
    speaker: "All Summit Mentors",
    room: "Main Auditorium A",
    track: "Keynote",
    description: "Live pitch presentations from top project teams followed by award ceremony and closing networking.",
  },
]

export function ScheduleSection() {
  const [bookmarked, setBookmarked] = useState<string[]>([])

  const toggleBookmark = (title: string) => {
    if (bookmarked.includes(title)) {
      setBookmarked(bookmarked.filter((t) => t !== title))
      toast.info(`Removed "${title}" from bookmarked sessions`)
    } else {
      setBookmarked([...bookmarked, title])
      toast.success(`Bookmarked "${title}" session!`)
    }
  }

  return (
    <section id="schedule" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/30 text-primary bg-primary/10">
            Event Agenda
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Summit Schedule & Timeline
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Explore 2 action-packed days of keynote talks, hands-on workshops, and hackathon showcases.
          </p>
        </div>

        <Tabs defaultValue="day1" className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="p-1.5 bg-muted/60 rounded-full border border-border/60">
              <TabsTrigger value="day1" className="rounded-full px-6 py-2 text-xs font-semibold">
                Day 1 (Keynotes & AI/Cloud)
              </TabsTrigger>
              <TabsTrigger value="day2" className="rounded-full px-6 py-2 text-xs font-semibold">
                Day 2 (CyberSec & Hackathon)
              </TabsTrigger>
            </TabsList>
          </div>

          {["day1", "day2"].map((dayKey) => (
            <TabsContent key={dayKey} value={dayKey} className="space-y-4">
              {SCHEDULE_DATA.filter((s) => s.day === dayKey).map((item, idx) => {
                const isBookmarked = bookmarked.includes(item.title)
                return (
                  <Card
                    key={idx}
                    className="p-6 bg-card border-border/60 hover:border-primary/40 transition-all rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                        #{idx + 1}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                            {item.track}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3 text-primary" /> {item.time}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-foreground pt-1">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <User className="h-3.5 w-3.5 text-primary" /> {item.speaker}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-indigo-500" /> {item.room}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleBookmark(item.title)}
                      className={`rounded-full shrink-0 ${isBookmarked ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
                      title={isBookmarked ? "Remove Bookmark" : "Bookmark Session"}
                    >
                      {isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                    </Button>
                  </Card>
                )
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
