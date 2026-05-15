/**
 * Types for the Deck Cost Toronto API.
 *
 * Hand-mirrored from the canonical spec (openapi.yaml at repo root) and the
 * upstream Next.js source. Intentionally thin — anything fancier should live
 * in your application code, not the SDK.
 */

export type PriceRange = { low: number; high: number };

export type MaterialId = "pressure_treated" | "cedar" | "composite" | "pvc";
export type HeightId = "ground" | "low" | "mid" | "high";
export type RailingId = "none" | "wood" | "aluminum" | "glass" | "cable";
export type FeatureId = "pergola" | "lighting" | "bench" | "planters";

export interface MaterialSpec {
  id: MaterialId;
  label: string;
  perSqFt: PriceRange;
  blurb: string;
}

export interface HeightSpec {
  id: HeightId;
  label: string;
  multiplier: PriceRange;
  blurb: string;
}

export interface RailingSpec {
  id: RailingId;
  label: string;
  perLinearFoot: PriceRange;
  blurb: string;
}

export interface FeatureSpec {
  id: FeatureId;
  label: string;
  flat: PriceRange;
  blurb: string;
}

export interface PricingResponse {
  version: "v1";
  currency: "CAD";
  taxesIncluded: boolean;
  region: string;
  year: number;
  data: {
    materials: MaterialSpec[];
    heights: HeightSpec[];
    railings: RailingSpec[];
    features: FeatureSpec[];
    stairsPerStep: PriceRange;
    demolitionPerSqFt: PriceRange;
    permitCost: PriceRange;
    minProjectFloor: PriceRange;
    sizeBounds: { min: number; max: number; defaultLength: number; defaultWidth: number };
    stairsBounds: { min: number; max: number; default: number };
  };
}

export interface CitySummary {
  slug: string;
  name: string;
  region: string;
  population?: number;
  intro?: string;
  permitNote?: string;
  neighbourhoods?: string[];
}

export interface City extends CitySummary {
  contextNotes?: string[];
  localChallenge?: string;
  sampleBuildIntro?: string;
  workingWithBuildersHere?: string;
  seasonalBooking?: string;
}

export interface CitiesResponse {
  version: "v1";
  count: number;
  data: CitySummary[];
}

export interface CityResponse {
  version: "v1";
  data: City;
}

export interface EstimateInput {
  lengthFt: number;
  widthFt: number;
  material: MaterialId;
  height: HeightId;
  railing: RailingId;
  hasStairs: boolean;
  numSteps: number;
  features: FeatureId[];
  demolishExisting: boolean;
  includePermit: boolean;
}

export interface CostBreakdown {
  materialAndLabor: PriceRange;
  railing: PriceRange;
  stairs: PriceRange;
  features: PriceRange;
  demolition: PriceRange;
  permit: PriceRange;
}

export interface CalculatorResult {
  total: PriceRange;
  perSqFt: PriceRange;
  squareFeet: number;
  railingLinearFeet: number;
  breakdown: CostBreakdown;
  assumptions: string[];
}

export interface EstimateResponse {
  version: "v1";
  input: EstimateInput;
  data: CalculatorResult;
}

export interface ApiErrorBody {
  version: "v1";
  error: string;
  message?: string;
  issues?: Array<{ path: string; code: string; message: string }>;
  slug?: string;
}
