import axios from "axios";

const GetOrders = async (setter) => {
    try {
        const data = await axios.get("https://bistrobackend.deno.dev/getorders");
        setter(data.data);
        return data.data;
    } catch (error) {
        console.log("no se pudo obtener pedidos " + error);       
    }
}

export default GetOrders