import { Card, Page, Layout, SkeletonBodyText, IndexTable } from "@shopify/polaris";
import { Loading } from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";
import { TestComponent } from "../components";

export default function Test(){
    const {
        data: QRCodes,
        isLoading,
        isRefetching,
      } = useAppQuery({
        url: "/api/v1/expense",
      });

      const loadingMarkup = isLoading ? (
        <Card sectioned>
          <Loading />
          <SkeletonBodyText />
        </Card>
      ) : null;

    const qrCodesMarkup = QRCodes ? (
        <TestComponent QRCodes={QRCodes.data} loading={isRefetching} />
    ) : null;

    return (
        <Page 
          title="Tests"
          subtitle="Test"
        >
            <Layout>
                <Layout.Section>
                {loadingMarkup}
                {qrCodesMarkup}
                </Layout.Section>
            </Layout>
        </Page>
    )
}