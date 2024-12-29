import axios from "axios";
import { createStore } from "solid-js/store"

export const [myStore, setMyStore] = createStore({dishes: [], appetizers: []});

const GetDishes = async (id) => {
  try {
    const dishes = await axios.get("https://bistrobackend.deno.dev/getdishes");
    const menu = await axios.get("https://bistrobackend.deno.dev/getmenu");
    const data = {dishes: [...dishes.data, ...menu.data.dishes], appetizers: [...menu.data.appetizers]};
    setMyStore(data);
    return  myStore;
  } catch (error) {
    console.log("no se pudo obtener platos " + error);
    return ;
  }
};

export default GetDishes;