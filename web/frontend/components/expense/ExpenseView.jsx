import {Card, Page, Layout} from "@shopify/polaris"
import { useAuthenticatedFetch } from "@shopify/app-bridge-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ExpenseView(){
    const {id} = useParams()
    const fetch = useAuthenticatedFetch()
    const [view, setView] = useState([])

    useEffect(()=>{
        const loadData = async ()=> {
            await fetch(`/api/v1/expense/${id}/view`, {method:"GET", headers:{"Content-Type": "application/json"}}).then((response)=>{
                return response.json()
            }).then((data)=>{
                //console.log(data.data)
                setView(data.data)
            })
        }
        loadData()
    },[])
    //console.log(view)
    const showData = () => {
        return view.map((data)=>{
            return(
                <>
                    <p key={data._id}>{data.date}<br></br>{data.category.information}<br></br>{data.information}<br></br>{data.value}</p>
                </>
            )
        })
    }

    return(
        <Page
            title="View Expense"
            breadcrumbs={[{content: 'Products', url: '/expense'}]}
            subtitle="Perfect for any pet"
            primaryAction={{
                content:"Edit Expense",
                onAction:()=>console.log("Edit")}}
            secondaryActions={[{
                content:"Delete Expense",
                destructive:true,
                onAction:()=>console.log("delete")
            }]}
        >
        
        <Layout>
            <Layout.Section>
            <Card sectioned>
                {showData()}
            </Card>
            </Layout.Section>
        </Layout>
        </Page>
    )
}