"use client"

import { DatePicker } from "@medusajs/ui"

export default function DatePickerMinMax() {
  const today = new Date()
  const maxDate = new Date()
  maxDate.setDate(today.getDate() + 30) // 30 days from today

  return (
    <div className="w-[300px]">
      <DatePicker
        minValue={today}
        maxValue={maxDate}
        aria-label="Select a date within the next 30 days"
      />
    </div>
  )
}
