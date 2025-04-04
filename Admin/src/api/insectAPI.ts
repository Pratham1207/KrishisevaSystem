const API_BASE = "http://localhost:5000/insects"; 

export const getAllInsects = async () => {
  const response = await fetch(`${API_BASE}`);
  return response.json();
};

export const createInsect = async (data: any) => {
  const response = await fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateInsect = async (id: string, data: any) => {
  const response = await fetch(`${API_BASE}/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteInsect = async (id: string) => {
  const response = await fetch(`${API_BASE}/delete/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
