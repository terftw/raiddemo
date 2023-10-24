import { useCallback, useEffect, useState } from "react";
import {
  Input,
  Space,
  Table,
  Button,
  Typography,
  Divider,
  Popover,
  Collapse,
  CollapseProps,
} from "antd";
import { useDebounce } from "use-debounce";
import { ColumnsType } from "antd/es/table";
import { convertPurchaseStringToOrder } from "../../../helpers/convertPurchaseStringToOrder";
import { useFruitsContext } from "../../context/FruitsProvider";
import { Fruit, Order } from "../../../types";
import { createOrder } from "../../../server/mutations";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const columns: ColumnsType<Fruit> = [
  {
    title: "Fruit",
    dataIndex: "name",
    key: "fruit",
    render: (text) => <Text>{text[0].toUpperCase() + text.slice(1)}</Text>,
  },
  {
    title: "Price (SGD$)",
    dataIndex: "price",
    key: "price",
  },
];

const PurchasePage = () => {
  const [purchaseString, setPurchaseString] = useState<string>("");
  const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
  const [currentOrdersPrice, setCurrentOrdersPrice] = useState<number>(0);
  const [purchaseIsMade, setPurchaseIsMade] = useState(false);
  const { data: fruitsData } = useFruitsContext();
  const [value] = useDebounce(purchaseString, 300);

  const fruitsArray = Object.entries(fruitsData).map(([_, v]) => v);

  const onSubmit = useCallback(() => {
    if (currentOrders.length === 0) return;
    createOrder(currentOrders, currentOrdersPrice);
    setPurchaseString("");
    setCurrentOrders([]);
    setCurrentOrdersPrice(0);
    setPurchaseIsMade(true);
  }, [currentOrders, currentOrdersPrice]);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "How do I make a purchase?",
      children: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text>{`Type in your purchase, and click on the purchase button to make a purchase`}</Text>
          <Text>{`Format: [name of fruit] [quantity]`}</Text>
          <Text>{`Example: apple 5, pear 4`}</Text>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setCurrentOrders(
      convertPurchaseStringToOrder(value).filter(
        (order) => fruitsData[order.name]
      )
    );
  }, [value]);

  useEffect(() => {
    if (currentOrders) {
      const costOfOrder = currentOrders.reduce(
        (accumulator, currentValue) =>
          fruitsData[currentValue.name]
            ? accumulator +
              fruitsData[currentValue.name].price * currentValue.quantity
            : accumulator,
        0
      );

      setCurrentOrdersPrice(costOfOrder);
    }
  }, [currentOrders]);

  useEffect(() => {
    if (purchaseString) setPurchaseIsMade(false);
  }, [purchaseString]);

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={3}>Enter your purchase</Title>
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Input
            size="large"
            placeholder="Enter your purchase info"
            value={purchaseString}
            onChange={(event) => setPurchaseString(event.target.value)}
            style={{ marginRight: 8 }}
          />
        </div>
      </Space>

      <Collapse ghost items={items} style={{ marginLeft: -16 }} />
      <div style={{ marginTop: 24, display: "flex", flexDirection: "column" }}>
        <Title level={5}>{`Total Cost (SGD$): $${currentOrdersPrice}`}</Title>
        <Button
          size="large"
          type="primary"
          style={{ maxWidth: 300 }}
          onClick={() => onSubmit()}
        >
          Make a purchase
        </Button>
        {purchaseIsMade && (
          <div style={{ marginTop: 8, display: "flex", alignItems: "center" }}>
            <Text style={{ marginRight: 8 }}>Your purchase has been made</Text>
            <Link to={"/orderHistory"}>Check order history</Link>
          </div>
        )}
      </div>
      <Divider />
      <div style={{ width: "100%" }}>
        <Title level={3}>Current stock</Title>
        <Table
          columns={columns}
          dataSource={fruitsArray.map((fruit, index) => {
            return { key: String(index), ...fruit };
          })}
        />
        <Text>{`Last updated: ${new Date()}`}</Text>
      </div>
    </>
  );
};

export default PurchasePage;
