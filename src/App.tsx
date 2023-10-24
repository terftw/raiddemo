import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { ShoppingCartOutlined, ContainerOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Purchase from "./components/pages/Purchase";
import OrdersRecord from "./components/pages/OrdersRecord";
import FruitsProvider from "./components/context/FruitsProvider";
const { Header, Content, Sider } = Layout;

const pages = ["Purchase", "Order History"];
const links = ["/", "/orderhistory"];

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  return (
    <FruitsProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div
            style={{
              height: "32px",
              margin: "16px",
              background: "rgba(255,255,255,.2)",
              borderRadius: "6px",
            }}
          />
          <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
            {[ShoppingCartOutlined, ContainerOutlined].map((icon, idx) => (
              <Menu.Item key={links[idx]}>
                {React.createElement(icon)}
                <span>{pages[idx]}</span>
                <Link to={links[idx]} />
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                height: "100%",
                background: colorBgContainer,
              }}
            >
              <Routes>
                <Route path="/" Component={Purchase} />
                <Route path="/orderhistory" Component={OrdersRecord} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </FruitsProvider>
  );
};

export default App;
