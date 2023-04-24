import { useShopCurrency } from "../../hooks"
import {
    Card,
    IndexTable,
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

export function ExpenseList({expense, total, loading}){
    const navigate = useNavigate()
    const currency = useShopCurrency()
   
    const showTotal = () =>{ 
        if(total.length > 0){
            return (<p>{currency} {total[0].sum_val}</p>)
        }else{
            return (null)
        }
    }
    const rowMarkup = expense.map(
        ({ _id, information, category, date, value }, index) => {
          return (
            <IndexTable.Row
              id={_id}
              key={_id}
              position={index}
              onClick={() => {
                navigate(`/expense/${_id}/view`);
              }}
            >
            <IndexTable.Cell>{information}</IndexTable.Cell>
            <IndexTable.Cell>{category.information}</IndexTable.Cell>
            <IndexTable.Cell>{date}</IndexTable.Cell>
            <IndexTable.Cell>{currency} {value}</IndexTable.Cell>
            </IndexTable.Row>
          );
        }
      );

    return(
        <>
            <Card title="Total" sectioned>
                {showTotal()}
            </Card>
            <Card title="Expense list" sectioned>
              <IndexTable
                itemCount={expense.length}
                headings={[
                  { title: "Transaction" },
                  { title: "Category" },
                  { title: "Date" },
                  { title: "Value" },
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