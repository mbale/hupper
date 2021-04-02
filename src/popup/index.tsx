import "tailwindcss/tailwind.css";
import { mountRootComponent } from "../utils";

const goToSettings = () => {
  if (chrome.runtime.openOptionsPage) {
    return chrome.runtime.openOptionsPage();
  }

  window.open(chrome.runtime.getURL("settings.html"));
};

const Popup = () => (
  <>
    <div class="bg-gray-50 sm:rounded-lg" style={{ minWidth: 300 }}>
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Hupler</h3>
        <div class="mt-5">
          <button
            onClick={goToSettings}
            type="button"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            Beállítások
          </button>
        </div>
      </div>
    </div>
  </>
);

mountRootComponent(<Popup />, "popup");
