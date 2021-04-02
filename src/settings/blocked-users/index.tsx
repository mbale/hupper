import { initPersistedState, removeBlockedUser } from "./slice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import AddModal from "./add-modal";
import { useState, useEffect } from "preact/hooks";

const BlockedUsers = () => {
  const [modalIsActive, toggleModal] = useState<boolean>(false);

  const blockedUsers = useAppSelector((state) => state.blockedUsersSlice.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    const initState = async () => dispatch(initPersistedState());

    initState();
  }, []);

  return (
    <div class="py-6 px-4 sm:p-6 lg:pb-8">
      <AddModal
        isActive={modalIsActive}
        onClose={() => toggleModal((currentState) => !currentState)}
      />
      <div>
        <h2 class="text-lg leading-6 font-medium text-gray-900">Trollszűrő</h2>
      </div>

      <div class="mt-6 flex flex-col">
        <div class="align-middle inline-block min-w-full mb-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Név
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hup Id
                  </th>
                  <th scope="col" class="relative px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {blockedUsers.map(({ name, id }) => {
                  return (
                    <tr class="bg-white">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {id}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          class="text-red-400 hover:text-red-700"
                          onClick={() => dispatch(removeBlockedUser(id))}
                        >
                          Törlés
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex flex-row justify-end">
          <button
            type="button"
            class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => toggleModal((currentState) => !currentState)}
          >
            Hozzáadás
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockedUsers;
