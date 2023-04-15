import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar, useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useEffect } from "react";

export default function PageName() {
  const fetch = useAuthenticatedFetch()
  
  useEffect(()=>{
    const loadData = async () => {
      await fetch("/admin/api/2023-04/orders.json?status=any",{method:"GET", headers: { "Content-Type": "application/json" }}).then((response)=>{
        response.json()
      }).then((data)=>{
        console.log(data)
      })

      loadData()

    }
  },[])

  return (
    <Page>
      <TitleBar
        title="Page name"
        primaryAction={{
          content: "Primary action",
          onAction: () => console.log("Primary action"),
        }}
        secondaryActions={[
          {
            content: "Secondary action",
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>My Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
