import axios from "axios";

const PostOrderReady = async (id) => {
  try {
    const status = await axios.post('https://bistrobackend.deno.dev/orderready', {
      id: id
    })
    return status;
  } catch (error) {
    console.log("order ready error " + error);
    return false;
  }
}

export default PostOrderReady