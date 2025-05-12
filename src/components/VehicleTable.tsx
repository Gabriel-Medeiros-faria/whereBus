
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Vehicle } from '@/types/vehicle';
import { ScrollArea } from "./ui/scroll-area";

interface VehicleTableProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  onVehicleClick: (vehicle: Vehicle) => void;
}

const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles, isLoading, onVehicleClick }) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-400';
      case 'inactive':
        return 'text-yellow-400';
      case 'maintenance':
        return 'text-yellow-400';
      default:
        return 'text-white';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full p-8 text-center">
        <p>Carregando veículos...</p>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <p>Nenhum veículo encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-700 rounded-md bg-[#001E2E]">
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader className="sticky top-0 bg-navy z-10">
            <TableRow>
              <TableHead className="text-white">Placa</TableHead>
              <TableHead className="text-white">Frota</TableHead>
              <TableHead className="text-white">Tipo</TableHead>
              <TableHead className="text-white">Modelo</TableHead>
              <TableHead className="text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow 
                key={vehicle.id} 
                className="border-t border-gray-700 hover:bg-navy-light cursor-pointer"
                onClick={() => onVehicleClick(vehicle)}
              >
                <TableCell>{vehicle.plate}</TableCell>
                <TableCell>{vehicle.fleet || '-'}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell className={`${getStatusClass(vehicle.status)}`}>
                  {vehicle.status === 'active' ? 'Ativo' : vehicle.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default VehicleTable;
