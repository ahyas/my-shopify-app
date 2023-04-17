import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

export default function CategoryAdd(){
    const navigate = useNavigate()
    return(
        <Page>
        <TitleBar

            title="Add Category"
            secondaryActions={[
                {
                  content: "Cancel",
                  onAction: () => navigate("/expense/add"),
                },
            ]}
        />
        <Layout>
            <Layout.Section>
            <Card sectioned>
                <Heading>Add Category</Heading>
                <TextContainer>
                <p>Add category</p>
                </TextContainer>
            </Card>
            </Layout.Section>
        </Layout>
        </Page>
    )
}