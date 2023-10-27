import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { keyBy } from "lodash";
import { Fruit } from "../../../types";
import { noop } from "antd/es/_util/warning";
import { getFruitsData } from "../../../server/queries";

type ContextValue = {
  data: Record<string, Fruit>;
  fetch: () => void;
};

const Context = createContext<ContextValue>({
  data: {},
  fetch: noop,
});

const FruitsProvider = ({ children }: PropsWithChildren) => {
  const [fruitsData, setFruitsData] = useState<ContextValue["data"]>({});

  useEffect(() => {
    getFruitsData().then((fruits) => {
      if (fruits) setFruitsData(keyBy(fruits, "name"));
    });
  }, []);

  return (
    <Context.Provider value={{ data: fruitsData, fetch: () => {} }}>
      {children}
    </Context.Provider>
  );
};

const useFruitsContext = (): ContextValue => {
  return useContext(Context);
};

export { Context, useFruitsContext };
export type { ContextValue };
export default FruitsProvider;
