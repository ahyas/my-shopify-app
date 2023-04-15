import { Card, Page, Layout, Button, ButtonGroup } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TitleBar } from "@shopify/app-bridge-react";
import {useAuthenticatedFetch} from "../hooks"

export default function OrderDetail(){
    const fetch = useAuthenticatedFetch()
    const {id} = useParams()
    const navigate = useNavigate()
    const [item, setitem] = useState([{
        id:"",
        order:"",
        date:"",
        customer:"",
        total:0
    }])

    useEffect(()=>{
        const loadData = async () => {
            await fetch(`/api/orders/${id}/detail`).then((response)=>{
                return response.json()
            }).then((data)=>{
                //console.log(data)
                return setitem(data)
            })
        }

        loadData()
    }, [])

    const showData = () => {
        return(
            <Card title="Online store dashboard" sectioned>
                <p>ID : {item[0].id}</p>
                <p>Order : {item[0].order}</p>
                <p>Date : {item[0].date}</p>
                <p>Customer : {item[0].customer}</p>
                <p>Total : {item[0].total}</p>
                <br></br>
                <ButtonGroup>
                    <Button primary onClick={()=>navigate(`/orders/edit/${id}`)}>Edit</Button>
                    <Button destructive onClick={()=>handleDelete()}>Delete</Button>
                    <Button onClick={()=>navigate("/orders/")}>Cancel</Button>
                </ButtonGroup>
            </Card>
        )
    }

    const handleDelete  = async () => {
        await fetch(`/api/orders/${id}/delete`,{method:"DELETE", headers:{"Content-Type": "application/json"}}).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data)
            navigate("/orders")
        })
    }

    return(
        <Page fullWidth>
            <TitleBar
                title="Detail order"
            />
        <Layout>
            <Layout.Section>
            
            {showData()}

            
            </Layout.Section>
        </Layout>
        </Page>
    )
}