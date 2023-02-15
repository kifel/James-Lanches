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
