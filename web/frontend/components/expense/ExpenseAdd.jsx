import { Card, Page, Layout, Form, FormLayout, TextField, Button, Select, DatePicker, Link } from "@shopify/polaris";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppQuery, useShopCurrency } from "../../hooks";
import { useForm, useField, notEmptyString, } from "@shopify/react-form"

export default function ExpenseAdd(){
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const currency = useShopCurrency()
    let currentDate = new Date()
    let y = currentDate.getFullYear()
    let m = currentDate.getMonth()+1
    let d = currentDate.getDate()
    let a = y+"-"+m+"-"+d

    const [selectedDate, setSelectedDate] = useState(a)

    const {
        fields:{
            category,
            information,
            date,
            value
        },
        submit
    } = useForm({
        fields: {
            category: useField({
                value: 0,
                validates: (category)=>{
                 if(category===0){
                    return "Choose category"
                 }   
                },
            }),
            information: useField({
                value: "",
                validates: [notEmptyString("Please provide information detail")],
            }),
            date: useField(
                {
                    value:selectedDate,
                    validates:[notEmptyString("Please provide information detail")]
                }
            ),
            value: useField({
                value: 0,
                validates: (value)=>{
                    if(value === 0 || value===""){
                        return "Please provide information detail"
                    }
                },
            })
            },
            onSubmit: useCallback(async(form)=>{
                    await fetch("/api/v1/expense/save",{method:"POST", body:JSON.stringify(form), headers:{ "Content-Type": "application/json" }}).then((response)=>{
                        return response.json()
                    }).then((data)=>{
                        console.log(data.msg)
                        navigate("/expense")
                    })
                    return {status: 'success'};
                },[])
              
        });

    const {data:list_category, isLoading:loadingCategory} = useAppQuery({url:`/api/v1/category`})
    
    const category_option =  list_category?.data ? 
        [{
            label:"Choose Category",
            value:0,
        },...list_category.data.map((row)=>{
            const options = {
                label:row.information,
                value:row._id,
            }
            return options
        })]
     : []
    
    let currentMonth = currentDate.getMonth()
    let currentYear = currentDate.getFullYear()

    const [{month, year}, setDate] = useState({month: currentMonth, year: currentYear});

    const handleMonthChange = useCallback((month, year) => setDate({month, year}),
    []
    )
    
    const formatDate = (e) => {
        let create_date = new Date(e.start)
        let y = create_date.getFullYear()
        let m = create_date.getMonth()+1
        let d = create_date.getDate()
        let a = y+"-"+m+"-"+d
        setSelectedDate(a)
    }

    return(
        <Page
            title="Add Expense"
            breadcrumbs={[{content: 'Products', url: '/expense'}]}
            subtitle="Perfect for any pet"
        >
        
        <Layout>
            <Layout.Section>
            <Card sectioned actions={[
                {
                    content: "Add new category",
                    onAction:()=> navigate("/expense/category")
                }
            ]}>
                <Form>
                <FormLayout>
                    <Select
                        {...category}
                        label="Category"
                        options={category_option}
                        disabled={loadingCategory}
                    />
                    <TextField
                        {...information}
                        label="Information"
                    />
                     <DatePicker
                        month={month}
                        year={year}
                        onChange={(e)=>formatDate(e)}
                        onMonthChange={handleMonthChange }
                        selected={currentDate}
                    />
                    <TextField
                        {...date}
                        label="Date"
                        readOnly
                        //value={selectedDate}
                    />
                    <TextField
                        {...value}
                        label="Value"
                        type="number"
                        prefix={currency}
                        min={0}
                    />
                        <Button onClick={submit} primary fullWidth>Save</Button>
                </FormLayout>
              </Form>
            </Card>
            </Layout.Section>
        </Layout>
        </Page>
    )
}