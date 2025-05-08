import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import { VehicleLocation } from "@/types/vehicle";
import { Button } from "@/components/ui/button";
import { FaTruckMoving } from "react-icons/fa";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const DEFAULT_CENTER = { lat: -22.5, lng: -47.5 };

interface MapComponentProps {
  vehicleLocations: VehicleLocation[];
  selectedVehicleId?: string;
  onMarkerClick: (vehicleLocation: VehicleLocation) => void;
  isLoading: boolean;
  onRefresh?: () => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  vehicleLocations,
  selectedVehicleId,
  onMarkerClick,
  isLoading,
}) => {
  const [mapInitError, setMapInitError] = useState("");
  const [selectedMarker, setSelectedMarker] = useState<VehicleLocation | null>(
    null
  );
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      setMapInitError("");

      if (vehicleLocations.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        vehicleLocations.forEach((loc) =>
          bounds.extend({ lat: loc.lat, lng: loc.lng })
        );
        map.fitBounds(bounds);

        const listener = google.maps.event.addListener(map, "idle", () => {
          if (map.getZoom() > 15) map.setZoom(15);
          google.maps.event.removeListener(listener);
        });
      }
    },
    [vehicleLocations]
  );

  const handleMarkerClick = (location: VehicleLocation) => {
    setSelectedMarker(location);
    onMarkerClick(location);
  };

  useEffect(() => {
    if (loadError) {
      console.error("Erro ao carregar o mapa:", loadError);
      setMapInitError(`Erro ao carregar o mapa: ${loadError.message}`);
    }
  }, [loadError]);

  if (!isLoaded) {
    return <p>Carregando mapa...</p>;
  }

  if (mapInitError) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded">
        <p>{mapInitError}</p>
        <Button onClick={() => window.location.reload()} className="mt-2">
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div
      className="bg-navy-light rounded-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">Mapa rastreador</h3>
      <div className="h-[500px] rounded-md overflow-hidden border border-custom">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={DEFAULT_CENTER}
          zoom={6}
          onLoad={onLoad}
        >
          {vehicleLocations.map((location) => (
            <OverlayView
              key={`${location.id}-${location.equipmentId}`}
              position={{ lat: location.lat, lng: location.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                onClick={() => handleMarkerClick(location)}
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -100%)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor:
                      location.ignition === "Ligado" ? "#32cd32" : "#FF6600",
                    border: `solid ${
                      selectedVehicleId === location.id
                        ? "3px #0099ff"
                        : "1px white"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                    zIndex: 2,
                  }}
                >
                  <FaTruckMoving color="white" size={18} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    marginLeft: -6,
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: `8px solid ${
                      location.ignition === "Ligado" ? "#32cd32" : "#FF6600"
                    }`,
                    zIndex: 1,
                  }}
                />
              </div>
            </OverlayView>
          ))}

          {selectedMarker && (
            <OverlayView
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                onClick={() => setSelectedMarker(null)}
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -100%)",
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    backgroundColor: "#001622",
                    color: "white",
                    fontSize: "10px",
                    marginBottom: "50px",
                    padding: "8px",
                    borderRadius: "6px",
                    maxWidth: "180px",
                    textAlign: "center",
                    width: "200px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
                  }}
                >
                  <p>
                    <strong>Placa</strong> {selectedMarker.plate}
                  </p>
                  <p>
                    <strong>Frota</strong> {selectedMarker.fleet || "-"}
                  </p>
                  <p>
                    {new Date(selectedMarker.createdAt).toLocaleDateString(
                      "pt-BR"
                    )}{" "}
                    -{" "}
                    {new Date(selectedMarker.createdAt).toLocaleTimeString(
                      "pt-BR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                  <p
                    style={{
                      textDecoration: "underline",
                      fontSize: "10px",
                      marginBottom: "6px",
                    }}
                  >
                    {selectedMarker.lat.toFixed(6)} ,{" "}
                    {selectedMarker.lng.toFixed(6)}
                  </p>
                  <p>
                    <a
                      href={`https://www.google.com/maps?q=${selectedMarker.lat},${selectedMarker.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#60a5fa", textDecoration: "underline" }}
                    >
                      Ver no Google Maps
                    </a>
                  </p>
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "45px",
                    left: "50%",
                    marginLeft: -6,
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "8px solid #001622",
                  }}
                />
              </div>
            </OverlayView>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComponent;
