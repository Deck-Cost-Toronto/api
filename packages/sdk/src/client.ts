import type {
  ApiErrorBody,
  CitiesResponse,
  CityResponse,
  EstimateInput,
  EstimateResponse,
  PricingResponse,
} from "./types.js";

export interface DeckCostClientOptions {
  /**
   * Override the API origin. Defaults to https://deckcosttoronto.com.
   * Useful for staging / local-dev (e.g. http://localhost:3210).
   */
  baseUrl?: string;
  /**
   * Optional custom fetch — defaults to the runtime's global. Pass a
   * polyfill if you're on a runtime without one.
   */
  fetch?: typeof fetch;
}

const DEFAULT_BASE_URL = "https://deckcosttoronto.com";

/**
 * Error thrown for any non-2xx response. The `body` field carries the
 * decoded JSON error envelope when available (the API always returns
 * `{ version, error, message?, issues? }`).
 */
export class DeckCostApiError extends Error {
  readonly status: number;
  readonly body: ApiErrorBody | undefined;

  constructor(status: number, body: ApiErrorBody | undefined, message?: string) {
    super(message ?? body?.message ?? body?.error ?? `HTTP ${status}`);
    this.name = "DeckCostApiError";
    this.status = status;
    this.body = body;
  }
}

/**
 * Tiny client for https://deckcosttoronto.com/api/v1/*.
 *
 * Zero dependencies. No retry, no caching, no auth (none needed). If you
 * want any of that, wrap this in your own layer — it's intentionally
 * boring.
 */
export class DeckCostClient {
  readonly baseUrl: string;
  private readonly fetcher: typeof fetch;

  constructor(opts: DeckCostClientOptions = {}) {
    this.baseUrl = (opts.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.fetcher = opts.fetch ?? globalThis.fetch;
    if (!this.fetcher) {
      throw new Error(
        "DeckCostClient: no global fetch found. Pass `fetch` in the constructor options.",
      );
    }
  }

  /** GET /api/v1/pricing */
  getPricing(): Promise<PricingResponse> {
    return this.get<PricingResponse>("/api/v1/pricing");
  }

  /** GET /api/v1/cities */
  getCities(): Promise<CitiesResponse> {
    return this.get<CitiesResponse>("/api/v1/cities");
  }

  /** GET /api/v1/cities/{slug} */
  getCity(slug: string): Promise<CityResponse> {
    if (!slug) throw new Error("getCity: slug is required");
    return this.get<CityResponse>(`/api/v1/cities/${encodeURIComponent(slug)}`);
  }

  /** POST /api/v1/estimate */
  async estimate(input: EstimateInput): Promise<EstimateResponse> {
    const res = await this.fetcher(`${this.baseUrl}/api/v1/estimate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    return this.parse<EstimateResponse>(res);
  }

  private async get<T>(path: string): Promise<T> {
    const res = await this.fetcher(`${this.baseUrl}${path}`, { method: "GET" });
    return this.parse<T>(res);
  }

  private async parse<T>(res: Response): Promise<T> {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = undefined;
    }
    if (!res.ok) {
      throw new DeckCostApiError(res.status, body as ApiErrorBody | undefined);
    }
    return body as T;
  }
}
