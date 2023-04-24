import {Card, Page, Layout, SkeletonBodyText} from "@shopify/polaris"
import { useNavigate, Loading, useAuthenticatedFetch } from "@shopify/app-bridge-react"
import { useParams } from "react-router-dom"
import { useAppQuery } from "../../hooks"

export default function ExpenseView(){
    const navigate = useNavigate()
    const {id} = useParams()
    const fetch = useAuthenticatedFetch()
    
    const {
        data: expense,
        isLoading,
      } = useAppQuery({
        url: `/api/v1/expense/${id}/view`,
      });

      const loadingMarkup = isLoading ? (
        <Card sectioned>
          <Loading />
          <SkeletonBodyText />
        </Card>
      ) : null;

      const getExpenseView = (data) => {
        return(
            <>
                <Card title="Expense info" sectioned>
                    <p><b>Date :</b> {data[0].date}</p>
                    <p><b>Category :</b> {data[0].category.information}</p>
                    <p><b>Expense info :</b> {data[0].information}</p>
                    <p><b>Value :</b> {data[0].value}</p>
                </Card>
            </>
        )
      }
    
      const expenseView = expense ? (
        getExpenseView(expense.data)
      ) : null;

    const deleteExpense = async () => {
        if(confirm("Are you sure you want to delete this?")){
            await fetch(`/api/v1/expense/${id}/delete`, {method:"DELETE", headers:{"Content-Type": "application/json"}}).then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log(data)
                return navigate("/expense")
            })
        }
    }

    return(
        <Page
            title="View Expense"
            breadcrumbs={[{content: 'Products', url: '/expense'}]}
            subtitle="Perfect for any pet"
            primaryAction={{
                content:"Edit Expense",
                onAction:()=>navigate(`/expense/${id}/edit`)}}
            secondaryActions={[{
                content:"Delete Expense",
                destructive:true,
                onAction:()=>deleteExpense()
            }]}
        >
        
        <Layout>
            <Layout.Section>
                {loadingMarkup}
                {expenseView}
            </Layout.Section>
        </Layout>
        </Page>
    )
}