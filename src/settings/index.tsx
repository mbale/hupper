import "preact/debug";
import logoSrc from "../assets/logo.png";
import { useEffect, useState } from "preact/hooks";
import AddModal from "../settings/blocked-users/add-modal";
import BlockedUsers from "./blocked-users";
import SideMenu from "./side-menu";
import { useAppSelector } from "../hooks";
import { View } from "./slice";
import UIView from './ui'

const Settings = () => {
  useEffect(() => {
    document.title = "Hupler - Beállítások";
  });
  const activeView = useAppSelector((state) => state.settingsRouterSlice.activeView);

  const [modalIsActive, toggleModal] = useState<boolean>(false);

  const isBlockUsersView = activeView === View.BlockedUsers;

  return (
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
                {isBlockUsersView ? <BlockedUsers /> : <UIView />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
