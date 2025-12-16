
'use server';
/**
 * @fileOverview A utility to fetch team members from a Google Sheet.
 * This file defines the function for retrieving employee data
 * from a dedicated Google Apps Script connected to a Google Sheet named "TeamMembers".
 */

import { z } from 'zod';

// Define a robust Zod schema for the team member data structure.
// This schema matches the required columns from the Google Sheet and handles potential data inconsistencies.
const TeamMemberSchema = z.object({
  Nombre: z.string().default('No disponible'),
  Correo: z.string().email().optional().or(z.literal('')),
  Cargo: z.string().default('No especificado'),
  Area: z.string().default('General'),
  Tipo: z.enum(['Personal', 'Líderes']).default('Personal'),
  UrlContacto: z.string().url().optional().or(z.literal('')),
  Descripcion: z.string().default('Sin descripción.'),
  ImageUrl: z.string().url().optional().or(z.literal('')),
});

// Define the schema for the entire response array
const TeamMembersResponseSchema = z.array(TeamMemberSchema);

export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type TeamMembersResponse = z.infer<typeof TeamMembersResponseSchema>;

/**
 * Transforms a Google Drive viewer URL into a direct image link.
 * @param url The original Google Drive URL.
 * @returns A direct image link URL or the original URL if it's not a valid Drive link.
 */
function transformGoogleDriveUrl(url: string): string {
  if (!url) return '';
  const regex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);

  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return url;
}


/**
 * The main exported function that the frontend will call.
 * It fetches data from the dedicated team Apps Script.
 */
export async function getTeamMembers(): Promise<TeamMembersResponse> {
  const scriptUrl = process.env.NEXT_PUBLIC_TEAM_APPS_SCRIPT_URL || "TU_URL_DE_APPS_SCRIPT_PARA_EQUIPO_AQUÍ";

  // Check if the URL is configured in the environment variables
  if (!scriptUrl || scriptUrl === "TU_URL_DE_APPS_SCRIPT_PARA_EQUIPO_AQUÍ") {
    console.error("Team Apps Script URL is not configured in .env file.");
    // Return an empty array if the URL is not set to prevent app crashes
    return [];
  }

  try {
    // Perform a simple GET request as required by Google Apps Script web apps for data retrieval
    const response = await fetch(scriptUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Important for Apps Script redirects
      redirect: 'follow'
    });

    // Check for network or server errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // The new script returns the array directly. Check if it's an array.
    if (data && Array.isArray(data)) {
      // Filter out any potential empty or incomplete rows before validating
      const cleanData = data.filter((row: any) => row && typeof row === 'object' && row['Nombre'] && row['Nombre'].trim() !== '');
      
      const validatedData: TeamMember[] = [];
      for (const row of cleanData) {
        const parsed = TeamMemberSchema.safeParse(row);
        if (parsed.success) {
          // Transform Google Drive URL if present
          if (parsed.data.ImageUrl) {
            parsed.data.ImageUrl = transformGoogleDriveUrl(parsed.data.ImageUrl);
          }
          validatedData.push(parsed.data);
        } else {
          // Log the error for the specific row but don't stop the process
          console.warn('Skipping invalid team member row:', parsed.error.format());
        }
      }
      return validatedData;
    } else {
      // Throw an error if the script reported a failure or returned unexpected data
      throw new Error(data.message || 'Failed to fetch or parse team members from Apps Script. Expected an array.');
    }
  } catch (error) {
    console.error('Error fetching or parsing team member data:', error);
    // Return an empty array on any failure to ensure the app remains stable
    return [];
  }
}
