import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import MapComponent from "@/components/MapComponent";
import VehicleTable from "@/components/VehicleTable";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicles } from "@/services/vehicleService";
import { Vehicle, VehicleLocation, VehicleTab } from "@/types/vehicle";
import VehicleDetailsDialog from "@/components/VehicleDetailsDialog";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<VehicleTab>("tracked");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(
    undefined
  );
  const [selectedLocation, setSelectedLocation] = useState<
    VehicleLocation | undefined
  >(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["allVehicles", activeTab],
    queryFn: () => fetchVehicles(activeTab),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Atualizou as infos dos veículos", data);
      refetch();
    }, 120000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  const vehicles = data?.vehicles || [];
  const vehicleLocations = data?.locationVehicles || [];

  const findLocationForVehicle = (
    plate: string
  ): VehicleLocation | undefined => {
    return vehicleLocations.find((loc) => loc.plate === plate);
  };

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    const location = findLocationForVehicle(vehicle.plate);
    setSelectedLocation(location);
    setSelectedVehicleId(vehicle.id);
    setIsDialogOpen(true);
  };

  const handleMarkerClick = (location: VehicleLocation) => {
    setSelectedLocation(location);
    const vehicle = vehicles.find((v) => v.plate === location.plate);
    setSelectedVehicle(vehicle);
    setSelectedVehicleId(vehicle?.id || null);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy text-white">
      <Header />

      <main className="flex-grow px-6 md:px-12 py-4">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center w-full gap-2 border-b border-[#002D44] pb-4">
            <h2 className="text-lg font-medium mr-4">Lista</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setActiveTab("tracked");
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-1 ${
                  activeTab === "tracked" ? "text-blue-500" : "text-gray-400"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border ${
                    activeTab === "tracked"
                      ? "bg-blue-500 border-blue-500"
                      : "bg-transparent border-gray-400"
                  }`}
                ></span>
                Rastreados
              </button>

              <button
                onClick={() => {
                  setActiveTab("others");
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-1 ${
                  activeTab === "others" ? "text-blue-500" : "text-gray-400"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border ${
                    activeTab === "others"
                      ? "bg-blue-500 border-blue-500"
                      : "bg-transparent border-gray-400"
                  }`}
                ></span>
                Outros
              </button>
            </div>
          </div>
        </div>

        {error ? (
          <div className="p-4 bg-red-900/50 border border-red-700 rounded-md mb-4">
            <p>Erro ao carregar dados: {(error as Error).message}</p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => refetch()}
            >
              Tentar novamente
            </Button>
          </div>
        ) : (
          <MapComponent
            vehicleLocations={vehicleLocations}
            selectedVehicleId={selectedVehicleId || undefined}
            onMarkerClick={handleMarkerClick}
            isLoading={isLoading}
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          />
        )}

        <VehicleTable
          vehicles={vehicles}
          isLoading={isLoading}
          onVehicleClick={handleVehicleClick}
        />
      </main>

      <VehicleDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        vehicle={selectedVehicle}
        location={selectedLocation}
      />
    </div>
  );
};

export default Index;
