import {
  Card,
  Page,
  Layout,
  Stack,
  Heading,
  SkeletonBodyText,
  Button,
  Badge,
  Link
} from "@shopify/polaris";

import { Loading, useNavigate } from "@shopify/app-bridge-react";

import { useAppQuery, useShopCurrency } from "../hooks";

export default function HomePage() {
const navigate = useNavigate();
const currency = useShopCurrency()

const {data:sales, isLoading:salesLoading} = useAppQuery({
    url:`/api/v1/order/get_paid_order`
})

const {data:total_sales} = useAppQuery({
  url:"/api/v1/order/find"
})

const {data:expense, isLoading:expenseLoading} = useAppQuery({
  url: "/api/v1/expense",
});

const findTotalSales = (filter) => {
  let date = new Date()
  let yy = date.getFullYear()
  let mm = date.getMonth()+1
  let dd = date.getDate()
  let today = new Date(yy+"-"+mm+"-"+dd) 

  if(filter === "TODAY"){
    var startNewDate =today
    var endNewDate = new Date()
  }else if(filter === "YESTERDAY"){
    var startNewDate = new Date(new Date().setDate(today.getDate() - 1))
    var endNewDate = new Date(new Date().setDate(today.getDate() - 1))
  }else if(filter === "LAST_7_DAYS"){
    var startNewDate = new Date(new Date().setDate(today.getDate() - 7))
    var endNewDate = new Date() 
  }else if(filter === "LAST_30_DAYS"){
    var startNewDate =new Date(new Date().setDate(today.getDate() - 30)) 
    var endNewDate = new Date()
  }else if(filter === "LAST_MONTH"){
    var startNewDate = new Date(today.getFullYear(), today.getMonth()-1, 1)
    var endNewDate =  new Date(new Date().setDate(0))
  }else if(filter === "MONTH_TO_DATE"){
    var startNewDate = new Date(today.getFullYear(), today.getMonth(), 1)
    var endNewDate =  new Date()
  }
  
  let list = []
  let start_date = startNewDate 
  let end_date = endNewDate 
  
  total_sales.data.map((row, index)=>{
    let a = {index:index, name:row.name, total_price:row.total_price, shipping:row.total_shipping_price_set.shop_money.amount, created_at:row.created_at}
    list.push(a)
  })

  let filtered = list.filter((obj)=>{
    let aDate = new Date(obj.created_at)
    return aDate.getTime() >= start_date.getTime() && aDate.getTime()<=end_date.getTime()
  })
 
 let sum = filtered.reduce((accumulator, object)=>{
  return accumulator + parseInt(object.total_price)
 },0)

 return console.log(sum)

}

const getProfit = () => {
  return sales && expense ? (
  <Card sectioned>
    <Stack>
      <Stack.Item fill>
        <Heading>Profit / Loss</Heading>
      </Stack.Item>
      <Stack.Item>
        <span><b>{currency} {(sales.total_sales - expense.total).toLocaleString('en-US')}</b></span>
      </Stack.Item>
    </Stack>
  </Card>
  ) : null;
}

const getTotalSales = () => {
  return sales ? (
    <Card sectioned >
      <Stack>
        <Stack.Item fill>
        </Stack.Item>
        <Stack.Item>
          <Link onClick={()=>navigate(`/expense`)}>Add transaction</Link>
        </Stack.Item>
      </Stack>
      <Stack>
        <Stack.Item fill>
          <Heading>Total Income</Heading>
        </Stack.Item>
        <Stack.Item>
          <Heading>{currency} {sales.total_sales.toLocaleString('en-US')}</Heading>
        </Stack.Item>
      </Stack>
      <Stack>
        <Stack.Item fill>
          <p>Paid Invoice</p>
        </Stack.Item>
        <Stack.Item>
          <p>{currency} {sales.total_paid.toLocaleString('en-US')}</p>
        </Stack.Item>
      </Stack>
      <Stack>
        <Stack.Item fill>
          <p>Unpaid Invoice</p>
        </Stack.Item>
        <Stack.Item>
          <p>{currency} {sales.total_unpaid.toLocaleString('en-US')}</p>
        </Stack.Item>
      </Stack>
    </Card>
  ) : null
}

const getTotalExpense = () => {
  return expense ? (
    <Card sectioned >
      <Stack>
        <Stack.Item fill>
        </Stack.Item>
        <Stack.Item>
          <Link onClick={()=>navigate(`/expense`)}>Add transaction</Link>
        </Stack.Item>
      </Stack>
      <Stack>
        <Stack.Item fill>
          <Heading>Total Expense</Heading>
        </Stack.Item>
        <Stack.Item>
          <span><b>{currency} {expense.total.toLocaleString('en-US')}</b></span>
        </Stack.Item>
      </Stack>
    </Card>
  ) : null;
}

const loadingMarkup = salesLoading ? (
  <Card sectioned>
    <Loading />
    <SkeletonBodyText />
  </Card>
) : null;

const loadingExpenseMarkup = expenseLoading ? (
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
            <Stack.Item>
              <Badge status="attention">
                <Button onClick={
                  ()=>findTotalSales("TODAY")
                } 
                  size="small" 
                  plain
                >
                Today
                </Button>
            </Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge status="attention">
                <Button 
                  onClick={()=>findTotalSales("YESTERDAY")} 
                  size="small" 
                  plain
                >
                  Yesterday
                </Button>
              </Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge status="attention">
                <Button 
                  onClick={()=>findTotalSales("LAST_7_DAYS")} 
                  size="small" 
                  plain
                >
                  Last 7 Days
                </Button>
              </Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge status="attention">
                <Button 
                  onClick={()=>findTotalSales("MONTH_TO_DATE")} 
                  size="small" 
                  plain
                >
                  Month to date
                </Button>
              </Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge status="attention">
                <Button 
                  onClick={()=>findTotalSales("LAST_30_DAYS")} 
                  size="small" 
                  plain
                >
                  Last 30 Days
                </Button>
              </Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge status="attention">
                <Button 
                  onClick={()=>findTotalSales("LAST_MONTH")} 
                  size="small" 
                  plain
                >
                  Last Month
                </Button>
              </Badge>
            </Stack.Item>
            <Stack.Item>
              <Badge status="attention">
                <Button 
                  onClick={()=>findTotalSales("ALL")} 
                  size="small" 
                  plain
                >
                  All
                </Button>
              </Badge>
            </Stack.Item>
          </Stack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          {getProfit()}
        </Layout.Section>

        <Layout.Section oneHalf>
          {loadingMarkup}
          {getTotalSales()}
        </Layout.Section>

        <Layout.Section oneHalf>
          {loadingExpenseMarkup}
          {getTotalExpense()}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
