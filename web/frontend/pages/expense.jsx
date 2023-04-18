import { Card, Page, Layout, DataTable, Heading } from "@shopify/polaris";
import { TitleBar, useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";

export default function Expense() {
  const fetch = useAuthenticatedFetch()
  const navigate = useNavigate()
  const [table, setTable] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(()=>{
    const loadData = () => {
      fetch("/api/v1/expense", {method:"GET", headers:{"Content-Type": "application/json"}}).then((response)=>{
      return response.json()
    }).then((data)=>{
      console.log(data.data)
      setTotal(data.total[0].sum_val)
      setTable(data.data)
    })
  }
    loadData()
  },[table.length])

  const showData = () => {
    return table.map((row)=>{
      let list = {
        information:row.information,
        value:row.value,
      }
      let result = Object.values(list)
      return result
    })
  }

  return (
    <Page>
      <TitleBar
        title="Expense"
        primaryAction={{
          content: "Add",
          onAction: () => navigate("/expense/add"),
        }}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Expense list</Heading>
            <DataTable
              columnContentTypes={[
                'text',
                'numeric',
              ]}
              headings={[
                '',
                '',
              ]}
              rows={showData()}
              totals={['', total]}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
