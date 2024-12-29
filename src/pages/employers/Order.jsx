import { Show, createSignal } from "solid-js";
import ClickOutside from "../../shared/utils/ClickOutside";
import OrderCard from "./OrderCard";
import { io } from "socket.io-client";

const Order = (props) => {
  const [note, setNote] = createSignal("");
  const [errors, setErrors] = createSignal(false);
  const [table, setTable] = createSignal("");

  const socket = io("https://bistrobackend.deno.dev/");

  const ErrorMessage = (props) => (
    <span class="font-roboto mb-2 text-sm font-medium text-rose-500">
      {props.error}
    </span>
  );

  const sendOrder = async () => {
    if(table() === "") {
      setErrors(true);
      return;
    } else {
      //console.log(note());
      const newOrder = {
        notes: note(),
        table: table(),
        status: false,
        order: props.order
      }
      setTable("");
      setNote("");
      props.setOrder([]);
      socket.emit("newOrder", newOrder);
      props.setShowOrder(false);
    }
  };

  const tables = ["pedido", "1", "2", "3", "4", "5"];

  return (
    <Show when={props.showOrder}>
      <div className="fixed z-50 inset-0 overflow-y-auto font-roboto">
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
            use:ClickOutside={() => props.setShowOrder(false)}
          >
            <div className="bg-zinc-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 mb-2">
              <div className="sm:flex sm:items-start">
                <div>
                  <button
                    type="button"
                    class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-rose-700 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    onClick={() => {
                      props.setShowOrder(false);
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
                <For each={props.order}>
                  {(a) => (
                    <OrderCard
                      title={a.title}
                      appetizer={a.appetizer}
                      amount={a.amount}
                      inMenu={a.inMenu}
                      id={a.id}
                      setOrder={props.setOrder}
                      order={props.order}
                    />
                  )}
                </For>
              </div>
            </div>
            <div class="mb-4 pr-4 pl-4">
              <select
                id="table"
                name="table"
                required
                value={table()}
                onInput={(e) => {
                  setTable(e.target.value), setErrors(false);
                }}
                class="font-roboto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected value="">
                  Selecciona una mesa
                </option>
                <For each={tables}>
                  {(t) => (
                    <option class="font-roboto" value={t}>
                      {t}
                    </option>
                  )}
                </For>
              </select>
              {errors() && <ErrorMessage error="Selecciona una mesa" />}
            </div>
            <div>
              <div class="mb-4 pr-4 pl-4">
                <label
                  for="large-input"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Agregar notas
                </label>
                <textarea
                  onInput={(e) => {
                    setNote(e.target.value);
                  }}
                  type="text"
                  id="large-input"
                  class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-rose-700 focus:border-rose-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-500"
                />
              </div>
            </div>
            <div class="flex justify-center pb-4">
              <button
                onClick={() => {
                  sendOrder();
                }}
                class="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-slate-200 rounded-lg group bg-gradient-to-br from-rose-600 to-rose-800 group-hover:from-rose-600 group-hover:to-rose-800 hover:text-slate-200 dark:text-white focus:ring-4 focus:outline-none"
              >
                <div class="flex justify-between font-roboto font-light text-lg relative px-8 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                  <p>Enviar</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default Order;
