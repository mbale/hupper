import "preact/debug";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import logoSrc from "../assets/logo.png";
import { useEffect, useState } from "preact/hooks";
import AddModal from "../settings/blocked-users/add-modal";
import store from "../store";
import SideMenu from "./side-menu";
import BlockedUsers from "./blocked-users/index";
import { mountRootComponent } from "../utils";
import "../message-bus";

const Settings = () => {
  useEffect(() => {
    document.title = "Hupler - Beállítások";
  });

  const [modalIsActive, toggleModal] = useState<boolean>(null);

  return (
    <>
      <Provider store={store}>
        <div class="bg-gray-200 w-screen h-screen">
          <AddModal
            isActive={modalIsActive}
            onClose={() => toggleModal((s) => !s)}
          />
          <div class="relative pb-32 overflow-hidden">
            <header class="relative py-10">
              <div class="flex flex-row items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <img src={logoSrc} class="w-12 h-12 mr-6" />
                <h1 class="text-3xl font-semibold text-black">Beállítások</h1>
              </div>
            </header>
          </div>

          <main class="relative -mt-32">
            <div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
              <div class="bg-white rounded-lg shadow overflow-hidden">
                <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                  <SideMenu />
                  <div class="divide-y divide-gray-200 lg:col-span-9">
                    <BlockedUsers />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Provider>
    </>
  );
};

mountRootComponent(<Settings />, "settings");
