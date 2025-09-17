import DataService from "../services/DataService.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await DataService.loadCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
