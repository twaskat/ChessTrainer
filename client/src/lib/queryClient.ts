import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

// Type for AI chess insights
export interface ChessInsight {
  insight: string;
  tip: string;
  concept: string;
  error?: string;
}

export interface ChessInsightRequest {
  fen: string;
  move?: string;
  notation?: string;
  previousMove?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

/**
 * Fetch chess insights from the OpenAI API for a given position and move
 */
export async function getChessInsights(request: ChessInsightRequest): Promise<ChessInsight> {
  try {
    const response = await apiRequest('POST', '/api/chess/insights', request);
    return await response.json();
  } catch (error: any) {
    console.error('Error fetching chess insights:', error);
    return {
      insight: 'Unable to generate insights at this time.',
      tip: 'Please continue with the tutorial.',
      concept: 'Error occurred.',
      error: error.message || 'Unknown error'
    };
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
