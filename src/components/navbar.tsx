"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useApp } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Sun,
  Moon,
  Ticket,
  Calendar,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  MessageSquare,
  MapPin,
  Clock,
  UserCheck,
  Building2,
  User,
  ArrowRight,
  LogOut,
  ChevronDown,
} from "lucide-react"

export function Navbar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const { theme, setTheme } = useTheme()
  const { currentUser, switchUserRole, getOrganizationParticipants, getParticipantRegistrations } = useApp()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isOrg = currentUser?.role === "organization"
  const isParticipant = currentUser?.role === "participant"

  const orgParticipantsCount = isOrg ? getOrganizationParticipants().length : 0
  const participantTicketsCount = isParticipant ? getParticipantRegistrations().length : 0

  const navLinks = [
    { name: "Explore Events", id: "events", icon: Sparkles },
    { name: "Tracks", id: "tracks", icon: Ticket },
    { name: "Register Now", id: "register", icon: Calendar },
    { name: "Schedule", id: "schedule", icon: Clock },
    { name: "Venue & FAQ", id: "venue-faq", icon: MapPin },
  ]

  const handleNavClick = (id: string) => {
    setActiveTab("main")
    setMobileMenuOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b shadow-lg py-3"
            : "bg-background/50 backdrop-blur-sm py-4 border-b border-border/40"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              setActiveTab("main")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary via-indigo-500 to-purple-600 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-extrabold text-lg leading-tight tracking-tight flex items-center gap-2">
                <span>TechPulse</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono font-bold">
                  2026
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">Event & Registration Platform</p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-muted/50 p-1.5 rounded-full border border-border/60 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                    activeTab === "main"
                      ? "hover:bg-background hover:text-primary text-muted-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.name}
                </button>
              )
            })}
          </nav>

          {/* Right Actions & Dual Login Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Active Account Pill / Switcher Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLoginModalOpen(true)}
              className="rounded-full gap-2 text-xs font-semibold border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all"
            >
              {isOrg ? (
                <>
                  <Building2 className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
                  <span className="hidden sm:inline font-bold text-indigo-600 dark:text-indigo-400">
                    Org: {currentUser.orgName || "Organization"}
                  </span>
                  <Badge variant="secondary" className="h-5 text-[10px] px-1.5 font-mono">
                    {orgParticipantsCount} Regs
                  </Badge>
                </>
              ) : (
                <>
                  <UserCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="hidden sm:inline font-semibold">
                    {currentUser?.name || "Participant"}
                  </span>
                  <Badge variant="secondary" className="h-5 text-[10px] px-1.5 font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {participantTicketsCount} Ticket
                  </Badge>
                </>
              )}
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </Button>

            {/* Portal Switcher Buttons */}
            {isOrg ? (
              <Button
                size="sm"
                onClick={() => setActiveTab("organization")}
                className={`rounded-full text-xs font-semibold px-3.5 gap-1.5 shadow-md ${
                  activeTab === "organization"
                    ? "bg-indigo-600 text-white ring-2 ring-indigo-400"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                }`}
              >
                <Building2 className="h-3.5 w-3.5" />
                Org Dashboard
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => setActiveTab("my-tickets")}
                className={`rounded-full text-xs font-semibold px-3.5 gap-1.5 shadow-md ${
                  activeTab === "my-tickets"
                    ? "bg-emerald-600 text-white ring-2 ring-emerald-400"
                    : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90"
                }`}
              >
                <Ticket className="h-3.5 w-3.5" />
                My Pass & Tickets
              </Button>
            )}

            {/* Theme Toggle Button */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
                title="Toggle Dark/Light Theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="flex items-center gap-3 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-accent text-foreground transition-colors text-left"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {link.name}
                  </button>
                )
              })}
            </nav>

            <div className="pt-3 border-t flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setLoginModalOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="w-full justify-start gap-2 rounded-xl"
              >
                <UserCheck className="h-4 w-4 text-primary" />
                Switch Account / Role Portal
              </Button>
              {isOrg ? (
                <Button
                  onClick={() => {
                    setActiveTab("organization")
                    setMobileMenuOpen(false)
                  }}
                  className="w-full justify-start gap-2 rounded-xl bg-indigo-600 text-white"
                >
                  <Building2 className="h-4 w-4" />
                  Organization Dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setActiveTab("my-tickets")
                    setMobileMenuOpen(false)
                  }}
                  className="w-full justify-start gap-2 rounded-xl bg-emerald-600 text-white"
                >
                  <Ticket className="h-4 w-4" />
                  View My Tickets Pass
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Dual Login / Account Switcher Modal */}
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent className="max-w-lg rounded-3xl p-6 bg-background/95 backdrop-blur-2xl border-primary/20">
          <DialogHeader className="mb-4">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Dual Access Login Portal
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Select your role to sign in. Organizations get dedicated participant lists & event creation.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Organization Accounts Box */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-indigo-600 dark:text-indigo-400">
                  <Building2 className="h-4 w-4" />
                  Log In as Organization (Event Host)
                </div>
                <Badge variant="outline" className="text-[10px] border-indigo-500/30 text-indigo-500">
                  Organizer Access
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Organizations can publish events, view real-time participant registrations, check-in attendees, and export CSV rosters.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    switchUserRole({
                      role: "organization",
                      id: "org-techglobal",
                      name: "TechGlobal Corp Rep",
                      email: "org@techglobal.com",
                      orgName: "TechGlobal Corp",
                    })
                    setLoginModalOpen(false)
                  }}
                  className={`rounded-xl justify-start gap-2 h-auto py-2.5 text-xs ${
                    currentUser?.id === "org-techglobal" ? "border-indigo-500 bg-indigo-500/15 font-bold" : ""
                  }`}
                >
                  <span className="text-base">⚡</span>
                  <div className="text-left">
                    <div className="font-semibold">TechGlobal Corp</div>
                    <div className="text-[10px] text-muted-foreground">org@techglobal.com</div>
                  </div>
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    switchUserRole({
                      role: "organization",
                      id: "org-devcorp",
                      name: "DevCorp Rep",
                      email: "info@devcorp.org",
                      orgName: "DevCorp Community",
                    })
                    setLoginModalOpen(false)
                  }}
                  className={`rounded-xl justify-start gap-2 h-auto py-2.5 text-xs ${
                    currentUser?.id === "org-devcorp" ? "border-indigo-500 bg-indigo-500/15 font-bold" : ""
                  }`}
                >
                  <span className="text-base">🚀</span>
                  <div className="text-left">
                    <div className="font-semibold">DevCorp Community</div>
                    <div className="text-[10px] text-muted-foreground">info@devcorp.org</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Participant Account Box */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-600 dark:text-emerald-400">
                  <User className="h-4 w-4" />
                  Log In as Participant (Attendee)
                </div>
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500">
                  Delegate Access
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Participants can register for events, view ticket badges with QR code, and manage their personal schedules.
              </p>

              <div className="flex flex-col gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    switchUserRole({
                      role: "participant",
                      id: "part-01",
                      name: "Jordan Vance",
                      email: "jordan.vance@tech.edu",
                    })
                    setLoginModalOpen(false)
                  }}
                  className={`rounded-xl justify-start gap-2 h-auto py-2.5 text-xs ${
                    currentUser?.role === "participant" ? "border-emerald-500 bg-emerald-500/15 font-bold" : ""
                  }`}
                >
                  <UserCheck className="h-4 w-4 text-emerald-500" />
                  <div className="text-left">
                    <div className="font-semibold">Jordan Vance (Delegate)</div>
                    <div className="text-[10px] text-muted-foreground">jordan.vance@tech.edu</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
