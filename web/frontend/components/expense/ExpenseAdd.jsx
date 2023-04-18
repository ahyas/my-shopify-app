import { Card, Page, Layout, Form, FormLayout, TextField, Button, Select } from "@shopify/polaris";
import { TitleBar, useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";

export default function ExpenseAdd(){
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const [category, setCategory] = useState([])
    const [form, setForm] = useState({
            category:"0",
            information:"",
            value:0,
        })

    const resetValue = (current) => {
        return setForm((prev)=>{
            return {...prev,...current}
        })
    }    

    useEffect(()=>{
        const loadCategory = async () => {
            await fetch("/api/v1/category",{method:"GET", headers: {"Content-Type": "application/json"}}).then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log(data.data)
                return setCategory(data.data)
            })
        }
        loadCategory()
    },[category.length])

    const showCategory = () => {
        return category.map((row)=>{
            const options = {
                label:row.information,
                value:row._id,
            }
            return options
        })
    }

    showCategory()

    return(
        <Page>
        <TitleBar
            title="Add Expense"
            primaryAction={
                {
                    content:"Category",
                    onAction:()=>navigate("/category")
                }
            }
            secondaryActions={[
                {
                    content: "Cancel",
                    onAction: () => navigate("/expense"),
                },
            ]}
        />
        <Layout>
            <Layout.Section>
            <Card sectioned>
                <Form onSubmit={()=>saveOrder()}>
                <FormLayout>
                    <Select
                        label="Category"
                        options={showCategory()}
                        onChange={(e)=>resetValue({category:e})}
                        value={form.category}
                    />
                    <TextField
                        label="Information"
                        onChange={(e)=>resetValue({information:e})}
                        value={form.information}
                    />
                    <TextField
                        label="Value"
                        type="number"
                        onChange={(e)=>resetValue({value:e})}
                        value={form.value}
                    />
                        <Button submit primary fullWidth>Save</Button>
                </FormLayout>
              </Form>
            </Card>
            </Layout.Section>
        </Layout>
        </Page>
    )
}