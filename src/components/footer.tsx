import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-muted/40 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-lg">TechPulse 2026</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The premier annual innovation summit bringing engineers, creators, and researchers together.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="#events" className="hover:text-primary transition-colors">Explore Events</a></li>
              <li><a href="#tracks" className="hover:text-primary transition-colors">Workshop Tracks</a></li>
              <li><a href="#register" className="hover:text-primary transition-colors">Registration Form</a></li>
              <li><a href="#schedule" className="hover:text-primary transition-colors">Summit Agenda</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground mb-3">Delegate Tools</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="#reviews" className="hover:text-primary transition-colors">Community Reviews</a></li>
              <li><a href="#venue-faq" className="hover:text-primary transition-colors">Help Center & FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground mb-3">Event Support</h4>
            <p className="text-xs text-muted-foreground">
              Need assistance with your registration or ticket QR? Reach out at:
            </p>
            <p className="text-xs font-semibold text-foreground mt-2">support@techpulse2026.org</p>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} TechPulse Summit. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
