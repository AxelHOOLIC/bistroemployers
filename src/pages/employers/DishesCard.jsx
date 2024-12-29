import { createSignal } from "solid-js";
import { FaSolidCirclePlus, FaSolidCircleMinus } from "solid-icons/fa";
import { IoFastFoodSharp } from "solid-icons/io";

const DishesCard = (props) => {
  //counter for dishes
  const [count, setCount] = createSignal(1);
  const [appetizer, setAppetizer] = createSignal("");
  const [errors, setErrors] = createSignal(false);

  const ErrorMessage = (props) => (
    <span class="font-roboto mb-2 text-sm font-medium text-rose-500">
      {props.error}
    </span>
  );

  const decrease = () => {
    if (count() === 1) {
      return;
    }
    setCount(count() - 1);
  };

  // creation of the new dish and add to order (page employers)
  const addDishToOrder = (title, id) => {
    if (props.dish.meta_data.inMenu !== undefined ) {
      if (appetizer() === "") {
        setErrors(true);
        return ;
      }
      const newDish = {
        title: title,
        appetizer: appetizer(),
        inMenu: true,
        dish_id: id,
        id: self.crypto.randomUUID(),
        status: false,
        amount: 1
      }
      props.addOrder(newDish);
      setAppetizer("");
      return ;
    }
    
    const newDish = {
      title: title,
      dish_id: id,
      id: self.crypto.randomUUID(),
      status: false,
      amount: count()
    }
    props.addOrder(newDish);
    setCount(1);
    return ;
  };

  return (
    <div className="bg-zinc-800 text-slate-200 p-4 rounded-md font-roboto">
      <div className="flex items-center">
        <IoFastFoodSharp size="1.5rem" color="#e2e8f0" />
        <span class="ml-2">{props.dish.title}</span>
        {props.dish.meta_data.inMenu === undefined && (
          <div className="flex items-center ml-auto">
            <button
              onClick={() => {
                decrease();
              }}
              className="text-blue-500"
            >
              <FaSolidCircleMinus size="1.5rem" color="#0ea5e9" />
            </button>
            <span className="mx-2 text-2xl">{count()}</span>
            <button
              onClick={() => {
                setCount(count() + 1);
              }}
              className="text-blue-500"
            >
              <FaSolidCirclePlus size="1.5rem" color="#e11d48" />
            </button>
          </div>
        )}
      </div>
      {props.dish.meta_data.inMenu !== undefined && (
        <div class="mt-5">
          <select
            id="appetizer"
            name="appetizer"
            required
            value={appetizer()}
            onInput={(e) => {setAppetizer(e.target.value), setErrors(false)}}
            class="font-roboto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled selected value="">
              Selecciona una entrada
            </option>
            <For each={props.appetizers}>
              {(a) => a.meta_data.inMenu && (
                <option class="font-roboto" value={a.title}>
                  {a.title}
                </option>
              )}
            </For>
          </select>
          {errors() && <ErrorMessage error="Selecciona una opción" />}
        </div>
      )}
      <div class="flex justify-center mt-4">
        <button onClick={() => {addDishToOrder(props.dish.title, props.dish.id)}} class="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-slate-200 rounded-lg group bg-gradient-to-br from-rose-600 to-rose-800 group-hover:from-rose-600 group-hover:to-rose-800 hover:text-slate-200 dark:text-white focus:ring-4 focus:outline-none focus:ring-rose-600 dark:focus:ring-pink-800">
          <span class="font-roboto relative px-8 py-2.5 transition-all ease-in duration-75 bg-zinc-800 rounded-md group-hover:bg-opacity-0">
            Agregar
          </span>
        </button> 
      </div>
    </div>
  );
};

export default DishesCard;
