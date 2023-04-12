import { Card, Page, Layout, TextContainer, Heading, IndexTable, Button } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import {useAuthenticatedFetch} from "../hooks"

export default function OrderList() {
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const [table, setTable] = useState([])

    useEffect(()=>{
        const loadData = async () => {
            await fetch("/api/orders").then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log(data)
                return setTable(data)
            })
        }
        loadData()
    },[table.length])

    const showTable = table.map(({id, order, date, customer, total},index)=>(
        <IndexTable.Row
            id={id}
            key={id}
            position={index}
        >
            <IndexTable.Cell>
            {order}
            </IndexTable.Cell>
            <IndexTable.Cell>{date}</IndexTable.Cell>
            <IndexTable.Cell>{customer}</IndexTable.Cell>
            <IndexTable.Cell>{total}</IndexTable.Cell>
        </IndexTable.Row>
    ))

    const resourceName = {
        singular: 'order',
        plural: 'orders',
      };

  return (
    <Page>
      <TitleBar
        title="Order list"
        primaryAction={{
          content: "Add order",
          onAction: () => navigate("/orders/add"),
        }}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
            <IndexTable
                resourceName={resourceName}
                itemCount={table.length}
                headings={[
                {title: 'Order'},
                {title: 'Date'},
                {title: 'Customer'},
                {title: 'Total', alignment: 'end'},
                ]}
                selectable={true}
            >
                {showTable}
            </IndexTable>
            </TextContainer>
          </Card>
        </Layout.Section>
        
      </Layout>
    </Page>
  );
}
