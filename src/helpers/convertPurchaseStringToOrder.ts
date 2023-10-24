import { Order } from "../types";

export const convertPurchaseStringToOrder = (
  purchaseString: string
): Order[] => {
  const fruitQuantityArr = purchaseString
    .split(",")
    .map((fruitQty) => fruitQty.trim().toLowerCase().split(" "));

  const orders = fruitQuantityArr
    .map(([name, quantity]) => {
      return { name: name, quantity: Number(quantity) } as Order;
    })
    .filter(({ quantity }) => !isNaN(quantity));

  return orders;
};
