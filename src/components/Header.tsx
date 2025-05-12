
import React from 'react';
import { Truck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#001E2E] p-4 text-white flex items-center justify-between">
      <div className="flex items-center">
        <Truck className="mr-2 h-5 w-5" />
        <div className="text-lg font-medium">Gabriel Medeiros Faria</div>
      </div>
      <div className="text-sm text-gray-400">v1.0.0</div>
    </header>
  );
};

export default Header;
