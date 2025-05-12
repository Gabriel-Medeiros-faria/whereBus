import { render, screen } from "@testing-library/react";
import VehicleTable from "../components/VehicleTable";
import { Vehicle } from "@/types/vehicle";

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    plate: "ABC1234",
    model: "Caminhão",
    fleet: "001",
    nameOwner: "João",
    type: "vehicle",
    status: "active",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
];

describe("VehicleTable", () => {
  it("renderiza a tabela com dados do veículo", () => {
    render(<VehicleTable vehicles={mockVehicles} isLoading={false} onVehicleClick={() => {}} />);
    expect(screen.getByText("ABC1234")).toBeInTheDocument();
    expect(screen.getByText("Caminhão")).toBeInTheDocument();
  });

  it("renderiza mensagem de loading quando isLoading é true", () => {
    render(<VehicleTable vehicles={[]} isLoading={true} onVehicleClick={() => {}} />);
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });
});
