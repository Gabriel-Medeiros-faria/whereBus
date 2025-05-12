import { render, screen } from "@testing-library/react";
import MapComponent from "../components/MapComponent";
import { VehicleLocation } from "@/types/vehicle";

const mockLocations: VehicleLocation[] = [
  {
    id: "loc-1",
    plate: "XYZ1234",
    fleet: "002",
    equipmentId: "EQ002",
    name: "SASCAR",
    lat: -23.55052,
    lng: -46.633308,
    ignition: "Desligado",
    createdAt: "2024-01-01T12:00:00.000Z",
  },
];

jest.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children }: any) => <div>{children}</div>,
  useJsApiLoader: () => ({ isLoaded: true, loadError: null }),
  Marker: ({ children }: any) => <div>{children}</div>,
  InfoWindow: ({ children }: any) => <div>{children}</div>,
  OverlayView: ({ children }: any) => <div>{children}</div>,
}));

describe("MapComponent", () => {
  it("renderiza o mapa com marcadores", () => {
    render(
      <MapComponent
        vehicleLocations={mockLocations}
        selectedVehicleId="loc-1"
        onMarkerClick={() => {}}
        isLoading={false}
        googleMapsApiKey="fake-api-key"
      />
    );
    expect(screen.getByTestId("map-marker")).toBeInTheDocument();
  });
});