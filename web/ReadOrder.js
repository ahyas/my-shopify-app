import shopify from "./shopify.js";

async function readOrder(req, res) {
  try {
    const response = await shopify.api.rest.Product.count({
      session: res.locals.shopify.session,
    });   
    
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

const getOrderList = async (req, res) => {
  try {
    const response = await shopify.api.rest.Order.all({
      session: res.locals.shopify.session,
      financial_status:"paid",
      fields: "id,line_items,name,total_price",
    });
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

const getCurrency = async (req, res) => {
  try {
    const data = await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    });
    let currency = data[0].money_format.slice(0,2)
    res.json(currency)
  } catch (error) {
    res.json(error)   
  }
}

export {readOrder, getOrderList}