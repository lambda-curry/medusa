"use client"

import { DatePicker, Button, Label } from "@medusajs/ui"
import { useState } from "react"

export default function DatePickerForm() {
  const [eventDate, setEventDate] = useState<Date | null>(null)
  const [reminderDate, setReminderDate] = useState<Date | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Here you would typically send data to your API
    setTimeout(() => setSubmitted(false), 5000)
  }

  const isFormValid = eventDate && reminderDate

  return (
    <div className="p-6 max-w-md border border-ui-border-base rounded-lg bg-ui-bg-base">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-ui-fg-base font-medium">Schedule Event</h3>
          <p className="text-ui-fg-subtle text-ui-body-small">
            Set up your event and reminder dates
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-date">Event Date & Time</Label>
            <DatePicker
              id="event-date"
              value={eventDate}
              onChange={setEventDate}
              minValue={new Date()}
              aria-label="Select event date and time"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminder-date">Reminder Date</Label>
            <DatePicker
              id="reminder-date"
              value={reminderDate}
              onChange={setReminderDate}
              minValue={new Date()}
              maxValue={eventDate || undefined}
              aria-label="Select reminder date"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={!isFormValid || submitted}
          className="w-full"
        >
          {submitted ? "Event Scheduled!" : "Schedule Event"}
        </Button>
      </form>

      {submitted && (
        <div className="mt-4 text-ui-fg-subtle text-ui-body-small">
          Event scheduled for {eventDate?.toLocaleString()} with a reminder on {reminderDate?.toLocaleDateString()}.
        </div>
      )}
    </div>
  )
}
