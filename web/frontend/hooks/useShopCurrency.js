import { useEffect, useState } from "react"

export const useShopCurrency = (fetch) => {
    const [currency, setCurrency] = useState("")
    useEffect(()=>{
        const getCurrency = async () => {
          await fetch("/api/test_api/get_currency", {method:"GET", headers:{"Content-Type": "application/json"}}).then((response)=>{
            return response.json()
          }).then((data)=>{
            return setCurrency(data)
          })
        }
        getCurrency()
    },[])

    return currency
}