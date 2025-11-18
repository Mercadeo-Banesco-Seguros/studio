
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
        { id: "M1", day: "Lunes", name: "Escalopina de pollo en su jugo", description: "Crema de res | Pasta corta en salsa de tocineta | Ens. Griega | Fresa | Gelatina", imageUrl: "https://www.comedera.com/wp-content/uploads/2022/04/escalopines-de-pollo-shutterstock_1804245793.jpg", price: "Bs100", type: "Clásico" },
        { id: "M2", day: "Lunes", name: "Filet de pollo grille", description: "Crema de calabacín | Puré de papas | Ens. Mixta | Fresa- Inf. Cúrcuma | Gelatina con fruta", imageUrl: "https://sazonsula.com/wp-content/uploads/2022/02/sps_pechugas_grille_vegetales.jpg", price: "Bs100", type: "Dieta" },
        { id: "M3", day: "Lunes", name: "Escalopina de lomito en vino tinto", description: "Sopa de res | Consomé clarificado | Brochetas de pollo | Perlas de papa a la crema | Vegetales al vapor | Ens. Campesina | Coliflor rebosada", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_x1hwj-CIZ9_JdYnGrYtW9p2zT1Tz_l_J-A&s", price: "Bs100", type: "Ejecutivo" },
        
        { id: "M4", day: "Martes", name: "Tiras de carne al pimentón", description: "Crema de auyama | Arroz perla | Ens. Rallada | Piña melón | Plato de fruta\n", imageUrl: "https://content-cocina.lecturas.com/medio/2018/07/19/tiras-de-ternera-con-arroz-y-verduras_404bae89_600x600.jpg", price: "Bs100", type: "Clásico" },
        { id: "M5", day: "Martes", name: "Pasticcio de calabacín con carne", description: "Crema de calabacín | Ens. Primavera | Piña con melón- jugo verde | Plato de patilla", imageUrl: "https://media.istockphoto.com/id/535851351/es/foto/lasa%C3%B1a-en-una-plaza-placa-blanca.jpg?s=612x612&w=0&k=20&c=TSYa7f2h_ZYi7ZujCD2tOp8ylvt9O9Ah4DcaklPP0tM=", price: "Bs100", type: "Dieta" },
        { id: "M6", day: "Martes", name: "Filet de pollo grille", description: "Crema de auyama | Consomé clarificado | Pasticho de carne | Vegetales a la francesa | Tajadas | Ens. Cesar | Tortilla española", imageUrl: "https://sazonsula.com/wp-content/uploads/2022/02/sps_pechugas_grille_vegetales.jpg", price: "Bs100", type: "Ejecutivo" },

        { id: "M7", day: "Miércoles", name: "Pollo a la canasta", description: "Sopa de frijol | Papas fritas | Ens. Coleslaw | Mandarina | Marquesa de chocolate", imageUrl: "https://www.elespectador.com/resizer/em_h_LqEFC9E3W48fCgEwT1aCI8=/920x613/filters:quality(70):format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/D4LML424YJCT7H32GWB2YW5O4U.jpg", price: "Bs100", type: "Clásico" },
        { id: "M8", day: "Miércoles", name: "Ceviche de corocoro", description: "Sopa de frijol | Casabe | Ens. Coleslaw | Mandarina- Inf. Manzanilla | Torta de zanahoria", imageUrl: "https://comidasperuanas.net/wp-content/uploads/2023/10/Receta-de-ceviche-de-conchas-negras.jpg", price: "Bs100", type: "Dieta" },
        { id: "M9", day: "Miércoles", name: "Rueda de pescado", description: "Sopa de frijol | Consomé clarificado | Pollo con miel y mostaza | Papas rusticas | Espárragos salteados | Ens. Capresa | Dulce de lechosa", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sD3hE-x0Y_y-3k5w_Z_pY_R_h-8Z_Jg-w&s", price: "Bs100", type: "Ejecutivo" },
        
        { id: "M10", day: "Jueves", name: "Bisteck de solomo en salsa napoles", description: "Sopa de pescado | Bastoncitos de yuca frita | Ens. Mixta | Durazno | Galleton", imageUrl: "https://www.comedera.com/wp-content/uploads/2017/04/bistec-encebollado.jpg", price: "Bs100", type: "Clásico" },
        { id: "M11", day: "Jueves", name: "Rollitos de pollo con vegetales", description: "Consomé de pescado | Batatas rusticas | Ens. De berro y espinaca | Durazno- Inf. Cúrcuma | Gelatina con fruta", imageUrl: "https://recetastips.com/wp-content/uploads/2021/04/Rollitos-de-Pollo-con-Vegetales.jpg", price: "Bs100", type: "Dieta" },
        { id: "M12", day: "Jueves", name: "Medallones de pollo al vino blanco", description: "Sopa de pescado | Consomé clarificado | Lomo de cerdo horneado en su jugo | Fusilli en salsa napoles | Brócoli con chayota | Ens. Hawaiana", imageUrl: "https://i.ytimg.com/vi/qno2u-p-LzU/maxresdefault.jpg", price: "Bs100", type: "Ejecutivo" },

        { id: "M13", day: "Viernes", name: "Pabellón Criollo", description: "Consomé de fideos | Limonada | Gelatina", imageUrl: "https://www.venezuelatuya.com/cocina/images/pabellon_criollo.jpg", price: "Bs100", type: "Clásico" },
        { id: "M14", day: "Viernes", name: "Wrap con carne", description: "Sopa de vegetales | Pico de gallo con aguacate | Limonada- Inf. Jamaica | Galletas integrales", imageUrl: "https://www.annarecetasfaciles.com/files/wraps-de-carne-1-scaled.jpg", price: "Bs100", type: "Dieta" },
        { id: "M15", day: "Viernes", name: "Escalopina de lomito a la suiza", description: "Sopa de vegetales | Consomé clarificado | Filet de pollo al pesto | Arroz primavera | Ratatouille | Ens. Cesar | Canapés variado", imageUrl: "https://www.paulinacocina.net/wp-content/uploads/2023/10/escalopes-a-la-suiza.jpg", price: "Bs100", type: "Ejecutivo" },
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
       { id: "M1", day: "Lunes", name: "Escalopina de pollo en su jugo", description: "Crema de res | Pasta corta en salsa de tocineta | Ens. Griega | Fresa | Gelatina", imageUrl: "https://www.comedera.com/wp-content/uploads/2022/04/escalopines-de-pollo-shutterstock_1804245793.jpg", price: "Bs100", type: "Clásico" },
        { id: "M2", day: "Lunes", name: "Filet de pollo grille", description: "Crema de calabacín | Puré de papas | Ens. Mixta | Fresa- Inf. Cúrcuma | Gelatina con fruta", imageUrl: "https://sazonsula.com/wp-content/uploads/2022/02/sps_pechugas_grille_vegetales.jpg", price: "Bs100", type: "Dieta" },
        { id: "M3", day: "Lunes", name: "Escalopina de lomito en vino tinto", description: "Sopa de res | Consomé clarificado | Brochetas de pollo | Perlas de papa a la crema | Vegetales al vapor | Ens. Campesina | Coliflor rebosada", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_x1hwj-CIZ9_JdYnGrYtW9p2zT1Tz_l_J-A&s", price: "Bs100", type: "Ejecutivo" },
        
        { id: "M4", day: "Martes", name: "Tiras de carne al pimentón", description: "Crema de auyama | Arroz perla | Ens. Rallada | Piña melón | Plato de fruta\n", imageUrl: "https://content-cocina.lecturas.com/medio/2018/07/19/tiras-de-ternera-con-arroz-y-verduras_404bae89_600x600.jpg", price: "Bs100", type: "Clásico" },
        { id: "M5", day: "Martes", name: "Pasticcio de calabacín con carne", description: "Crema de calabacín | Ens. Primavera | Piña con melón- jugo verde | Plato de patilla", imageUrl: "https://media.istockphoto.com/id/535851351/es/foto/lasa%C3%B1a-en-una-plaza-placa-blanca.jpg?s=612x612&w=0&k=20&c=TSYa7f2h_ZYi7ZujCD2tOp8ylvt9O9Ah4DcaklPP0tM=", price: "Bs100", type: "Dieta" },
        { id: "M6", day: "Martes", name: "Filet de pollo grille", description: "Crema de auyama | Consomé clarificado | Pasticho de carne | Vegetales a la francesa | Tajadas | Ens. Cesar | Tortilla española", imageUrl: "https://sazonsula.com/wp-content/uploads/2022/02/sps_pechugas_grille_vegetales.jpg", price: "Bs100", type: "Ejecutivo" },

        { id: "M7", day: "Miércoles", name: "Pollo a la canasta", description: "Sopa de frijol | Papas fritas | Ens. Coleslaw | Mandarina | Marquesa de chocolate", imageUrl: "https://www.elespectador.com/resizer/em_h_LqEFC9E3W48fCgEwT1aCI8=/920x613/filters:quality(70):format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/D4LML424YJCT7H32GWB2YW5O4U.jpg", price: "Bs100", type: "Clásico" },
        { id: "M8", day: "Miércoles", name: "Ceviche de corocoro", description: "Sopa de frijol | Casabe | Ens. Coleslaw | Mandarina- Inf. Manzanilla | Torta de zanahoria", imageUrl: "https://comidasperuanas.net/wp-content/uploads/2023/10/Receta-de-ceviche-de-conchas-negras.jpg", price: "Bs100", type: "Dieta" },
        { id: "M9", day: "Miércoles", name: "Rueda de pescado", description: "Sopa de frijol | Consomé clarificado | Pollo con miel y mostaza | Papas rusticas | Espárragos salteados | Ens. Capresa | Dulce de lechosa", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sD3hE-x0Y_y-3k5w_Z_pY_R_h-8Z_Jg-w&s", price: "Bs100", type: "Ejecutivo" },
        
        { id: "M10", day: "Jueves", name: "Bisteck de solomo en salsa napoles", description: "Sopa de pescado | Bastoncitos de yuca frita | Ens. Mixta | Durazno | Galleton", imageUrl: "https://www.comedera.com/wp-content/uploads/2017/04/bistec-encebollado.jpg", price: "Bs100", type: "Clásico" },
        { id: "M11", day: "Jueves", name: "Rollitos de pollo con vegetales", description: "Consomé de pescado | Batatas rusticas | Ens. De berro y espinaca | Durazno- Inf. Cúrcuma | Gelatina con fruta", imageUrl: "https://recetastips.com/wp-content/uploads/2021/04/Rollitos-de-Pollo-con-Vegetales.jpg", price: "Bs100", type: "Dieta" },
        { id: "M12", day: "Jueves", name: "Medallones de pollo al vino blanco", description: "Sopa de pescado | Consomé clarificado | Lomo de cerdo horneado en su jugo | Fusilli en salsa napoles | Brócoli con chayota | Ens. Hawaiana", imageUrl: "https://i.ytimg.com/vi/qno2u-p-LzU/maxresdefault.jpg", price: "Bs100", type: "Ejecutivo" },

        { id: "M13", day: "Viernes", name: "Pabellón Criollo", description: "Consomé de fideos | Limonada | Gelatina", imageUrl: "https://www.venezuelatuya.com/cocina/images/pabellon_criollo.jpg", price: "Bs100", type: "Clásico" },
        { id: "M14", day: "Viernes", name: "Wrap con carne", description: "Sopa de vegetales | Pico de gallo con aguacate | Limonada- Inf. Jamaica | Galletas integrales", imageUrl: "https://www.annarecetasfaciles.com/files/wraps-de-carne-1-scaled.jpg", price: "Bs100", type: "Dieta" },
        { id: "M15", day: "Viernes", name: "Escalopina de lomito a la suiza", description: "Sopa de vegetales | Consomé clarificado | Filet de pollo al pesto | Arroz primavera | Ratatouille | Ens. Cesar | Canapés variado", imageUrl: "https://www.paulinacocina.net/wp-content/uploads/2023/10/escalopes-a-la-suiza.jpg", price: "Bs100", type: "Ejecutivo" },
    ];
  }
}
