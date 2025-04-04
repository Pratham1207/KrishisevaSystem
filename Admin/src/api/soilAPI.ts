const API_BASE = "http://localhost:5000/soil";

export const getAllSoils = async () => {
  const response = await fetch(`${API_BASE}`);
  return response.json();
};

export const createSoil = async (data: any) => {
  const response = await fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, ph: parseFloat(data.ph) }),
  });
  return response.json();
};

export const updateSoil = async (id: string, data: any) => {
  const response = await fetch(`${API_BASE}/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, ph: parseFloat(data.ph) }),
  });
  return response.json();
};

export const deleteSoil = async (id: string) => {
  const response = await fetch(`${API_BASE}/delete/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
