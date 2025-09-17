import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFilePath = path.join(__dirname, "..", "..", "data", "products.json");
const categoriesFilePath = path.join(__dirname, "..", "..", "data", "categories.json");

export const loadProducts = () => {
  const data = fs.readFileSync(productsFilePath, "utf8");
  return JSON.parse(data);
};

export const loadCategories = () => {
  const data = fs.readFileSync(categoriesFilePath, "utf8");
  return JSON.parse(data);
};

export const saveProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};
