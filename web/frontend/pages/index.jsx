import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  SkeletonBodyText,
  Badge,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";

import { useAuthenticatedFetch, useNavigate, Loading } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";
import { ProductsCard } from "../components";
import { useAppQuery } from "../hooks";

export default function HomePage() {

const {data:sales, isLoading:salesLoading} = useAppQuery({
    url:`/api/v1/order/get_paid_order`
})

const getTotalSales = () => {
  return sales ? (
    <Card sectioned >
      <Stack>
        <Stack.Item fill>
          <Heading>Total Sales</Heading>
        </Stack.Item>
        <Stack.Item>
          <Heading>{sales.total_sales}</Heading>
        </Stack.Item>
      </Stack>
      <Stack>
        <Stack.Item fill>
          <p>Paid Invoice</p>
        </Stack.Item>
        <Stack.Item>
          <p>{sales.total_paid}</p>
        </Stack.Item>
      </Stack>
      <Stack>
        <Stack.Item fill>
          <p>Unpaid Invoice</p>
        </Stack.Item>
        <Stack.Item>
          <p>{sales.total_unpaid}</p>
        </Stack.Item>
      </Stack>
    </Card>
  ) : null
}

const loadingMarkup = salesLoading ? (
  <Card sectioned>
    <Loading />
    <SkeletonBodyText />
  </Card>
) : null;

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card sectioned>
          <Stack>
            <Stack.Item fill>
              <Heading>Profit / Loss</Heading>
            </Stack.Item>
            <Stack.Item>
              <Badge>Paid</Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge>Fulfilled</Badge>
            </Stack.Item>
          </Stack>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
            {loadingMarkup}
            {getTotalSales()}
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card sectioned >
          <Stack>
            <Stack.Item fill>
              <Heading>Expense</Heading>
            </Stack.Item>
            <Stack.Item>
              <Badge>Paid</Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge>Fulfilled</Badge>
            </Stack.Item>
          </Stack>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card sectioned >
          <Stack>
            <Stack.Item fill>
              <Heading>Payments</Heading>
            </Stack.Item>
            <Stack.Item>
              <Badge>Paid</Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge>Fulfilled</Badge>
            </Stack.Item>
          </Stack>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card sectioned >
          <Stack>
            <Stack.Item fill>
              <Heading>Acc. Receivable / Payable</Heading>
            </Stack.Item>
            <Stack.Item>
              <Badge>Paid</Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge>Fulfilled</Badge>
            </Stack.Item>
          </Stack>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card sectioned >
          <Stack>
            <Stack.Item fill>
              <Heading>Purchase</Heading>
            </Stack.Item>
            <Stack.Item>
              <Badge>Paid</Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge>Fulfilled</Badge>
            </Stack.Item>
          </Stack>
          </Card>
        </Layout.Section>
        
        <Layout.Section oneHalf>
          <Card sectioned >
          <Stack>
            <Stack.Item fill>
              <Heading>Cash/Bank Fund Transfer</Heading>
            </Stack.Item>
            <Stack.Item>
              <Badge>Paid</Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge>Fulfilled</Badge>
            </Stack.Item>
          </Stack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Nice work on building a Shopify app 🎉</Heading>
                  <p>
                    Your app is ready to explore! It contains everything you
                    need to get started including the{" "}
                    <Link url="https://polaris.shopify.com/" external>
                      Polaris design system
                    </Link>
                    ,{" "}
                    <Link url="https://shopify.dev/api/admin-graphql" external>
                      Shopify Admin API
                    </Link>
                    , and{" "}
                    <Link
                      url="https://shopify.dev/apps/tools/app-bridge"
                      external
                    >
                      App Bridge
                    </Link>{" "}
                    UI library and components.
                  </p>
                  
                  <p>
                    Ready to go? Start populating your app with some sample
                    products to view and test in your store.{" "}
                  </p>
                  <p>
                    Learn more about building out your app in{" "}
                    <Link
                      url="https://shopify.dev/apps/getting-started/add-functionality"
                      external
                    >
                      this Shopify tutorial
                    </Link>{" "}
                    📚{" "}
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImage}
                    alt="Nice work on building a Shopify app"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
