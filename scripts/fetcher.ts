// import { signOut } from "@/auth";
// import { getToken } from "@/utils/getToken";
// import Axios, { type AxiosError, type AxiosRequestConfig } from "axios";

// export const AXIOS_INSTANCE = Axios.create({
//   baseURL: "",
// });

// AXIOS_INSTANCE.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await signOut();
//     }
//     return Promise.reject(error);
//   },
// );

// export const customInstance = async <T>(
//   config: AxiosRequestConfig,
//   options?: AxiosRequestConfig,
// ): Promise<T> => {
//   const accessToken = getToken();

//   try {
//     const res = await AXIOS_INSTANCE({
//       ...config,
//       ...options,
//       headers: {
//         ...config.headers,
//         ...options?.headers,
//         Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
//       },
//     });

//     return res.data;
//   } catch (err) {
//     console.error("API error:", config.url, err);
//     throw err;
//   }
// };

// export type ErrorType<Error> = AxiosError<Error>;
// export type BodyType<BodyData> = BodyData;

import { mockDB } from "@/mock/db";

export const customInstance = async <T>(config: {
  url?: string;
  method?: string;
  data?: any;
  params?: any;
}): Promise<T> => {
  const url = config.url ?? "";
  const method = config.method ?? "GET";

  // ✅ BASE DATA
  const coinReport = mockDB["/coin-report"];

  // ================================
  // ✅ 1. FAVORITE TOGGLE
  // /coin-report/:slug/favorite
  // ================================
  if (url.includes("/favorite")) {
    const parts = url.split("/");
    const slug = parts[2];

    const item = coinReport.data.find((i: any) => i.slug === slug);

    if (!item) {
      throw new Error(`COIN NOT FOUND: ${slug}`);
    }

    item.is_favorite = !item.is_favorite;

    return { success: true } as T;
  }
  if (url.startsWith("/portfolios/") && method === "DELETE") {
    const id = url.split("/")[2];

    const list = mockDB["/portfolios"].data;

    const index = list.findIndex((p: any) => p.id === id);

    if (index === -1) {
      throw new Error(`PORTFOLIO NOT FOUND: ${id}`);
    }

    list.splice(index, 1);

    return { success: true } as T;
  }
  if (url.startsWith("/coins/") && url.endsWith("/price")) {
    const slug = url.split("/")[2]?.toUpperCase();

    const coinReport = mockDB["/coin-report"];
    const coin = coinReport.data.find((c: any) => c.symbol === slug);

    if (!coin) {
      throw new Error("COIN NOT FOUND");
    }

    return {
      data: {
        slug: coin.slug,
        symbol: coin.symbol,
        price: coin.current_price,
      },
    } as T;
  }
  if (url === "/coins") {
    let result = [...mockDB["/coins"].data];

    const query = config.params?.filters?.query?.toLowerCase();

    if (query) {
      result = result.filter(
        (c: any) =>
          c.name.toLowerCase().includes(query) ||
          c.symbol.toLowerCase().includes(query),
      );
    }

    return {
      data: result,
    } as T;
  }
  if (url === "/portfolio-transactions" && method === "POST") {
    const tx = config.data;

    const db = mockDB["/portfolio-transactions"];

    const newTx = {
      id: String(Date.now()),
      ...tx,
    };

    db.data.push(newTx);

    return { data: newTx } as T;
  }
  if (url.startsWith("/portfolio-transactions/") && method === "PUT") {
    const id = url.split("/")[2];
    const db = mockDB["/portfolio-transactions"];

    const index = db.data.findIndex((t: any) => t.id === id);

    if (index === -1) {
      throw new Error("TX NOT FOUND");
    }

    db.data[index] = {
      ...db.data[index],
      ...config.data,
    };

    return { data: db.data[index] } as T;
  }
  // ================================
  // ✅ 2. DETAIL PAGE (DYNAMIC ROUTE)
  // /coin-report/:slug
  // ================================
  if (url.startsWith("/coin-report/") && url.split("/").length === 3) {
    const slug = url.split("/")[2];

    const item = coinReport.data.find((i: any) => i.slug === slug);

    if (!item) {
      throw new Error(`COIN NOT FOUND: ${slug}`);
    }

    return {
      data: item,
    } as T;
  }

  // ================================
  // ✅ 3. LIST (WITH OPTIONAL FILTERS)
  // /coin-report
  // ================================
  if (url === "/coin-report") {
    let result = [...coinReport.data];

    // from params OR query object (both supported)
    const filters = config.params?.filters ?? config.params ?? {};

    // favorite filter
    if (filters.is_favorite === true) {
      result = result.filter((i: any) => i.is_favorite);
    }

    // package filter (optional future-proof)
    if (filters.package) {
      result = result.filter((i: any) => i.packages === filters.package);
    }

    // category filter
    if (filters.category) {
      result = result.filter((i: any) => i.category === filters.category);
    }

    return {
      data: result,
      meta: {
        total_count: result.length,
        next_update: Date.now() + 10000,
      },
    } as T;
  }

  // ================================
  // ❌ FALLBACK (STATIC MOCKS)
  // ================================
  const data = mockDB[url as keyof typeof mockDB];

  if (!data) {
    throw new Error(`MOCK NOT FOUND: ${url}`);
  }

  return data as T;
};
