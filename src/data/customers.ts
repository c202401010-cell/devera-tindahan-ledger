export const SEED = [
    {id: "c1", name: "Elijah Luis Bes", balance:340, lastPaid: "Wala na! Bayot man siya"},
    {id: "c2", name: "Joachim Ray Chiong", balance:1250.5, lastPaid: "Wala na! Bayot man siya"},
    {id: "c3", name: "Kendall Bryant Maputi", balance:0, lastPaid: "Wala na! Bayot man siya"},
]

export type Customer = {
  id: string;
  name: string;
  balance: number;
  lastPaid: string;
};

const BASE = process.env.EXPO_PUBLIC_API_URL;

function timeout(ms: number): Promise<never> {
  return new Promise((_, fail) =>
    setTimeout(() => fail(new Error("timeout")), ms)
  );
}

async function get(path: string) {
  if (!BASE) {
    throw new Error("Set EXPO_PUBLIC_API_URL in .env");
  }

  const res = await Promise.race([fetch(BASE + path), timeout(8000)]);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

export const fetchCustomers = (): Promise<Customer[]> => get("/api/customers");