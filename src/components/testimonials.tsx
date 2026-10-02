"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Star, ThumbsUp, MessageSquarePlus, Quote, Sparkles } from "lucide-react"
import { toast } from "sonner"

const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    name: "Aarav Sharma",
    college: "IIT Bombay",
    comment: "The registration process was seamless! Got my instant QR Ticket Pass immediately and the AI track keynotes were world-class.",
    rating: 5,
    likes: 24,
  },
  {
    id: "rev-2",
    name: "Sophia Martinez",
    college: "UC Berkeley",
    comment: "Awesome organization dashboard! As an event host, downloading the participant CSV roster and check-in scanner made gate entry super smooth.",
    rating: 5,
    likes: 18,
  },
  {
    id: "rev-3",
    name: "Rohan Gupta",
    college: "BITS Pilani",
    comment: "Loved the hands-on Cloud Native build-a-thon! Great mentorship and networking opportunities with tech leaders.",
    rating: 5,
    likes: 15,
  }
]

export function Testimonials() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    name: "",
    college: "",
    comment: "",
    rating: 5,
  })

  const handleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    )
    toast.success("Feedback upvoted!")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.college || !form.comment) {
      toast.error("Please complete all required fields")
      return
    }

    setSubmitting(true)
    const newRev = {
      id: `rev-${Date.now()}`,
      name: form.name,
      college: form.college,
      comment: form.comment,
      rating: form.rating,
      likes: 0,
    }

    setReviews([newRev, ...reviews])
    toast.success("Thank you! Your feedback has been published.")
    setForm({ name: "", college: "", comment: "", rating: 5 })
    setModalOpen(false)
    setSubmitting(false)
  }

  return (
    <section id="reviews" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/30 text-primary bg-primary/10 mb-2">
              Community Voices
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Attendee Feedback & Reviews
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Read real thoughts from past attendees or post your own experience.
            </p>
          </div>

          <Button
            onClick={() => setModalOpen(true)}
            className="rounded-full px-6 gap-2 font-semibold shadow-md bg-primary hover:bg-primary/90"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Share Your Experience
          </Button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((item) => (
            <Card
              key={item.id}
              className="relative p-6 bg-card border-border/60 hover:border-primary/40 transition-all rounded-3xl flex flex-col justify-between shadow-sm group"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < item.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted border"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-foreground italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-foreground">{item.name}</div>
                  <div className="text-[11px] text-muted-foreground">{item.college}</div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(item.id)}
                  className="rounded-full gap-1.5 text-xs text-muted-foreground hover:text-primary"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{item.likes}</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Share Review Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="rounded-3xl max-w-md bg-background/95 backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <Sparkles className="h-5 w-5 text-primary" />
              Share Your Event Experience
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="c-name" className="text-xs font-semibold">Your Name *</Label>
              <Input
                id="c-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Diya Sharma"
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-college" className="text-xs font-semibold">College / Organization *</Label>
              <Input
                id="c-college"
                value={form.college}
                onChange={(e) => setForm({ ...form, college: e.target.value })}
                placeholder="e.g. Stanford University"
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Rating (1 to 5 Stars)</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setForm({ ...form, rating: star })}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= form.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-comment" className="text-xs font-semibold">Your Feedback / Review *</Label>
              <Textarea
                id="c-comment"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Tell us what you liked about the registration or sessions..."
                required
                className="rounded-xl min-h-[90px]"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="rounded-xl font-semibold bg-primary">
                {submitting ? "Posting..." : "Post Review"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
