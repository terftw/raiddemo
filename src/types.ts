export type Order = {
  name: string;
  quantity: number;
};

export type Fruit = {
  name: string;
  price: number;
  quantity: number;
};

export type OrderHistory = {
  cost: number;
  orders: Order[];
  timeOfOrder: Date;
};
