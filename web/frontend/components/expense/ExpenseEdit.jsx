import { Card, Page, Layout, Loading, Form, FormLayout, TextField, Button, Select, DatePicker, Link } from "@shopify/polaris";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppQuery, useShopCurrency } from "../../hooks";

export default function ExpenseEdit(){
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const currency = useShopCurrency()
    const {id} = useParams()
    
    const {data:expense} = useAppQuery({url:`/api/v1/expense/${id}/view`})
    
    const [form, setForm] = useState({
        date:expense?.data? expense.data[0].date:null,
        category:expense?.data? expense?.data[0].id_category : null,
        information:expense?.data? expense?.data[0].information : null,
        value:expense?.data? expense?.data[0].value : 0
    })
    
    let currentDate = new Date(form.date)
    let currentMonth = currentDate.getMonth()
    let currentYear = currentDate.getFullYear()
    const [dateValue, setDateValue] = useState({date:currentDate})
    
    const {data:category, isLoading:loadingCategory} = useAppQuery({url:`/api/v1/category`})
    
    const category_option =  category?.data ? 
        category.data.map((row)=>{
            const options = {
                label:row.information,
                value:row._id,
            }
            return options
        })
     : []

    const resetValue = (current) => {
        return setForm((prev)=>{
            return {...prev, ...current}
        })
    }

    const [{month, year}, setDate] = useState({month: currentMonth, year: currentYear});
    
    const handleMonthChange = useCallback((month, year) => setDate({month, year}),
    []
    )

    const formatDate = (e) => {
        
        let selectedDate = new Date(e.start)
        let year = selectedDate.getFullYear()
        let month = selectedDate.getMonth()+1
        let day = selectedDate.getDate()
        let date = year+"-"+month+"-"+day
        setDateValue({date:""})//clear selected date
        resetValue({date:date})
    }

    const updateExpense = async () => {
        let url = `/api/v1/expense/${id}/update`;
        const data = {
            date:form.date,
            id_category:form.category,
            information:form.information,
            value:form.value  
        };
        const method ="PATCH"

        await fetch(url, {
            method,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        }).then((response) => (
            response.json()
        )).then((data) => {
            console.log("return ",data);
            navigate(`/expense`)
        }); 
        
    }

    return(
        <Page
            title="Edit Expense"
            breadcrumbs={[{content: 'Products', url: `/expense/${id}/view`}]}
            subtitle="Perfect for any pet"
        >
        
        <Layout>
            <Layout.Section>
            <Card sectioned>
                <Form onSubmit={()=>updateExpense()}>
                <FormLayout>
                    <Select
                        label="Category"
                        options={category_option}
                        onChange={(e)=>resetValue({category:e})}
                        value={form.category}
                        disabled={loadingCategory}
                        helpText={<Link onClick={()=>navigate(`/expense/${id}/category`)} removeUnderline>Add new category</Link>}
                    />
                    <TextField
                        label="Information"
                        onChange={(e)=>resetValue({information:e})}
                        value={form.information}
                    />
                     <DatePicker
                        month={month}
                        year={year}
                        onChange={(e)=>formatDate(e)}
                        onMonthChange={handleMonthChange }
                        selected={dateValue.date}
                    />
                    <TextField
                        label="Date"
                        readOnly
                        value={form.date}
                    />
                    <TextField
                        label="Value"
                        type="number"
                        onChange={(e)=>resetValue({value:e})}
                        prefix={currency}
                        value={form.value}
                        min={0}
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