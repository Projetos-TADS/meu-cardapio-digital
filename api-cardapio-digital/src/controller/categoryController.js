import { loadCategories } from "../services/DataService.js";

export const getAllCategories = (req, res) => {
  try {
    const categories = loadCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).send("Erro ao carregar categorias.");
  }
};
