import { Card, Page, Layout, DataTable, Link } from "@shopify/polaris";
import { TitleBar, useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";

export default function Category(){
    const fetch = useAuthenticatedFetch()
    const [table, setTable] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        const loadData = async () => {
                await fetch("/api/v1/category", {method:"GET", headers:{"Content-Type": "application/json"}}).then((response)=>{
                return response.json()
            }).then((data)=>{
                setTable(data.data)
            })
        }
        loadData()
    },[table.length])

    const showData = () => {
        return table.map((row)=>{
            let list = [
                <Link
                    removeUnderline
                    url="https://www.example.com"
                    key={row._id}
                >
                    {row.information}
                </Link>
            ]
            
            return list
        })
    }

    return(
        <Page>
        <TitleBar
            title="Category list"
            primaryAction={
                {
                  content: "Add",
                  onAction: () => navigate("/expense/category/add"),
                }
            }
            secondaryActions={[
                {
                    content:"Back",
                    onAction: () => navigate("/expense/add")
                }
            ]}
        />
        <Layout>
            <Layout.Section>
            <Card sectioned>
                <DataTable
                    columnContentTypes={[
                        'text',
                    ]}
                    headings={[
                        'Category',
                    ]}
                    rows={showData()}
                />
            </Card>
            </Layout.Section>
        </Layout>
        </Page>
    )
}