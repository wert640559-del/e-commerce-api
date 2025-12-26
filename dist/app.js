import express, {} from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./middlewares/error.handler.js";
import { successResponse } from "./utils/response.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import orderRouter from "./routes/order.route.js";
import authRouter from "./routes/auth.route.js";
import profileRoute from "./routes/profile.route.js";
import SwaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.set("query parser", "extended"); // wajib ini agar search.name, search.min_price dan search.max_price bisa berfungsi
app.use(express.static("public"));
app.use((req, _res, next) => {
    console.log(`Request masuk: ${req.method} ${req.path}`);
    req.startTime = Date.now();
    next();
});
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
app.get("/", (_req, res) => {
    successResponse(res, "Selamat datang di API E-Commerce!", {
        hari: 3,
        status: "Server hidup",
    });
});
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRoute);
app.get(/.*/, (req, _res) => {
    throw new Error(`Route ${req.originalUrl} tidak ada di API E-Commerce`);
});
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map
