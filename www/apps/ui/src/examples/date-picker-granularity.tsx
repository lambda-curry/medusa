"use client"

import { DatePicker } from "@medusajs/ui"

export default function DatePickerGranularity() {
  const defaultDate = new Date()

  return (
    <div className="space-y-6 max-w-md">
      <div className="space-y-2">
        <div className="text-ui-fg-base text-ui-body-small font-medium">Date Only</div>
        <DatePicker
          granularity="day"
          defaultValue={defaultDate}
          aria-label="Select day only"
        />
      </div>
      
      <div className="space-y-2">
        <div className="text-ui-fg-base text-ui-body-small font-medium">Date and Time with Hour Precision</div>
        <DatePicker
          granularity="hour"
          defaultValue={defaultDate}
          aria-label="Select date and hour"
        />
      </div>
      
      <div className="space-y-2">
        <div className="text-ui-fg-base text-ui-body-small font-medium">Date and Time with Minute Precision</div>
        <DatePicker
          granularity="minute"
          defaultValue={defaultDate}
          aria-label="Select date and time with minutes"
        />
      </div>
      
      <div className="space-y-2">
        <div className="text-ui-fg-base text-ui-body-small font-medium">Date and Time with Second Precision</div>
        <DatePicker
          granularity="second"
          defaultValue={defaultDate}
          aria-label="Select date and time with seconds"
        />
      </div>
    </div>
  )
}
