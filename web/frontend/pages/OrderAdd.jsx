import { Card, Page, Layout, TextContainer, Heading, Form, FormLayout, TextField, Button, ButtonGroup } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import React, { useState } from "react"
import {useAuthenticatedFetch} from "../hooks"

export default function OrderAdd(){
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const[form, setForm] = useState({
      id:"",
      order:"",
      date:"",
      customer:"",
      total:0
    })

    const saveOrder = async () => {
      let url = "/api/orders/save";
      const data = {
          id:form.id,
          order: form.order,
          date: form.date,
          customer: form.customer,
          total: form.total
      };
      const method ="POST"

      await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((response) => (
        response.json()
      ))
      .then((data) => {
        console.log("return ",data);
        navigate("/orders")
      });     
    }

    const resetValue = (current) => {
      return setForm((prev)=>{
        return {...prev, ...current}
      })
    }

    return(
      <Page>
      <TitleBar
        title="Add order"
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <Form onSubmit={()=>saveOrder()}>
                <FormLayout>
                    <TextField
                        label="ID"
                        value={form.id}
                        onChange={(e)=>resetValue({id:e})}
                    />
                    <TextField
                        label="Order"
                        value={form.order}
                        onChange={(e)=>resetValue({order:e})}
                    />
                    <TextField
                        label="Date"
                        value={form.date}
                        onChange={(e)=>resetValue({date:e})}
                    />
                    <TextField
                        label="Customer"
                        value={form.customer}
                        onChange={(e)=>resetValue({customer:e})}
                    />
                    <TextField
                        label="Total"
                        type="number"
                        value={form.total}
                        onChange={(e)=>resetValue({total:e})}
                    />
                    <ButtonGroup>
                        <Button onClick={()=>navigate("/orders")}>Cancel</Button>
                        <Button submit primary>Save</Button>
                    </ButtonGroup>
                </FormLayout>
              </Form>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
    )
}