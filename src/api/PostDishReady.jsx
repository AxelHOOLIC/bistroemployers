import axios from "axios";

const PostDishReady = async (id, dishId) => {
  try {
    const status = await axios.post('https://bistrobackend.deno.dev/dishready', {
        id: id,
        dishId: dishId
    });
    return status;
  } catch (error) {
    console.error("err dish ready " + error);
    return false;
  }
}

export default PostDishReady