import { Card, Page, Layout, Form, FormLayout, Button, TextField} from "@shopify/polaris";
import { useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CategoryAdd(){
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const {id} = useParams()
    
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
            return id ? navigate(`/expense/${id}/category`) : navigate(`/expense/category`)
        })
    }
    return(
        <Page
            title="Add Category"
            breadcrumbs={[{content: 'Products', onAction:()=>id ? navigate(`/expense/${id}/category`) : navigate(`/expense/category`)}]}
        >
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