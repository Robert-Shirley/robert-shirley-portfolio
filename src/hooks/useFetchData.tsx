"use client";

import {
  QueryKey,
  QueryObserverOptions,
  useQuery,
} from "@tanstack/react-query";

type AllowedMethods = "GET" | "POST" | "PUT" | "DELETE";

const fetchData = async <TBody, UResponse>(
  url: string,
  method?: AllowedMethods,
  body?: TBody
): Promise<UResponse> => {
  const headers = {
    "Content-Type": "application/json",
  };

  const requestInit: RequestInit = {
    method: method || "GET",
    headers,
    cache: "force-cache",
  };
  if (method !== "GET") requestInit.body = JSON.stringify(body);

  const response = await fetch(url, requestInit);

  if (!response.ok) {
    try {
      const responseJson = await response.json();
      throw new Error(
        responseJson.error || responseJson.message || "Request failed"
      );
    } catch {
      throw new Error("Request failed");
    }
  }

  return response.json();
};

export const useFetchData = <TBody, UResponse>(
  url: string,
  queryKey: QueryKey,
  method?: AllowedMethods,
  body?: TBody,
  queryOptions?: Partial<QueryObserverOptions<UResponse>>
) => {
  return useQuery<UResponse, Error>({
    ...queryOptions,
    queryKey: [...queryKey, JSON.stringify(body)],
    queryFn: () => fetchData<TBody, UResponse>(url, method, body),
  });
};
