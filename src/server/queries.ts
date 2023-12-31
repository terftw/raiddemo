import { Fruit, OrderHistory } from "../types";
import axios from "axios";

const databaseURL =
  "https://raiddemo-ee237.asia-southeast1.firebasedatabase.app";

export const getFruitsData = async () => {
  const fruitArr: Fruit[] = [];

  return axios
    .get(`${databaseURL}/fruits.json`)
    .then((response) => {
      for (const [, value] of Object.entries(response.data)) {
        fruitArr.push(value as Fruit);
      }

      return fruitArr;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const getOrderHistory = async () => {
  const orderHistoryArr: OrderHistory[] = [];

  return axios
    .get(`${databaseURL}/orders.json`)
    .then((response) => {
      for (const [, value] of Object.entries(response.data)) {
        orderHistoryArr.push(value as OrderHistory);
      }

      return orderHistoryArr.reverse();
    })
    .catch((error) => {
      throw new Error(error);
    });
};
