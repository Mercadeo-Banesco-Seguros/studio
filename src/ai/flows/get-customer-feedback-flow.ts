
'use server';
/**
 * @fileOverview A utility to fetch customer feedback from a Google Sheet.
 * This file defines the function for retrieving customer feedback data
 * from a dedicated Google Apps Script connected to a Google Sheet named "DATA".
 */

import { z } from 'zod';

// Define a robust Zod schema for the feedback data structure.
// This schema matches the required columns and handles potential data inconsistencies.
const CustomerFeedbackSchema = z.object({
  'NOMBRE TITULAR': z.string().default('Anónimo'),
  'LINEA DE NEGOCIO': z.string().optional(),
  'CALIFICACIÓN': z.coerce.number(), // Coerce ensures string numbers are converted
  'COMENTARIO': z.string().default('Sin comentario.'),
  'CATEGORÍA': z.enum(['PROMOTOR', 'DETRACTOR', 'NEUTRO']),
});

// Define the schema for the entire response array
const CustomerFeedbackResponseSchema = z.array(CustomerFeedbackSchema);

export type CustomerFeedback = z.infer<typeof CustomerFeedbackSchema>;
export type CustomerFeedbackResponse = z.infer<typeof CustomerFeedbackResponseSchema>;

/**
 * The main exported function that the frontend will call.
 * It fetches data from the dedicated feedback Apps Script.
 */
export async function getCustomerFeedback(): Promise<CustomerFeedbackResponse> {
  const scriptUrl = process.env.NEXT_PUBLIC_FEEDBACK_APPS_SCRIPT_URL || "TU_NUEVA_URL_DE_IMPLEMENTACIÓN_AQUÍ";

  // Check if the URL is configured in the environment variables
  if (!scriptUrl || scriptUrl === "TU_NUEVA_URL_DE_IMPLEMENTACIÓN_AQUÍ") {
    console.error("Feedback Apps Script URL is not configured in .env file.");
    // Return an empty array if the URL is not set to prevent app crashes
    return [];
  }

  try {
    // Perform a simple POST request as required by Google Apps Script web apps
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      // An empty body is sufficient for this simple script
      body: '',
    });

    // Check for network or server errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if the script execution was successful
    if (data.success) {
      // Filter out any potential empty or incomplete rows before parsing
      const cleanData = data.data.filter((row: any) => 
        row['NOMBRE TITULAR'] && row['COMENTARIO'] && row['CATEGORÍA']
      );
      // Validate the cleaned data with our Zod schema
      return CustomerFeedbackResponseSchema.parse(cleanData);
    } else {
      // Throw an error if the script reported a failure
      throw new Error(data.message || 'Failed to fetch customer feedback from Apps Script.');
    }
  } catch (error) {
    console.error('Error fetching or parsing customer feedback:', error);
    // Return an empty array on any failure to ensure the app remains stable
    return [];
  }
}
