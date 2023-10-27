import { Order } from "../types";
import axios from "axios";

const databaseURL =
  "https://raiddemo-ee237.asia-southeast1.firebasedatabase.app";

export const restCreateOrder = async (
  orders: Order[],
  cost: number,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  axios
    .post(`${databaseURL}/orders.json`, {
      timeOfOrder: new Date(),
      orders,
      cost,
    })
    .then(() => {
      setSuccess(true);
    })
    .catch((error) => {
      setError(true);
    });
};
