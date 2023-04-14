import { Card, Page, Layout, TextContainer, Heading, IndexTable, useIndexResourceState } from "@shopify/polaris";
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

    //const {selectedResources, handleSelectionChange, allResourcesSelected} = useIndexResourceState(table)

    const handleSelected = (id, order, date, customer, total) => {
      navigate(`/orders/detail/${id}`)
    }

    const resourceName = {
      singular: 'order',
      plural: 'orders',
  };

  // const bulkActions = [
  //   {
  //     content: 'Add tags',
  //     onAction: () => console.log('Todo: implement bulk add tags'),
  //   },
  //   {
  //     content: 'Remove tags',
  //     onAction: () => console.log('Todo: implement bulk remove tags'),
  //   },
  //   {
  //     content: 'Delete orders',
  //     onAction: () => console.log('Todo: implement bulk delete'),
  //   },
  // ];

    const showTable = table.map(({id, order, date, customer, total},index)=>(
        <IndexTable.Row
            id={id}
            key={id}
            position={index}
            onClick={()=>handleSelected(id, order, date, customer, total)}
            //selected={selectedResources.includes(id)}
        >
            <IndexTable.Cell>
            {order}
            </IndexTable.Cell>
            <IndexTable.Cell>{date}</IndexTable.Cell>
            <IndexTable.Cell>{customer}</IndexTable.Cell>
            <IndexTable.Cell>{total}</IndexTable.Cell>
        </IndexTable.Row>
    ))

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
              <p>List order</p>
            <IndexTable
                resourceName={resourceName}
                itemCount={table.length}
                // selectedItemsCount={
                //   allResourcesSelected ? 'All' : selectedResources.length
                // }
                // onSelectionChange={handleSelectionChange}
                headings={[
                  {title: 'Order'},
                  {title: 'Date'},
                  {title: 'Customer'},
                  {title: 'Total', alignment: 'end'},
                ]}
                // bulkActions={bulkActions}
                // promotedBulkActions={[
                //   {
                //     content: 'Edit item',
                //     onAction: () => navigate("/orders/edit"),
                //   },
                // ]}
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
