import { useEffect, useState } from "react";
import { TableColumnsType, Typography } from "antd";
import { getOrderHistory } from "../../../server/queries";
import Table, { ColumnsType } from "antd/es/table";
import { Order, OrderHistory } from "../../../types";

const { Title, Text } = Typography;

const columns: ColumnsType<OrderHistory> = [
  {
    title: "Time of purchase",
    dataIndex: "timeOfOrder",
    key: "time",
    render: (timestamp) => {
      const date = new Date(timestamp).toString();
      return <Text>{date}</Text>;
    },
  },
  {
    title: "Cost (SGD$)",
    dataIndex: "cost",
    key: "cost",
  },
];

const OrdersRecord = () => {
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);

  useEffect(() => {
    getOrderHistory().then((history) => {
      if (history) setOrderHistory(history);
    });
  }, []);

  const expandedRowRender = (record: OrderHistory) => {
    const columns: TableColumnsType<Order> = [
      {
        title: "Fruit",
        dataIndex: "name",
        key: "name",
        render: (text) => <Text>{text[0].toUpperCase() + text.slice(1)}</Text>,
      },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={record.orders.map((order, index) => {
          return { key: index.toString(), ...order };
        })}
      />
    );
  };

  return (
    <div>
      <Title level={2}>Your recent orders</Title>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={orderHistory.map((history, index) => {
          return { key: index.toString(), ...history };
        })}
      />
    </div>
  );
};

export default OrdersRecord;
