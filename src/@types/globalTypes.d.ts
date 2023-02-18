export interface Data {
  email: string;
  id: string;
  imageUrl: string;
  isActive: boolean;
  name: string;
  roles: [
    {
      id: string;
      name: string;
    }
  ];
  username: string;
}

export interface PopupInterface {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  children: ReactNode;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  rating: number;
  isActive: boolean;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt?: Date | null;
  imageUrl: string;
  category: Category;
}
