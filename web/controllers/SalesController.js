import shopify from "../shopify.js";
import { currencySymbol } from "./ShopInfoController.js";

const getTotalSales = async (req, res) => {
    try {
        const data = await shopify.api.rest.Order.all({
            session: res.locals.shopify.session,
            financial_status:"any",
            fields: "total_price",
          });

        const paidOrder = await shopify.api.rest.Order.all({
          session: res.locals.shopify.session,
          financial_status:"paid",
          fields: "total_price",
        });

        const unpaidOrder = await shopify.api.rest.Order.all({
          session: res.locals.shopify.session,
          financial_status:"unpaid",
          fields: "total_price",
        });

        const sumPaidOrder = paidOrder.reduce((accumulator, object) => {
          return accumulator + parseInt(object.total_price);
        }, 0);

        const sumUnpaidOrder = unpaidOrder.reduce((accumulator, object) => {
          return accumulator + parseInt(object.total_price);
        }, 0);

        const sumAll = data.reduce((accumulator, object) => {
          return accumulator + parseInt(object.total_price);
        }, 0);
        
        res.json({total_sales:sumAll, total_paid:sumPaidOrder, total_unpaid:sumUnpaidOrder})
    } catch (error) {
        res.json(error)
    }
}
const getListOfOrder = async (req, res) => {
  try {
    const resource = await shopify.api.rest.Order.all({
      session: res.locals.shopify.session,
      financial_status:"any",
      fields:"name, total_price, total_shipping_price_set, created_at"
    });
    res.json({data:resource})
  } catch (error) {
    res.json(error)
  }
}

export {getTotalSales, getListOfOrder }