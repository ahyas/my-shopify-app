import { Card, Page, Layout, Form, FormLayout, Button, TextField} from "@shopify/polaris";
import { useAuthenticatedFetch, useNavigate, Loading } from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppQuery } from "../../../hooks";

export function CategoryEdit(){
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const {id_category, id} = useParams()
    const {data:category, isLoading} = useAppQuery({url:`/api/v1/category/${id_category}/view`}) 
    const [form, setForm] = useState({
        information:category?.data[0].information
    })

    const loadingMarkup = isLoading ? (
        <Card sectioned>
          <Loading />
          <SkeletonBodyText />
        </Card>
      ) : null;

    const resetValue = (current) => {
        return setForm((prev)=>{
            return {...prev, ...current}
        })
    }

    const updateCategory = useCallback(async()=>{
        await fetch(`/api/v1/category/${id_category}/update`, {method:"PATCH", body:JSON.stringify(form), headers:{ "Content-Type": "application/json" }}).then((response)=>{
            return response.json()
        }).then((data)=>{
            return typeof id !== 'undefined' ? navigate(`/expense/${id}/category`) : navigate(`/expense/category`)
        })
        console.log(form.information)
    })
    
    if(isLoading){
        return(
            {loadingMarkup}
        )
    }

    return(
        <Page
            title="Edit Category"
            breadcrumbs={[{content: 'Back', onAction:()=>id ? navigate(`/expense/${id}/category`) : navigate(`/expense/category`)}]}
        >
        <Layout>
            <Layout.Section>
            <Card sectioned>
            <Form onSubmit={updateCategory}>
                <FormLayout>
                    <TextField
                        label="Category"
                        onChange={(e)=>resetValue({information:e})}
                        value={form.information}
                    />
                    <Button submit primary fullWidth>Update</Button>
                </FormLayout>
              </Form>
            </Card>
            </Layout.Section>
        </Layout>
        </Page>
    )
}