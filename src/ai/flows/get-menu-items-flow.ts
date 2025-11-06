
'use server';
/**
 * @fileOverview A utility to fetch weekly menu items from a Google Sheet.
 *
 * This file defines the function for retrieving menu data
 * from a Google Apps Script connected to a Google Sheet.
 */

import { z } from 'zod';

const MenuItemSchema = z.object({
  id: z.string(),
  day: z.string(),
  name: z.string(),
  description: z.string().optional(), // Description might not be in the sheet, making it optional.
  imageUrl: z.string(),
  price: z.string().optional(),
  type: z.enum(['Clásico', 'Dieta', 'Ejecutivo']),
  dataAiHint: z.string().optional(),
});

const MenuItemsResponseSchema = z.array(MenuItemSchema);

export type MenuItem = z.infer<typeof MenuItemSchema>;
export type MenuItemsResponse = z.infer<typeof MenuItemsResponseSchema>;

// The main exported function that the frontend will call
export async function getMenuItems(): Promise<MenuItemsResponse> {
  const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

  if (!scriptUrl || scriptUrl === "TU_URL_DE_IMPLEMENTACIÓN_AQUÍ") {
    console.error("Apps Script URL is not configured. Returning mock data.");
    // --- MOCK DATA ---
    return [
        { id: "M001", day: "Lunes", name: "Hamburguesa", description: "Crema de calabacín | Puré de papas | Ens. Mixta | Fresa- Inf. Cúrcuma | Gelatina con fruta", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(21).png?raw=true", price: "100 Bs.", type: "Clásico", dataAiHint: "3d burger" },
        { id: "M002", day: "Lunes", name: "Taco Vegano", description: "Crema de calabacín | Puré de papas | Ens. Mixta | Fresa- Inf. Cúrcuma | Gelatina con fruta", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(22).png?raw=true", price: "100 Bs.", type: "Dieta", dataAiHint: "3d taco" },
        { id: "M003", day: "Lunes", name: "Filet Mignon", description: "Crema de calabacín | Puré de papas | Ens. Mixta | Fresa- Inf. Cúrcuma | Gelatina con fruta", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(20).png?raw=true", price: "100 Bs.", type: "Ejecutivo", dataAiHint: "3d steak" },
        // Add other days if necessary for weekly view
        { id: "M004", day: "Martes", name: "Pizza", description: "Descripción para el martes...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(21).png?raw=true", price: "100 Bs.", type: "Clásico", dataAiHint: "3d pizza" },
        { id: "M005", day: "Martes", name: "Ensalada Griega", description: "Descripción para el martes...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(22).png?raw=true", price: "100 Bs.", type: "Dieta", dataAiHint: "3d salad" },
        { id: "M006", day: "Martes", name: "Salmón a la Parrilla", description: "Descripción para el martes...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(20).png?raw=true", price: "100 Bs.", type: "Ejecutivo", dataAiHint: "3d salmon" },
        { id: "M007", day: "Miércoles", name: "Pasta Carbonara", description: "Descripción para el miércoles...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(21).png?raw=true", price: "100 Bs.", type: "Clásico", dataAiHint: "3d pasta" },
        { id: "M008", day: "Jueves", name: "Pollo Asado", description: "Descripción para el jueves...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(21).png?raw=true", price: "100 Bs.", type: "Clásico", dataAiHint: "3d chicken" },
        { id: "M009", day: "Viernes", name: "Pescado Frito", description: "Descripción para el viernes...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(21).png?raw=true", price: "100 Bs.", type: "Clásico", dataAiHint: "3d fish" },

    ];
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ action: 'getMenuItems' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      // Validate data with Zod schema
      return MenuItemsResponseSchema.parse(data.data);
    } else {
      throw new Error(data.message || 'Failed to fetch menu items from Apps Script.');
    }
  } catch (error) {
    console.error('Error fetching menu items from Google Apps Script:', error);
    // Return mock data on error as well
    return [
      { id: "M001", day: "Lunes", name: "Hamburguesa", description: "Crema de calabacín | Puré de papas | Ens. Mixta | Fresa- Inf. Cúrcuma | Gelatina con fruta", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(21).png?raw=true", price: "100 Bs.", type: "Clásico", dataAiHint: "3d burger" },
      { id: "M002", day: "Lunes", name: "Taco Vegano", description: "Crema de calabacín | Puré de papas | Ens. Mixta | Fresa- Inf. Cúrcuma | Gelatina con fruta", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(22).png?raw=true", price: "100 Bs.", type: "Dieta", dataAiHint: "3d taco" },
      { id: "M003", day: "Lunes", name: "Filet Mignon", description: "Crema de calabacín | Puré de papas | Ens. Mixta | Fresa- Inf. Cúrcuma | Gelatina con fruta", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(20).png?raw=true", price: "100 Bs.", type: "Ejecutivo", dataAiHint: "3d steak" },
      { id: "M004", day: "Martes", name: "Pizza", description: "Descripción para el martes...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(21).png?raw=true", price: "100 Bs.", type: "Clásico", dataAiHint: "3d pizza" },
      { id: "M005", day: "Martes", name: "Ensalada Griega", description: "Descripción para el martes...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(22).png?raw=true", price: "100 Bs.", type: "Dieta", dataAiHint: "3d salad" },
      { id: "M006", day: "Martes", name: "Salmón a la Parrilla", description: "Descripción para el martes...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(20).png?raw=true", price: "100 Bs.", type: "Ejecutivo", dataAiHint: "3d salmon" },
      { id: "M007", day: "Miércoles", name: "Pasta Carbonara", description: "Descripción para el miércoles...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(21).png?raw=true", price: "100 Bs.", type: "Clásico", dataAiHint: "3d pasta" },
      { id: "M008", day: "Jueves", name: "Pollo Asado", description: "Descripción para el jueves...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(21).png?raw=true", price: "100 Bs.", type: "Clásico", dataAiHint: "3d chicken" },
      { id: "M009", day: "Viernes", name: "Pescado Frito", description: "Descripción para el viernes...", imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(21).png?raw=true", price: "100 Bs.", type: "Clásico", dataAiHint: "3d fish" },
    ];
  }
}
