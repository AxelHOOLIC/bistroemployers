import { createSignal } from "solid-js";

const OrderCard = (props) => {
  const deleteOrder = () => {
    //console.log(props.id)
    props.setOrder(props.order.filter(dish => dish.id !== props.id));
  };

  return (
    <div>
      <div class="bg-zinc-800 rounded-md text-slate-200 flex p-2 mb-4 font-roboto">
        <div class="text-start">
          <p class="mr-2">{props.title}</p>
          {props.appetizer && <p class="text-slate-400">{props.appetizer}</p>}
        </div>
        {props.inMenu === undefined && (
          <p class="text-rose-700 font-semibold">{props.amount}</p>
        )}
        <button
          onClick={() => {deleteOrder()}}
          type="button"
          class="text-rose-800 border-2 border-rose-800 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        >
          <svg
            class="w-2 h-2"
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
  );
};

export default OrderCard;
