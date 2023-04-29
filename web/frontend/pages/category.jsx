import { Card, Page, Layout, SkeletonBodyText } from "@shopify/polaris";
import { Loading } from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";
import { CategoryList } from "../components";
import { useNavigate, useParams } from "react-router-dom";

export default function Category(){
    const navigate = useNavigate()
    const {id} = useParams()
    console.log(id)
    const {
        data: category,
        isLoading,
        isRefetching,
      } = useAppQuery({
        url: "/api/v1/category",
      });
    
      const loadingMarkup = isLoading ? (
        <Card sectioned>
          <Loading />
          <SkeletonBodyText />
        </Card>
      ) : null;

    const expenseMarkup = category?.data ? (
        <CategoryList category={category.data} loading={isRefetching} />
    ) : null;

    return(
        <Page
            title="Category list"
            subtitle="Category list"
            primaryAction={
                {
                content: "Add New",
                onAction: () => {typeof id !== 'undefined' ? navigate(`/expense/${id}/category/add`) : navigate("/expense/category/add")},
                }
            }
            breadcrumbs={[{content: 'Back', onAction:()=>{typeof id !== 'undefined' ? navigate(`/expense/${id}/edit`) : navigate("/expense/add")}}]}
        >
        <Layout>
            <Layout.Section>
            {loadingMarkup}
            {expenseMarkup}
            </Layout.Section>
        </Layout>
        </Page>
    )
}