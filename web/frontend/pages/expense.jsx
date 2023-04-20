import { Card, Page, Layout, Link, Heading, IndexTable } from "@shopify/polaris";
import { useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";
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
      if(data.data.length>0){
        setTotal(data.total[0].sum_val)
        setTable(data.data)
      }
    })
  }
    loadData()
  },[table.length])

  const rowMarkup = table.map(
    (
      {_id, information, date, value}, index
    ) => (
      <IndexTable.Row id={_id} key={_id} position={index}>
        <IndexTable.Cell>
          <Link
              dataPrimaryLink
              onClick={() => navigate(`/expense/${_id}/view`)}
          >
            {information}
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{value}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

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
          <Card sectioned>
            <Heading >Total expense {total}</Heading>
          </Card>
          <Card sectioned>
            <Heading>Expense list</Heading>
            <IndexTable
              itemCount={table.length}
              headings={[
                {title: 'Expense'},
                {title: 'Date'},
                {title: 'Value'}
              ]}
              selectable={true}
            >
              {rowMarkup}
            </IndexTable>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
