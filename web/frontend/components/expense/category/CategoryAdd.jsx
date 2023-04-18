import { Card, Page, Layout, Form, FormLayout, Button, TextField} from "@shopify/polaris";
import { TitleBar, useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";
import { useState } from "react";

export default function CategoryAdd(){
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const [form, setForm] = useState({
        information:""
    })
    const resetValue = (current) => {
        return setForm((prev)=>{
            return {...prev, ...current}
        })
    }
    const saveCategory = async () => {
        await fetch("/api/v1/category/save", {method:"POST", body:JSON.stringify(form), headers:{"Content-Type": "application/json"}}).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data.msg)
            return navigate("/category")
        })
    }
    return(
        <Page>
        <TitleBar

            title="Add Category"
            secondaryActions={[
                {
                  content: "Back",
                  onAction: () => navigate("/expense/add"),
                },
            ]}
        />
        <Layout>
            <Layout.Section>
            <Card sectioned>
            <Form onSubmit={()=>saveCategory()}>
                <FormLayout>
                    <TextField
                        label="Category"
                        onChange={(e)=>resetValue({information:e})}
                        value={form.information}
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