import "preact/debug";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import store from "../store";
import Settings from "../settings";
import { mountRootComponent } from "../utils";
import "../message-bus";

const Root = () => {
  return (
    <Provider store={store}>
      <Settings />
    </Provider>
  );
};

mountRootComponent(<Root />, "settings");
