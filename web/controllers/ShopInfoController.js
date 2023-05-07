import shopify from "../shopify.js";

const currencySymbol = async (req, res) => {
    try {
        const data = await shopify.api.rest.Shop.all({
            session: res.locals.shopify.session,
        });
        let response = data[0].money_format.slice(0,2)
        return response
    } catch (error) {
        return error
    }
}

  export {currencySymbol}