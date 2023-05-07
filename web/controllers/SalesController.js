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

        let symbol = await currencySymbol(req, res)
        let getTotalSales = symbol+" "+sumAll.toLocaleString('en-US');
        let getPaidOrder = symbol+" "+sumPaidOrder.toLocaleString('en-US');
        let getUnpaidOrder = symbol+" "+sumUnpaidOrder.toLocaleString('en-US');
        
        res.json({total_sales:getTotalSales, total_paid:getPaidOrder, total_unpaid:getUnpaidOrder})
    } catch (error) {
        res.json(error)
    }
}

const paidInvoice = async (req, res) => {
    try {
      const data = await shopify.api.rest.Order.all({
          session: res.locals.shopify.session,
          financial_status:"paid",
          fields: "total_price",
        });

      const sum = data.reduce((accumulator, object) => {
        return accumulator + parseInt(object.total_price);
      }, 0);
      let symbol = await currencySymbol(req, res)
      let response = symbol+" "+sum.toLocaleString('en-US');
      res.json(response)
  } catch (error) {
      res.json(error)
  }
}

export {getTotalSales, paidInvoice}