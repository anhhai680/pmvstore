import axios from "axios";
import WooCommerceAPI from './WooCommerceAPI';
import { Config, Constants } from "../common/Index";


const API = new WooCommerceAPI({
  url: Config.Url,
  consumerKey: Config.Key,
  consumerSecret: Config.Secret,
  wp_api: true,
  version: 'wc/v3',
  queryStringAuth: true,
});

export const WooAPI = {
  getCategories: async () => {
    try {
      const response = await API.get('products/categories', {
        hide_empty: true,
        per_page: 100,
        order: 'desc',
        orderby: 'count'
      });
      return response.json();
    } catch (err) {
    }
  },
  getCustomerByEmail: async (email) => {
    try {
      const response = await API.get('customers', { email });
      return response.json();
    } catch (err) {
    }
  },
  getCustomerById: async (id) => {
    try {
      const response = await API.get('customers/' + id);
      return response.json();
    } catch (err) {
    }
  },
  productsByCategoryId: async (category, per_page, page) => {
    try {
      const response = await API.get('products', {
        category, per_page, page,
        purchasable: true,
      });
      return response.json();
    } catch (err) {
    }
  },
  productsByCategoryTag: async (category, tag, per_page, page) => {
    try {
      let params = { per_page, page, purchasable: true }
      if (category != '') {
        params = { ...params, category: category }
      }
      else {
        params = { ...params, tag: tag }
      }
      const response = await API.get('products', params);
      return response.json();
    } catch (err) {
    }
  },
  reviewsByProductId: async (id) => {
    try {
      const response = await API.get('products/' + id + '/reviews')
      return response.json();
    } catch (err) {
    }
  },
  createOrder: async (orderInfo) => {
    try {
      const response = await API.post('orders', orderInfo);
      return response.json();
    } catch (e) {
      console.error(e);
    }
  },
  getOrderById: async (id) => {
    try {
      const response = await API.get('orders/' + id);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  },
  getOrders: async (include, status, n_page) => {
    try {
      let params = {
        page: n_page,
        per_page: 50,
        //include,
        status
      };
      const response = await API.get('orders', params);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  },
  productsByTagId: async (tagId, per_page, page) => {
    try {
      const response = await API.get('products', {
        tag: tagId,
        per_page,
        page,
      });
      return response.json();
    } catch (err) {
    }
  },
  productsByName: async (name, per_page, page) => {
    try {
      const response = await API.get('products', {
        search: name,
        per_page,
        page
      });
      return response.json();
    } catch (err) {
    }
  },
  productSticky: async (per_page, page) => {
    try {
      const response = await API.get('products', {
        tag: Constants.tagIdBanner,
        per_page,
        page,
      });
      return response.json();
    } catch (err) {
    }
  },
  getAllProducts: async (per_page, page) => {
    try {
      let data = {
        per_page,
        page,
        order: Constants.PostList.order,
        orderby: Constants.PostList.orderby,
        status: 'publish'
      }
      const response = await API.get('products', data);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  },
  ordersByCustomerId: async (id, per_page, page) => {
    try {
      let data = {
        customer: id,
        per_page,
        page,
      }
      const response = await API.get('orders', data);
      return response.json();
    } catch (err) {
    }
  },
  createNewOrder: (data, callback, failCallBack) => {
    API.post('orders', data)
      .then((response) => response.json())
      .then((json) => {
        if (json.code === undefined)
          callback(json)
        else {
          //console.log(JSON.stringify(json))
          alert(JSON.stringify(json.message));
          typeof failCallBack == 'function' && failCallBack();
        }
      })
      .catch((err) => {
        console.error(err);
      })
  },
  getPayments: async () => {
    try {
      const response = await API.get('payment_gateways');
      return response.json();
    } catch (err) {
    }
  },
  setOrderStatus: (orderId, status, callback) => {
    API.post('orders/' + orderId, { status: status }).then((json) => {
      if (json.code === undefined)
        callback(json)
      else {
        alert(JSON.stringify(json.code))
        // console.log(JSON.stringify(json))
      }
    }).catch((error) => {
    })
  },
  productVariant: async (id) => {
    try {
      let data = {
        per_page: 50,
        page: 1
      }
      const response = await API.get('products/' + id + '/variations', data);
      //console.log("productVariant response " + response);
      return response.json();
    }
    catch (err) {
      console.error(err)
    }
  },
  getProductRelated: async (product) => {
    try {
      let data = {
        include: [product]
      }
      const response = await API.get('products', data);
      return response.json();
    }
    catch (err) {
    }
  },
  getAllCouponCode: async () => {
    try {
      const response = await API.get('coupons');
      return response.json();
    }
    catch (err) {
      console.error(err);
    }
  },
  getShippingMethod: async () => {
    try {
      const response = await API.get('shipping/zones/1/methods');
      return response.json();
    }
    catch (err) {
    }
  },
  getAttributeTerms: async (attrId, termId) => {
    try {
      const response = await API.get('products/attributes/' + attrId + '/terms/' + termId);
      return response.json();
    }
    catch (err) {
      console.error(err);
    }
  },
  getBannerSlider: () => {
    // const urlRequest = 'http://shop.phanmemvang.com.vn/wp-json/ms/v1/slider';
    // return fetch(urlRequest)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     return responseJson.data;
    //   })
    //   .catch((error) => console.error(error));
    const axiosConfig = axios.create({
      baseURL: 'http://shop.phanmemvang.com.vn/wp-json/ms/v1',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return axiosConfig.get('/slider')
      .then(function (response) {
        if (response.status === 200)
          return response.data;
        else
          throw new Error(response.statusText);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};
