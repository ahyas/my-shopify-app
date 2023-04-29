import { useAppQuery } from "./useAppQuery"

export const useShopCurrency = () => {
    const {data:currency} = useAppQuery({url:`/api/test_api/get_currency`})
    return currency
}