import { collection, addDoc } from "firebase/firestore";
import { db } from "../server";
import { Order } from "../types";

export const createOrder = async (orders: Order[], cost: number) => {
  await addDoc(collection(db, "orders"), {
    timeOfOrder: new Date(),
    orders,
    cost,
  });
};
