import { Card, Page, Layout, Form, FormLayout, TextField, Button, Select, DatePicker } from "@shopify/polaris";
import { useAuthenticatedFetch, useNavigate, } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useState } from "react";

export default function ExpenseAdd(){
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const [category, setCategory] = useState([])
    const [form, setForm] = useState({
            category:"",
            date:"",
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
    
    const saveExpense = async () => {
        await fetch("/api/v1/expense/save",{method:"POST", body:JSON.stringify(form), headers:{ "Content-Type": "application/json" }}).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data.msg)
            navigate("/expense")
        })
    }
    //show current date to display
    let currentDate = new Date()
    let currentMonth = currentDate.getMonth()
    let currentYear = currentDate.getFullYear()

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
        resetValue({date:date})
    }

    return(
        <Page
            title="Add Expense"
            breadcrumbs={[{content: 'Products', url: '/expense'}]}
            subtitle="Perfect for any pet"
            primaryAction={{
                content:"Add Category",
                onAction:()=>navigate("/category")}}
        >
        
        <Layout>
            <Layout.Section>
            <Card sectioned>
                <Form onSubmit={()=>saveExpense()}>
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
                     <DatePicker
                        month={month}
                        year={year}
                        onChange={(e)=>formatDate(e)}
                        onMonthChange={handleMonthChange }
                        
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
                        value={form.value}
                        min={0}
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