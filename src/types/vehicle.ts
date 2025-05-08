
export interface Vehicle {
  id: string;
  plate: string;
  fleet: string | null;
  type: string;
  model: string;
  nameOwner: string;
  status: string;
  createdAt: string;
}

export interface VehicleLocation {
  id: string;
  fleet: string;
  equipmentId: string;
  name: string;
  plate: string;
  ignition: string;
  lat: number;
  lng: number;
  createdAt: string;
}

export interface APIResponse {
  statusCode: number;
  message: string;
  content: {
    vehicles: Vehicle[];
    locationVehicles: VehicleLocation[];
    totalPages: number;
    page: number;
    perPage: number;
  };
}

export type VehicleTab = 'tracked' | 'others';
