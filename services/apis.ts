import { BASE_URL, ENVIRONMENT, SERVER_LOCATION } from "@/services/envConfig";

const baseUrl =
  ENVIRONMENT === "local" ? `${SERVER_LOCATION}${BASE_URL}` : BASE_URL;

export const authEndpoints = {
  LOGIN_API: `${BASE_URL}/user/login`,
  LOGOUT_API: BASE_URL + "/user/logout",
};

export const registerEndpoints = {
  REGISTER_CUSTOMER_API: `${BASE_URL}/customers`,
  GET_CUSTOMERS_API: `${BASE_URL}/customers/getCustomers`,
  SEARCH_CUSTOMER_API: `${BASE_URL}/customers/search`,
  GET_PRODUCT_TYPES_API: `${BASE_URL}/products/names`,
  GET_SKU_API: `${BASE_URL}/products/models`,
  REGISTER_WARRANTY_API: `${BASE_URL}/products/register`,
};
