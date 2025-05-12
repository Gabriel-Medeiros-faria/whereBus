import { APIResponse, Vehicle, VehicleLocation, VehicleTab } from '@/types/vehicle';

const API_URL = 'https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate';
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
export const fetchVehicles = async (
  tabType: VehicleTab
): Promise<{
  vehicles: Vehicle[];
  locationVehicles: VehicleLocation[];
}> => {
  let page = 1;
  let totalPages = 1;
  let allVehicles: Vehicle[] = [];
  let allLocations: VehicleLocation[] = [];

  try {
    do {
      const url = new URL(API_URL);
      url.searchParams.append('type', tabType);
      url.searchParams.append('page', page.toString());

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na página ${page}: ${response.status}`);
      }

      const data: APIResponse = await response.json();
      allVehicles = [...allVehicles, ...data.content.vehicles];
      allLocations = [...allLocations, ...data.content.locationVehicles];
      totalPages = data.content.totalPages;
      page++;
    } while (page <= totalPages);

    return { vehicles: allVehicles, locationVehicles: allLocations };
  } catch (error) {
    console.error('Erro ao buscar todos os veículos:', error);
    throw error;
  }
};
