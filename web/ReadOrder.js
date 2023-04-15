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
      status: "any",
    });
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

export {readOrder, getOrderList}