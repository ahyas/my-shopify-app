import { Card, Page, Layout, Form, FormLayout, TextField, Button, Select, DatePicker, Link } from "@shopify/polaris";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ExpenseEdit(){
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const [category, setCategory] = useState([])
    const [form, setForm] = useState([{
        date:"",
        category:"",
        information:"",
        value:""
    }])
    const {id} = useParams()
    let currentDate = new Date()
    let currentMonth = currentDate.getMonth()
    let currentYear = currentDate.getFullYear()
    const [dateValue, setDateValue] = useState({date:currentDate})
    useEffect(()=>{
        const loadData = async () => {
            await fetch(`/api/v1/expense/${id}/edit`, {method:"PUT", headers:{"Content-Type": "application/json" }}).then((response)=>{
                return response.json()
            }).then((data)=>{
                setDateValue({date:new Date(data.data[0].date)})
                setForm({
                    date:data.data[0].date,
                    category:data.data[0].id_category,
                    information:data.data[0].information,
                    value:data.data[0].value    
                })
            })
        }
        loadData()
    },[form.length])

    const resetValue = (current) => {
        return setForm((prev)=>{
            return {...prev, ...current}
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
        ))
        .then((data) => {
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
                        options={showCategory()}
                        onChange={(e)=>resetValue({category:e})}
                        value={form.category}
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