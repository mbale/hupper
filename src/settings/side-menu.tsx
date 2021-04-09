import { useAppSelector, useAppDispatch } from "../hooks";
import "preact/debug";
import bandageSrc from "../assets/fireextiguisher.png";
import wrenchSrc from "../assets/wrench.png";
import { changeView, View } from "./slice";

// TODO: styled component
const nonActiveState = 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group border-l-4 px-3 py-2 flex items-center text-sm font-medium mb-2'
const activeState = 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium mb-2'

const SideMenu = () => {
  const activeView = useAppSelector((state) => state.settingsRouterSlice.activeView);
  const dispatch = useAppDispatch();

  const isBlockedUsers = activeView === View.BlockedUsers;

  const updateView = (view: View) => {
    dispatch(changeView(view))
  }

  return (
    <aside class="py-6 lg:col-span-3">
      <nav>
        <a
          href="#"
          className={isBlockedUsers ? activeState : nonActiveState}
          onClick={() => updateView(View.BlockedUsers)}
          aria-current="page"
        >
          <img class="w-6 h-6 mr-2" src={bandageSrc}></img>
          <span class="truncate">Blokkolt felhasználók</span>
        </a>
        <a
          href="#"
          className={!isBlockedUsers ? activeState : nonActiveState}
          onClick={() => updateView(View.UI)}
          aria-current="page"
        >
          <img class="w-6 h-6 mr-2" src={wrenchSrc}></img>
          <span class="truncate">UI</span>
        </a>
      </nav>
    </aside>
  );
};

export default SideMenu;
