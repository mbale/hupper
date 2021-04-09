import { useAppSelector, useAppDispatch } from "../../hooks";
import { useState, useEffect } from "preact/hooks";
import { changeTwitterBlock, initPersistedState } from "./slice";

// TODO: styled
// correct hooks

const UIView = () => {
  useEffect(() => {
    // @ts-ignore
    const initState = async () => dispatch(initPersistedState());

    initState();
  }, []);

  const isTwitterBlocked = useAppSelector(
    (state) => state.uiSettingsSlice.twitterBlocked
  );
  const dispatch = useAppDispatch();

  const updateUiSettings = () => {
    dispatch(
      changeTwitterBlock(!isTwitterBlocked)
    );
  }

  return (
    <div class="pt-6 divide-y divide-gray-200">
      <div class="px-4 sm:px-6">
        <div>
          <h2 class="text-lg leading-6 font-medium text-gray-900">UI</h2>
        </div>
        <ul class="mt-2 divide-y divide-gray-200">
          <li class="py-4 flex items-center justify-between">
            <div class="flex flex-col">
              <p
                class="text-sm font-medium text-gray-900"
                id="privacy-option-1-label"
              >
                Twitter integráció tiltása
              </p>
              <p
                class="text-sm text-gray-500"
                id="privacy-option-1-description"
              >
                Egyáltalán nem fogja betölteni a beágyazott elemeket.
              </p>
            </div>
            {" "}
            <button
              type="button"
              className={
                "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500 " +
                (isTwitterBlocked ? "bg-teal-500" : "bg-gray-200")
              }
              onClick={updateUiSettings}
              aria-pressed="true"
              aria-labelledby="privacy-option-1-label"
              aria-describedby="privacy-option-1-description"
            >
              <span class="sr-only">Use setting</span>
              {" "}
              <span
                aria-hidden="true"
                class={"inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 " +
                (isTwitterBlocked ? "translate-x-5" : "translate-x-0")}
              ></span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UIView;
