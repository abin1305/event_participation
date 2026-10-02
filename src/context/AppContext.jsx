import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ORGANIZATIONS, INITIAL_EVENTS, INITIAL_REGISTRATIONS } from '../data/initialData';
import { toast } from 'sonner';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Load state from localStorage or initial fallback
  const [organizations, setOrganizations] = useState(() => {
    const saved = localStorage.getItem('techpulse_orgs');
    return saved ? JSON.parse(saved) : INITIAL_ORGANIZATIONS;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('techpulse_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('techpulse_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  // Current user state (Default to Participant or Guest)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('techpulse_user');
    return saved
      ? JSON.parse(saved)
      : {
          role: 'participant',
          id: 'part-01',
          name: 'Jordan Vance',
          email: 'jordan.vance@tech.edu',
        };
  });

  // Selected active event for landing page view/registration
  const [selectedEventId, setSelectedEventId] = useState(() => {
    return events.length > 0 ? events[0].id : null;
  });

  // Persist to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('techpulse_orgs', JSON.stringify(organizations));
  }, [organizations]);

  useEffect(() => {
    localStorage.setItem('techpulse_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('techpulse_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('techpulse_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Switch Role / Login handlers
  const switchUserRole = (userObj) => {
    setCurrentUser(userObj);
    if (userObj.role === 'organization') {
      toast.success(`Switched to Organization Portal: ${userObj.orgName}`);
    } else if (userObj.role === 'participant') {
      toast.success(`Switched to Participant Portal: ${userObj.name}`);
    } else {
      toast.info('Viewing as Guest');
    }
  };

  // Add new Event by an Organization
  const addEvent = (eventData) => {
    if (currentUser.role !== 'organization') {
      toast.error('Only organizations can conduct & create events.');
      return false;
    }

    const newEvent = {
      id: `evt-${Date.now().toString().slice(-4)}`,
      title: eventData.title,
      organizationId: currentUser.id,
      organizationName: currentUser.orgName || 'Organization Admin',
      date: eventData.date,
      time: eventData.time || '09:00 AM - 05:00 PM',
      venue: eventData.venue,
      city: eventData.city || 'Tech Hub',
      track: eventData.track || 'AI & Machine Learning',
      capacity: parseInt(eventData.capacity) || 200,
      price: eventData.price || 'Free',
      status: 'Upcoming',
      description: eventData.description || 'Join us for this exciting technical event!',
      banner: eventData.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80'
    };

    setEvents((prev) => [newEvent, ...prev]);
    toast.success(`Event "${newEvent.title}" published successfully!`);
    return newEvent;
  };

  // Register Participant for an Event
  const registerParticipant = (formData, eventId) => {
    const targetEvent = events.find((e) => e.id === (eventId || selectedEventId)) || events[0];
    const ticketId = `TICK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRegistration = {
      id: `reg-${Date.now().toString().slice(-4)}`,
      ticketId,
      eventId: targetEvent.id,
      eventTitle: targetEvent.title,
      organizationId: targetEvent.organizationId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      college: formData.college,
      department: formData.department || 'Computer Science',
      year: formData.year || '3rd Year',
      track: formData.track || targetEvent.track,
      checkedIn: false,
      registeredAt: new Date().toISOString()
    };

    setRegistrations((prev) => [newRegistration, ...prev]);
    return { registration: newRegistration, event: targetEvent };
  };

  // Check-In toggle for Organization
  const toggleCheckIn = (registrationId) => {
    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.id === registrationId) {
          const nextStatus = !reg.checkedIn;
          toast.success(
            nextStatus
              ? `Checked In: ${reg.name} (${reg.ticketId})`
              : `Marked Unchecked: ${reg.name}`
          );
          return { ...reg, checkedIn: nextStatus };
        }
        return reg;
      })
    );
  };

  // Delete registration (Organization feature)
  const cancelRegistration = (registrationId) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== registrationId));
    toast.info('Registration removed from event roster.');
  };

  // Get data scoped strictly to current organization
  const getOrganizationEvents = () => {
    if (currentUser.role !== 'organization') return [];
    return events.filter((e) => e.organizationId === currentUser.id);
  };

  const getOrganizationParticipants = () => {
    if (currentUser.role !== 'organization') return [];
    return registrations.filter((r) => r.organizationId === currentUser.id);
  };

  // Get data scoped to current participant
  const getParticipantRegistrations = () => {
    if (currentUser.role !== 'participant') return [];
    return registrations.filter((r) => r.email.toLowerCase() === currentUser.email.toLowerCase());
  };

  // Export CSV for an organization's event
  const exportCSV = (eventId) => {
    let orgRegs = getOrganizationParticipants();
    if (eventId && eventId !== 'all') {
      orgRegs = orgRegs.filter((r) => r.eventId === eventId);
    }

    if (orgRegs.length === 0) {
      toast.error('No participants found to export.');
      return;
    }

    const headers = ['Ticket ID', 'Name', 'Email', 'Phone', 'College', 'Department', 'Year', 'Track', 'Event Title', 'Check-In Status', 'Registration Date'];
    const rows = orgRegs.map((r) => [
      `"${r.ticketId}"`,
      `"${r.name}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.college}"`,
      `"${r.department}"`,
      `"${r.year}"`,
      `"${r.track}"`,
      `"${r.eventTitle}"`,
      `"${r.checkedIn ? 'Checked In' : 'Pending'}"`,
      `"${new Date(r.registeredAt).toLocaleString()}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Participant_Roster_${currentUser.orgName || 'Org'}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${orgRegs.length} participant records to CSV!`);
  };

  return (
    <AppContext.Provider
      value={{
        organizations,
        events,
        registrations,
        currentUser,
        selectedEventId,
        setSelectedEventId,
        switchUserRole,
        addEvent,
        registerParticipant,
        toggleCheckIn,
        cancelRegistration,
        getOrganizationEvents,
        getOrganizationParticipants,
        getParticipantRegistrations,
        exportCSV,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
