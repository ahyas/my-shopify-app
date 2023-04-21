// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import {readOrder, getOrderList} from "./ReadOrder.js";
import {ShowOrder, SaveOrder, EditOrder, UpdateOrder, DetailOrder, DeleteOrder} from "./controllers/OrderController.js";
import { ExpenseShow, ExpenseSave, ExpenseView } from "./controllers/ExpenseController.js"; 
import {CategoryShow, CategorySave} from "./controllers/CategoryController.js"
import connectDB from "./ConnectDB.js";
import "dotenv/config.js"
import GDPRWebhookHandlers from "./gdpr.js";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.get("/api/test_api", readOrder)
app.get("/api/test_api/list_order", getOrderList)

app.get("/api/orders", ShowOrder)
app.post("/api/orders/save", SaveOrder)
app.put("/api/orders/:id/edit", EditOrder)
app.get("/api/orders/:id/detail", DetailOrder)
app.patch("/api/orders/:id/update", UpdateOrder)
app.delete("/api/orders/:id/delete", DeleteOrder)

app.get("/api/v1/expense", ExpenseShow)
app.post("/api/v1/expense/save", ExpenseSave)
app.get("/api/v1/expense/:id/view", ExpenseView)
app.put("/api/v1/expense/:id/edit", ExpenseView)

app.get("/api/v1/category", CategoryShow)
app.post("/api/v1/category/save", CategorySave)

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT, () => {
  connectDB(process.env.URI)
  console.log(`Server running on port ${PORT}`)
});
