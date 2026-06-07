import { useState, useEffect } from 'react';
import { Donor, InventoryItem, INITIAL_INVENTORY, BloodGroup } from '../types';

export function useBloodBank() {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('bb_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [donors, setDonors] = useState<Donor[]>(() => {
    const saved = localStorage.getItem('bb_donors');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bb_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('bb_donors', JSON.stringify(donors));
  }, [donors]);

  const addDonor = (donor: Omit<Donor, 'id' | 'registrationDate'>) => {
    const newDonor: Donor = {
      ...donor,
      id: Math.random().toString(36).substr(2, 9),
      registrationDate: new Date().toISOString(),
    };
    setDonors([...donors, newDonor]);
  };

  const updateInventory = (bloodGroup: BloodGroup, quantityChange: number) => {
    setInventory(inventory.map(item => {
      if (item.bloodGroup === bloodGroup) {
        return {
          ...item,
          units: Math.max(0, item.units + quantityChange),
          lastUpdated: new Date().toISOString(),
        };
      }
      return item;
    }));
  };

  const overrideInventory = (bloodGroup: BloodGroup, absoluteUnits: number) => {
    setInventory(inventory.map(item => {
      if (item.bloodGroup === bloodGroup) {
        return {
          ...item,
          units: Math.max(0, absoluteUnits),
          lastUpdated: new Date().toISOString(),
        };
      }
      return item;
    }));
  };

  return { inventory, donors, addDonor, updateInventory, overrideInventory };
}
