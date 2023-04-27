import { Card, Page, Layout, SkeletonBodyText} from "@shopify/polaris"
import { Loading, useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react"
import { useParams } from "react-router-dom";
import { useAppQuery } from "../../../hooks";

export function CategoryView(){
    const {id_category, id} = useParams()
    const fetch = useAuthenticatedFetch()
    const navigate = useNavigate()
    const {
        data: category,
        isLoading,
    } = useAppQuery({
        url: `/api/v1/category/${id_category}/view`,
    });

    const loadingMarkup = isLoading ? (
        <Card sectioned>
          <Loading />
          <SkeletonBodyText />
        </Card>
      ) : null;

      const getCategoryView = (data) => {
        console.log(data.data)
        return(
            <>
                <Card title="Category name" sectioned>
                    <p>{data.data[0].information}</p>
                </Card>
            </>
        )
      }
    
      const categoryView = category?.data ? (
        //console.log(category)
        getCategoryView(category)
      ) : null;

      const deleteCategory = async () => {
        if(confirm("Are you sure you want to delete this?")){
            await fetch(`/api/v1/category/${id_category}/delete`, {method:"DELETE", headers:{"Content-Type": "application/json"}}).then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log(data.count)
                if(data.count === 0 ){
                    return navigate(`/expense/${id}/category`)
                }else{
                    alert("Failed. This category has already been used")
                }
            })
        }
      }

    return(
        <Page
            title="View Category"
            breadcrumbs={[{content: 'Back', url: `/expense/${id}/category`}]}
            subtitle="Perfect for any pet"
            primaryAction={{
                content:"Edit Category",
                onAction:()=>navigate(`/expense/${id}/edit`)}}
            secondaryActions={[{
                content:"Delete Category",
                destructive:true,
                onAction:()=>deleteCategory()
            }]}
        >
        
        <Layout>
            <Layout.Section>
                {loadingMarkup}
                {categoryView}
            </Layout.Section>
        </Layout>
        </Page>
    )
}