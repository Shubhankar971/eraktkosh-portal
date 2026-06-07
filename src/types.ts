export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Donor {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: BloodGroup;
  contact: string;
  email: string;
  lastDonationDate: string | null;
  location: string;
  registrationDate: string;
}

export interface InventoryItem {
  bloodGroup: BloodGroup;
  units: number;
  lastUpdated: string;
}

export type TabState = 'home' | 'dashboard' | 'donor_registration' | 'inventory';

export const INITIAL_INVENTORY: InventoryItem[] = [
  { bloodGroup: 'A+', units: 145, lastUpdated: new Date().toISOString() },
  { bloodGroup: 'A-', units: 25, lastUpdated: new Date().toISOString() },
  { bloodGroup: 'B+', units: 210, lastUpdated: new Date().toISOString() },
  { bloodGroup: 'B-', units: 34, lastUpdated: new Date().toISOString() },
  { bloodGroup: 'AB+', units: 78, lastUpdated: new Date().toISOString() },
  { bloodGroup: 'AB-', units: 12, lastUpdated: new Date().toISOString() },
  { bloodGroup: 'O+', units: 280, lastUpdated: new Date().toISOString() },
  { bloodGroup: 'O-', units: 45, lastUpdated: new Date().toISOString() },
];
