import { Pizza } from "../features/menu/MenuItem";

type Order = {
  // Define the properties of an order here
  // For example:
  // id: number;
  // name: string;
  // price: number;
};

export const isPizza = (item: unknown): item is Pizza => {
  return (
    item !== null &&
    typeof item === "object" &&
    Object.prototype.hasOwnProperty.call(item, "id") &&
    "id" in item &&
    "name" in item &&
    "unitPrice" in item &&
    "imageUrl" in item &&
    "ingredients" in item &&
    "soldOut" in item &&
    typeof item.id === "number" &&
    typeof item.name === "string" &&
    typeof item.unitPrice === "number" &&
    typeof item.imageUrl === "string" &&
    Array.isArray(item.ingredients) &&
    typeof item.soldOut === "boolean"
  );
};

const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw Error("Failed getting menu");

  const { data } = await res.json();
  if (!Array.isArray(data) || !data.every(isPizza)) {
    throw Error("Invalid data received");
  }
  return data;
}

export async function getOrder(id: string): Promise<any> {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder: Order): Promise<any> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id: string, updateObj: Partial<Order>) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
