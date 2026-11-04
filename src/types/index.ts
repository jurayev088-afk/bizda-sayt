export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type AddressType = {

  firstName: string;
  lastName: string;
  phone: string;
  region: string;
  city: string;
  district: string;
  mahalla: string;
  street: string;
  house: string;
  apartment: string;
  comment: string;
  notes: string;
};



