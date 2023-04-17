import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

export default function ExpenseAdd(){
    const navigate = useNavigate()
    return(
        <Page>
        <TitleBar
            title="Add Expense"
            primaryAction={
                {
                    content:"Category",
                    onAction:()=>navigate("/category")
                }
            }
            secondaryActions={[
                {
                  content: "Cancel",
                  onAction: () => navigate("/expense"),
                },
            ]}
        />
        <Layout>
            <Layout.Section>
            <Card sectioned>
                <Heading>Add expense</Heading>
                <TextContainer>
                <p>Add expense</p>
                </TextContainer>
            </Card>
            </Layout.Section>
        </Layout>
        </Page>
    )
}