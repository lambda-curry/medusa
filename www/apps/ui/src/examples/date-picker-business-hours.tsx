"use client"

import { DatePicker } from "@medusajs/ui"

export default function DatePickerBusinessHours() {
  return (
    <div className="w-[300px]">
      <DatePicker
        granularity="hour"
        defaultValue={new Date()}
        aria-label="Select date and hour for business scheduling"
        isDateUnavailable={(date) => {
          // Disable weekends and holidays
          const day = date.getDay()
          const isWeekend = day === 0 || day === 6
          
          // Example: Disable specific holiday (Christmas)
          const isChristmas = date.getMonth() === 11 && date.getDate() === 25
          
          return isWeekend || isChristmas
        }}
      />
    </div>
  )
}
