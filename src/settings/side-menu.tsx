import "preact";
import bandageSrc from "../assets/fireextiguisher.png";

const SideMenu = () => {
  return (
    <aside class="py-6 lg:col-span-3">
      <nav>
        <a
          href="#"
          class="bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          aria-current="page"
        >
          <img class="w-6 h-6 mr-2" src={bandageSrc}></img>
          <span class="truncate">Trollszűrő</span>
        </a>
      </nav>
    </aside>
  );
};

export default SideMenu;
