import express from "express";
import cors from "cors";
import produtoRoutes from "./routes/produtoRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.use("/products", produtoRoutes);
app.use("/categories", categoryRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
