import DataService from "../services/DataService.js";
import Product from "../models/produtoModel.js";
import {
  isPositiveInt,
  normalizeSku,
  validateNewProductPayload,
  validateUpdateProductPayload,
} from "../utils/validators.js";

export const getAllProducts = async (req, res, next) => {
  try {
    let products = await DataService.loadProducts();
    const { categoria_id, name } = req.query;

    if (categoria_id) {
      products = products.filter((p) => p.categoria_id === categoria_id);
    }

    if (name) {
      products = products.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
    }

    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!isPositiveInt(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido. Use um inteiro positivo.",
      });
    }

    const products = await DataService.loadProducts();
    const found = products.find((p) => p.id === String(id));

    if (!found) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado.",
      });
    }
    return res.json({ success: true, data: found });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const errors = validateNewProductPayload(req.body);
    if (errors.length) {
      return res.status(400).json({ success: false, message: "Payload inválido.", errors });
    }

    const products = await DataService.loadProducts();
    const skuNorm = normalizeSku(req.body.sku);

    if (products.some((p) => normalizeSku(p.sku) === skuNorm)) {
      return res.status(409).json({ success: false, message: "Já existe produto com este SKU." });
    }

    const lastId = products.reduce((maxId, product) => Math.max(Number(product.id), maxId), 0);
    const newId = String(lastId + 1);

    const newProduct = new Product({
      id: newId,
      ...req.body,
      sku: skuNorm,
    });

    products.push(newProduct);
    await DataService.saveProducts(products);

    return res.status(201).json({
      success: true,
      message: "Produto criado com sucesso.",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isPositiveInt(Number(id))) {
      return res
        .status(400)
        .json({ success: false, message: "ID inválido. Use um inteiro positivo." });
    }

    const payloadErrors = validateUpdateProductPayload(req.body);
    if (payloadErrors.length) {
      return res
        .status(400)
        .json({ success: false, message: "Payload inválido.", errors: payloadErrors });
    }

    const products = await DataService.loadProducts();
    const idx = products.findIndex((p) => p.id === id);

    if (idx === -1) {
      return res.status(404).json({ success: false, message: "Produto não encontrado." });
    }

    const updatedProduct = { ...products[idx], ...req.body };

    if (req.body.sku) {
      const newSkuNorm = normalizeSku(req.body.sku);
      const dupSku = products.some((p, i) => i !== idx && normalizeSku(p.sku) === newSkuNorm);
      if (dupSku) {
        return res.status(409).json({ success: false, message: "Já existe produto com este SKU." });
      }
      updatedProduct.sku = newSkuNorm;
    }

    products[idx] = updatedProduct;
    await DataService.saveProducts(products);

    return res.json({
      success: true,
      message: "Produto atualizado com sucesso.",
      data: products[idx],
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isPositiveInt(Number(id))) {
      return res
        .status(400)
        .json({ success: false, message: "ID inválido. Use um inteiro positivo." });
    }

    const products = await DataService.loadProducts();
    const idx = products.findIndex((p) => p.id === id);

    if (idx === -1) {
      return res.status(404).json({ success: false, message: "Produto não encontrado." });
    }

    const removed = products.splice(idx, 1);
    await DataService.saveProducts(products);

    return res.json({ success: true, message: "Produto removido com sucesso.", data: removed[0] });
  } catch (error) {
    next(error);
  }
};
