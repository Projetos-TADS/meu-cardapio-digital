import express from "express";
import cors from "cors";
import produtoRoutes from "./routes/produtoRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/produtos", produtoRoutes);
app.use("/categorias", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
