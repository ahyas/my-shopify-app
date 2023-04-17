import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

export default function Category(){
    const navigate = useNavigate()
    return(
        <Page>
        <TitleBar
            title="Category list"
            primaryAction={
                {
                  content: "Add",
                  onAction: () => navigate("/expense/category/add"),
                }
            }
            secondaryActions={[
                {
                    content:"Cancel",
                    onAction: () => navigate("/expense/add")
                }
            ]}
        />
        <Layout>
            <Layout.Section>
            <Card sectioned>
                <Heading>Category list</Heading>
                <TextContainer>
                <p>Category list</p>
                </TextContainer>
            </Card>
            </Layout.Section>
        </Layout>
        </Page>
    )
}