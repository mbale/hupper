import { useAppDispatch } from "../../hooks";
import { useForm } from "react-hook-form";
import { addBlockedUser } from "./slice";

interface ModalProps {
  isActive: boolean;
  onClose: () => void;
}

interface BlockUserFormState {
  id: number;
  name: string;
}

const AddModal = ({ isActive, onClose }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<BlockUserFormState>({
    mode: 'onTouched',
  });
  const { isDirty, isValid } = formState;
  const formIsValid = isDirty && isValid;

  const onSubmit = handleSubmit(({ id, name }) => {
    dispatch(
      addBlockedUser({
        id,
        name,
      })
    );

    return onClose();
  });

  return (
    <>
      {isActive && (
        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-60"></div>
            </div>

            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {/* @ts-ignore - preact */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={onClose}
                  >
                    <span class="sr-only">Close</span>
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <div class="mt-3 text-center sm:mt-5">
                    <div class="flex flex-col">
                      <label
                        for="hupName"
                        class="flex flex-row justify-start text-sm font-medium text-gray-700"
                      >
                        Név
                      </label>
                      <div class="mt-1 mb-4">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="bármi"
                          ref={register({ required: true, maxLength: 20 })}
                        />
                      </div>

                      <label
                        for="hupId"
                        class="flex flex-row justify-start text-sm font-medium text-gray-700"
                      >
                        Hup ID
                      </label>
                      <div class="mt-1 mb-6">
                        <input
                          type="number"
                          name="id"
                          id="id"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="123456"
                          ref={register({
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    disabled={!formIsValid}
                    class={`
                      inline-flex justify-center w-full
                      rounded-md border border-transparent shadow-sm px-4 py-2
                      text-base font-medium text-white
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm
                      ${
                        formIsValid
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-gray-400"
                      }
                    `}
                  >
                    Mentés
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
