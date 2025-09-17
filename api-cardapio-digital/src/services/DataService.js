import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDirectory = path.join(__dirname, "..", "..", "data");
const productsFilePath = path.join(dataDirectory, "products.json");
const categoriesFilePath = path.join(dataDirectory, "categories.json");

class DataService {
  async _readFile(filePath) {
    try {
      const data = await fs.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw new Error(`Erro ao ler o arquivo: ${filePath}`);
    }
  }

  async _writeFile(filePath, data) {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error(`Erro ao escrever no arquivo: ${filePath}`);
    }
  }

  loadProducts() {
    return this._readFile(productsFilePath);
  }

  saveProducts(products) {
    return this._writeFile(productsFilePath, products);
  }

  loadCategories() {
    return this._readFile(categoriesFilePath);
  }
}

export default new DataService();
