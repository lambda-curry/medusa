"use client"

import { DatePicker } from "@medusajs/ui"

export default function DatePickerDisabledDates() {
  // Disable weekends (Saturday and Sunday)
  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday = 0, Saturday = 6
  }

  return (
    <div className="w-[300px]">
      <DatePicker
        isDateUnavailable={isWeekend}
        aria-label="Select a weekday (weekends disabled)"
      />
    </div>
  )
}
