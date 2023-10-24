import { collection, getDocs } from "firebase/firestore";
import { db } from "../server";
import { Fruit, OrderHistory } from "../types";

export const getFruitsData = async () => {
  const querySnapshot = await getDocs(collection(db, "fruits"));
  const fruits: Fruit[] = [];

  querySnapshot.forEach((doc) => {
    fruits.push({ ...doc.data() } as Fruit);
  });

  return fruits;
};

export const getOrderHistory = async () => {
  const querySnapshot = await getDocs(collection(db, "orders"));
  const orderHistory: OrderHistory[] = [];

  querySnapshot.forEach((doc) => {
    orderHistory.push({ ...doc.data() } as OrderHistory);
  });

  return orderHistory;
};
