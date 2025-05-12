import { render, screen } from "@testing-library/react";
import VehicleDetailsDialog from "../components/VehicleDetailsDialog";
import { Vehicle, VehicleLocation } from "@/types/vehicle";

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((msg) => {
    if (typeof msg === 'string' && msg.includes("Missing `Description`")) return;
    console.warn(msg);
  });
});

const mockVehicle: Vehicle = {
  id: "1",
  plate: "ABC1234",
  model: "Caminhão",
  fleet: "001",
  nameOwner: "João",
  type: "vehicle",
  status: "active",
  createdAt: "2024-01-01T00:00:00.000Z",
};

const mockLocation: VehicleLocation = {
  id: "loc-1",
  plate: "ABC1234",
  fleet: "001",
  equipmentId: "EQ001",
  name: "SASCAR",
  lat: -23.55052,
  lng: -46.633308,
  ignition: "Ligado",
  createdAt: "2024-01-01T12:00:00.000Z"
};

describe("VehicleDetailsDialog", () => {
  it("renderiza informações do veículo quando aberto", () => {
    render(
      <VehicleDetailsDialog
        isOpen={true}
        onClose={() => {}}
        vehicle={mockVehicle}
        location={mockLocation}
      />
    );

    expect(screen.getByText(/ABC1234/)).toBeInTheDocument();
    expect(screen.getByText(/Caminhão/)).toBeInTheDocument();
    expect(screen.getByText(/Ligado/)).toBeInTheDocument();
    expect(screen.getByText(/Abrir no Google Maps/)).toBeInTheDocument();
  });
});