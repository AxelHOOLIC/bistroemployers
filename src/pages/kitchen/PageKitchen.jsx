import { createEffect, createSignal, For } from "solid-js";
import { FaSolidSquareCheck } from 'solid-icons/fa'
import { io } from "socket.io-client";
import GetOrders from "../../api/GetOrders";
import PostOrderReady from "../../api/PostOrderReady";
import PostDishReady from "../../api/PostDishReady";

const PageKitchen = () => {
  // conection to socket to send messages
  const socket = io("https://bistrobackend.deno.dev");

  // list of all orders
  const [orders, setOrders] = createSignal([]);

  // call to getorders
  GetOrders(setOrders);

  // 
  socket.on("newOrder", (order) => {
    setOrders([order, ...orders()])
  });

  // update the dish when is ready
  const updateDishStatus = (orderId, itemId) => {
    const status = PostDishReady(orderId, itemId);
    if (status) {
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              order: order.order.map((item) => {
                if (item.id === itemId) {
                  console.log(item.id);
                  return { ...item, status: true };
                }
                return item;
              }),
            };
          }
          return order;
        });
      });
    } else {
      console.error("err dish status");
    }
  }

  // update the order when is all ready
  const updateOrderStatus = (orderId) => {
    const status = PostOrderReady(orderId);
    if (status) {
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order, status: true,
            };
          }
          return order;
        });
      });
    } else {
      //socket.emit("msg", "ups! Ubo un problema");
      console.error("err order status");
    }
  }

  return (
    <>
      <div class="m-4">
        <div class="bg-zinc-800 shadow-md rounded-lg mb-4 flex md:justify-between flex-col md:flex-row p-4 md:p-4">
          <div class="flex items-center justify-center">
            <h3 class="text-slate-200 font-poppins font-bold text-xl">
              PLATOS
            </h3>
          </div>

          <div class="flex justify-center">
            <button
              onClick={() => {
                GetOrders(setOrders);
              }}
              class="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-slate-200 rounded-lg group bg-gradient-to-br from-rose-600 to-rose-800 group-hover:from-rose-600 group-hover:to-rose-800 hover:text-slate-200 dark:text-white focus:ring-4 focus:outline-none"
            >
              <div class="flex justify-between font-roboto font-light text-lg relative px-8 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                <p>Actualizar</p>
              </div>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <For each={orders()}>
            {(order) => !order.status && (
              <div class="bg-zinc-800 rounded-md p-2 text-slate-300 font-roboto">
                <div class="">
                  <h1 class="font-poppins text-lg text-center uppercase">
                    {order.table !== "pedido" ? "mesa" : ""} {order.table}
                  </h1>
                  <p class="uppercase">Nota: {order.notes}</p>
                </div>
                <div class="border border-zinc-800 bg-zinc-700 p-2 rounded-md">
                  <For each={order.order}>
                    {(o) => (
                      <>
                        <div class="flex justify-between"  classList={{checked: o.status}}>
                          <div>
                            <p>
                              - {o.title} X {o.amount}
                            </p>
                            {o.inMenu ? <p class="ml-6">{o.appetizer}</p> : <p></p>}
                          </div>
                          <div>
                            <button onClick={() => {updateDishStatus(order.id, o.id)}}>
                              <FaSolidSquareCheck size="2rem" class="mt-2" color="#fda4af" />
                            </button>
                          </div>
                        </div>
                        <div class="border-dashed border mt-1 border-zinc-800"></div>
                      </>
                    )}
                  </For>
                </div>
                <div class="flex justify-center mt-4">
                  <button
                    onClick={() => {updateOrderStatus(order.id)}}
                    class="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-slate-200 rounded-lg group bg-gradient-to-br from-rose-600 to-rose-800 group-hover:from-rose-600 group-hover:to-rose-800 hover:text-slate-200 dark:text-white focus:ring-4 focus:outline-none focus:ring-rose-600 dark:focus:ring-pink-800"
                  >
                    <span class="font-roboto relative px-8 py-2.5 transition-all ease-in duration-75 bg-zinc-800 rounded-md group-hover:bg-opacity-0">
                      Preparado
                    </span>
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </>
  );
};

export default PageKitchen;
