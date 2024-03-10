export interface Order {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
  };
  product: {
    name: string;
  };
  quantity: number;
  price: number;
  status: string;
  createdAt: Date;
}
