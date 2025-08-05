"use client"

import { DatePicker } from "@medusajs/ui"
import { useState } from "react"

export default function DatePickerControlled() {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <div className="space-y-4 w-[300px]">
      <DatePicker
        value={date}
        onChange={setDate}
        aria-label="Select a date"
      />
      <div className="text-ui-fg-subtle text-ui-body-small">
        Selected date: {date ? date.toLocaleDateString() : "None"}
      </div>
    </div>
  )
}
