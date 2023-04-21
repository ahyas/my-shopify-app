import {Card, Page, Layout} from "@shopify/polaris"
import { useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ExpenseView(){
    const navigate = useNavigate()
    const {id} = useParams()
    const fetch = useAuthenticatedFetch()
    const [view, setView] = useState({
        date:"",
        category:"",
        information:"",
        value:""
    })

    useEffect(()=>{
        const loadData = async ()=> {
            await fetch(`/api/v1/expense/${id}/view`, {method:"GET", headers:{"Content-Type": "application/json"}}).then((response)=>{
                return response.json()
            }).then((data)=>{
                //console.log(data.data[0].information)
                setView({
                    date:data.data[0].date,
                    category:data.data[0].category.information,
                    information:data.data[0].information,
                    value:data.data[0].value
                })
            })
        }
        loadData()
    },[])

    const deleteExpense = async () => {
        if(window.confirm("Are you sure you want to delete this?")){
            await fetch(`/api/v1/expense/${id}/delete`, {method:"DELETE", headers:{"Content-Type": "application/json"}}).then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log(data)
                return navigate("/expense")
            })
        }
    }

    return(
        <Page
            title="View Expense"
            breadcrumbs={[{content: 'Products', url: '/expense'}]}
            subtitle="Perfect for any pet"
            primaryAction={{
                content:"Edit Expense",
                onAction:()=>navigate(`/expense/${id}/edit`)}}
            secondaryActions={[{
                content:"Delete Expense",
                destructive:true,
                onAction:()=>deleteExpense()
            }]}
        >
        
        <Layout>
            <Layout.Section>
            <Card sectioned>
                <p><b>Date :</b> {view.date}</p>
                <p><b>Category :</b> {view.category}</p>
                <p><b>Expense info :</b> {view.information}</p>
                <p><b>Value :</b> {view.value}</p>
            </Card>
            </Layout.Section>
        </Layout>
        </Page>
    )
}