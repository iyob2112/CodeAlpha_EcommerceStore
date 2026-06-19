import SummaryApi from "../common"
import { toast } from 'react-toastify'
// const token = localStorage.getItem("token");
const addToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch(SummaryApi.addToCartProduct.url, {
        method: SummaryApi.addToCartProduct.method,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            productId: id,
        }),
    });

    const responseData = await response.json();

    console.log("Add to cart response:", responseData);

    if (responseData.success) {
        toast.success(responseData.message);
    }

    if (responseData.error) {
        toast.error(responseData.message);
    }

    return responseData;
};


export default addToCart