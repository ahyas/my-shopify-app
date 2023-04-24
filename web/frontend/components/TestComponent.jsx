import {
    Card,
    IndexTable,
  } from "@shopify/polaris";

export function TestComponent({ QRCodes, loading }) {
    console.log(QRCodes)
    const rowMarkup = QRCodes.map(
      ({ _id, information, date, value }, index) => {
  
        /* The form layout, created using Polaris components. Includes the QR code data set above. */
        return (
          <IndexTable.Row
            id={_id}
            key={_id}
            position={index}
            onClick={() => {
              console.log("klik");
            }}
          >
            <IndexTable.Cell>{information}</IndexTable.Cell>
            <IndexTable.Cell>{date}</IndexTable.Cell>
            <IndexTable.Cell>{value}</IndexTable.Cell>
          </IndexTable.Row>
        );
      }
    );
  
    /* A layout for small screens, built using Polaris components */
    return (
      <Card>
          <IndexTable
            itemCount={QRCodes.length}
            headings={[
              { title: "Discount" },
              { title: "Scans" },
              { title: "Value" },
            ]}
            selectable={false}
            loading={loading}
          >
            {rowMarkup}
          </IndexTable>
      </Card>
    );
  }