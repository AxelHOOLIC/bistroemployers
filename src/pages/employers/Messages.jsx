import { Show, createSignal } from "solid-js";
import ClickOutside from "../../shared/utils/ClickOutside";

const Messages = (props) => {

  return (
    <Show when={props.showMsg}>
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-middle bg-zinc-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-[95%] md:w-[40%]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            use:ClickOutside={() => props.setShowMsg(false)}
          >
            <div className="bg-zinc-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 mb-2">
              <div className="sm:flex sm:items-start">
                <div>
                  <button
                    type="button"
                    class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-rose-700 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    onClick={() => {
                      props.setShowMsg(false);
                    }}
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900">
              <div class="pl-4 pr-4 pb-4 md:pb-5 md:pr-5 md:pl-5 text-center">
                <p>mensajes ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default Messages;
