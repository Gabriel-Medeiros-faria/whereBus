
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Vehicle } from '@/types/vehicle';
import { VehicleLocation } from '@/types/vehicle';
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

interface VehicleDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: Vehicle;
  location?: VehicleLocation;
}

const VehicleDetailsDialog: React.FC<VehicleDetailsDialogProps> = ({ 
  isOpen, 
  onClose, 
  vehicle, 
  location 
}) => {
  if (!vehicle && !location) return null;
  
  const plate = vehicle?.plate || location?.plate || '';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-navy-light text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl">{plate}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {vehicle && (
            <div className="space-y-2">
              <h3 className="font-medium">Detalhes do Veículo</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-400">Modelo:</div>
                <div>{vehicle.model}</div>
                <div className="text-gray-400">Frota:</div>
                <div>{vehicle.fleet || '-'}</div>
                <div className="text-gray-400">Tipo:</div>
                <div>{vehicle.type}</div>
                <div className="text-gray-400">Proprietário:</div>
                <div>{vehicle.nameOwner}</div>
                <div className="text-gray-400">Status:</div>
                <div>{vehicle.status === 'active' ? 'Ativo' : vehicle.status}</div>
              </div>
            </div>
          )}
          
          {location && (
            <div className="space-y-2">
              <h3 className="font-medium">Localização</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-400">Ignição:</div>
                <div>{location.ignition}</div>
                <div className="text-gray-400">Equipamento:</div>
                <div>{location.equipmentId} ({location.name})</div>
                <div className="text-gray-400">Latitude:</div>
                <div>{location.lat.toFixed(6)}</div>
                <div className="text-gray-400">Longitude:</div>
                <div>{location.lng.toFixed(6)}</div>
                <div className="text-gray-400">Última atualização:</div>
                <div>{new Date(location.createdAt).toLocaleString('pt-BR')}</div>
              </div>
              
              <Button 
                className="mt-4 w-full"
                variant="outlineDark"
                onClick={() => {
                  window.open(`https://www.google.com/maps?q=${location.lat},${location.lng}`, '_blank');
                }}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Abrir no Google Maps
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDetailsDialog;
