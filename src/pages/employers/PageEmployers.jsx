import GetDishes, { myStore, setMyStore } from "./GetDishes";
import { RiSystemSearchEyeLine } from "solid-icons/ri";
import Fuse from "fuse.js";
import DishesCard from "./DishesCard";
import Order from "./Order";
import { BiSolidMessageSquareDetail } from 'solid-icons/bi'
import Messages from "./Messages";

import {
  For,
  createResource,
  createMemo,
  createSignal,
  Switch,
  Match,
  Show,
} from "solid-js";

const PageEmployers = () => {
  // signal to call to the api
  const [dishes, { mutate, refetch }] = createResource(GetDishes);
  const [searchQuery, setSearchQuery] = createSignal("");

  // signal to show or hide components
  const [order, setOrder] = createSignal([]);
  const [showOrder, setShowOrder] = createSignal(false);
  const [showMsg, setShowMsg] = createSignal(false);

  // check
  const fuse = createMemo(
    () =>
      new Fuse(myStore.dishes, {
        keys: ["title"], // Campos a buscar
        threshold: 0.3, // Umbral de coincidencia
      })
  );

  // FUSE TO SEARCH
  const starSearch2 = (inputValue) => {
    setSearchQuery(inputValue);
    const result = fuse()
      .search(searchQuery())
      .map((result) => result.item);
    mutate({ dishes: result });
    if (searchQuery() === "") {
      refetch();
    }
  };

  // add new dish to order
  const addOrder = (newDish) => {
    if (newDish.inMenu) {
      setOrder([...order(), newDish]);
      return;
    } else {
      const isInOrder = order().find((dish) => dish.id === newDish.id);
      if (isInOrder) {
        setOrder(
          order().map((dish) =>
            dish.id === newDish.id
              ? { ...dish, amount: dish.amount + newDish.amount }
              : dish
          )
        );
      } else {
        setOrder([...order(), newDish]);
      }
    }
  };

  return (
    <>
      <div class="m-4">
        <Show when={dishes.loading}>
          <p>Loading...</p>
        </Show>
        <Switch>
          <Match when={dishes.error}>
            <span>Error: {dishes.error}</span>
          </Match>
          <Match when={dishes()}>
            <div class="bg-zinc-800 shadow-md rounded-lg mb-4 flex md:justify-between flex-col md:flex-row p-4 md:p-8">
              <div class="flex items-center justify-center">
                <h3 class="text-slate-200 font-poppins font-bold text-xl">
                  PLATOS
                </h3>
              </div>

              <form class="flex items-center max-w-[100%] md:max-w-sm mx-0 md:mx-auto my-6 md:my-0">
                <label for="simple-search" class="sr-only">
                  Search
                </label>
                <div class="relative w-full">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <RiSystemSearchEyeLine size="1.7rem" color="#be123c" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery()}
                    onInput={(e) => starSearch2(e.target.value)}
                    id="simple-search"
                    class="bg-gray-50 ml-2 border border-slate-200 text-gray-900 text-sm rounded-lg focus:ring-rose-800 focus:border-t-rose-600 focus:border-r-rose-800 focus:border-b-rose-800 focus:border-l-rose-600 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar platos..."
                    required
                  />
                </div>
              </form>

              <div class="flex justify-center">
                <button
                  onClick={() => {
                    setShowOrder(true);
                  }}
                  class="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-slate-200 rounded-lg group bg-gradient-to-br from-rose-600 to-rose-800 group-hover:from-rose-600 group-hover:to-rose-800 hover:text-slate-200 dark:text-white focus:ring-4 focus:outline-none"
                >
                  <div class="flex justify-between font-roboto font-light text-lg relative px-8 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                    <p>orden</p>
                    <div class="w-4"></div>
                    <p>{order().length}</p>
                  </div>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <For each={dishes().dishes}>
                {(dish) =>
                  dish.meta_data.inMenu !== false && (
                    <DishesCard
                      dish={dish}
                      appetizers={myStore.appetizers}
                      addOrder={addOrder}
                    />
                  )
                }
              </For>
            </div>
          </Match>
        </Switch>
      </div>

      <div class="h-16"></div>

      {/* ORDER ELEMENT HIDDEN BY DEFAULT WITH SHOWORDER */}
      <Order
        showOrder={showOrder()}
        setShowOrder={setShowOrder}
        order={order()}
        setOrder={setOrder}
      />

      {/* MESSAGES COMPONENT */}
      <Messages showMsg={showMsg()} setShowMsg={setShowMsg} />

      {/* BUTTON MSG */}
      <div>
        <button onClick={() => {setShowMsg(true)}} class="p-2 fixed bottom-4 right-4">
          <BiSolidMessageSquareDetail size="3rem" color="#be123c" />
        </button>
      </div>
    </>
  );
};

export default PageEmployers;
