
'use server';
/**
 * @fileOverview A utility to fetch calendar events from a Google Sheet.
 *
 * This file defines the function for retrieving event and birthday data
 * from a Google Apps Script connected to a Google Sheet.
 */

import { z } from 'zod';

// Define Zod schemas for the data structures returned by Apps Script
const CalendarEventSchema = z.object({
  date: z.string(), // The date of the events (ISO 8601 format with time)
  events: z.array(z.string().optional()), // An array of event descriptions
  birthdays: z.array(z.string().optional()), // An array of birthday names
});

const CalendarEventsResponseSchema = z.array(CalendarEventSchema);

export type CalendarEventsResponse = z.infer<typeof CalendarEventsResponseSchema>;

// The main exported function that the frontend will call
export async function getCalendarEvents(): Promise<CalendarEventsResponse> {
  const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "TU_URL_DE_IMPLEMENTACIÓN_AQUÍ";

  if (!scriptUrl || scriptUrl === "TU_URL_DE_IMPLEMENTACIÓN_AQUÍ") {
    console.error("Apps Script URL is not configured.");
    // Return an empty array or throw an error if the URL is not set
    return [];
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ action: 'getCalendarEvents' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      // Validate data with Zod schema
      return CalendarEventsResponseSchema.parse(data.data);
    } else {
      throw new Error(data.message || 'Failed to fetch calendar events from Apps Script.');
    }
  } catch (error) {
    console.error('Error fetching from Google Apps Script:', error);
    // Depending on requirements, you might want to re-throw the error
    // or return an empty array to prevent the app from crashing.
    return [];
  }
}
