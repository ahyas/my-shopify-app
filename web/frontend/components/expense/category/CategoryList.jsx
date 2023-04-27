import {
    Card,
    IndexTable,
} from "@shopify/polaris";
import { useNavigate, useParams } from "react-router-dom";

export function CategoryList({category, loading}){
    const navigate = useNavigate()
    const {id} = useParams()

    const rowMarkup = category.map(
        ({ _id, information }, index) => {
          return (
            <IndexTable.Row
              id={_id}
              key={_id}
              position={index}
              onClick={() => {
                navigate(`/expense/${id}/category/${_id}/view`)
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