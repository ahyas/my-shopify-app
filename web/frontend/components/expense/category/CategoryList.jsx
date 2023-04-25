import {
    Card,
    IndexTable,
} from "@shopify/polaris";

export function CategoryList({category, loading}){
   
    const rowMarkup = category.map(
        ({ _id, information }, index) => {
          return (
            <IndexTable.Row
              id={_id}
              key={_id}
              position={index}
              onClick={() => {
               console.log("");
              }}
            >
                <IndexTable.Cell>{information}</IndexTable.Cell>
            </IndexTable.Row>
          );
        }
      );

    return(
        <>
            <Card sectioned>
              <IndexTable
                itemCount={category.length}
                headings={[
                  { title: "Category" }
                ]}
                selectable={true}
                loading={loading}
              >
                {rowMarkup}
              </IndexTable>
            </Card>
        </>
    )
}