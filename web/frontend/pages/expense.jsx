import { Card, Page, Layout, SkeletonBodyText, EmptyState } from "@shopify/polaris";
import { useNavigate, Loading } from "@shopify/app-bridge-react";
import { ExpenseList } from "../components"
import { useAppQuery } from "../hooks";

export default function Expense() {
  const navigate = useNavigate()
  const {
    data: expense,
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
    
    
  const expenseMarkup = expense?.data ? (
      <ExpenseList expense={expense.data} total={expense.total} loading={isRefetching} />
  ) : null;

  return (
    <Page 
      title="Expense"
      subtitle="Expense list"
      primaryAction={{
        content: "Create Expense",
        onAction: () => navigate("/expense/add"),
      }}
    >
      <Layout>
        <Layout.Section>
         
            {loadingMarkup}
            {expenseMarkup}
         
        </Layout.Section>
      </Layout>
    </Page>
  );
}
