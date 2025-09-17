import { API_URL } from "./config";

async function fetchWithTimeout(resource, { timeout = 8000, ...options } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(resource, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export async function getProducts({ categoryId, searchTerm = "" }) {
  try {
    const url = new URL(`${API_URL}/products`);

    if (categoryId) {
      url.searchParams.append("categoria_id", categoryId);
    }
    if (searchTerm) {
      url.searchParams.append("name", searchTerm);
    }

    const res = await fetchWithTimeout(url.toString(), { timeout: 8000 });
    const json = await res.json().catch(() => ({}));

    if (!res.ok || !json?.success) {
      const msg = json?.message || `Erro HTTP ${res.status}`;
      throw new Error(msg);
    }

    return json.data;
  } catch (err) {
    console.error("[getProducts] Falha ao buscar produtos:", err);
    throw err.name === "AbortError"
      ? new Error("Tempo de conexão excedido. Verifique a rede/URL da API.")
      : err;
  }
}
