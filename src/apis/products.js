import axios from "axios";

// const show = () =>
//   axios.get(
//     "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
//   );
const show = slug => axios.get(`products/${slug}`);

const fetch = params => axios.get("products", { params });

const productsApi = { show, fetch };

export default productsApi;
