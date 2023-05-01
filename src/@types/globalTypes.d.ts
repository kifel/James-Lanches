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

export interface CategoryProduct {
  id: string
  name: string
  description: string
  products: Product[]
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

export interface Pageable {
  offset: number;
  pageNumber: number;
  paged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  unpaged: boolean;
}

export interface PageableProduct {
  content: [Product];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
  totalElements: number;
  totalPages: number;
}
