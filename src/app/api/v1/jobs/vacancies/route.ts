import { NextRequest, NextResponse } from "next/server";
import { getJobsService } from "@/jobs";
import type { VacancyFeedQuery, WorkFormat, EmploymentType } from "@/jobs";

/**
 * GET /api/v1/jobs/vacancies
 * Query: localityId, regionId, workFormat, employmentType, query, salaryFrom, limit, offset
 * Demo vacancies until employer auth + DB exist.
 */
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const query: VacancyFeedQuery = {
      localityId: sp.get("localityId") || null,
      regionId: sp.get("regionId") || null,
      workFormat: parseWorkFormat(sp.get("workFormat")),
      employmentType: parseEmployment(sp.get("employmentType")),
      query: sp.get("query") || undefined,
      salaryFrom: parseOptionalNumber(sp.get("salaryFrom")),
      limit: parseIntParam(sp.get("limit"), 30),
      offset: parseIntParam(sp.get("offset"), 0),
    };

    const result = await getJobsService().getVacancies(query);
    return NextResponse.json({
      ...result,
      source: "server",
      warning: result.isDemo
        ? "Demo vacancies only. Not real job postings."
        : undefined,
    });
  } catch (e) {
    console.error("[api/v1/jobs/vacancies]", e);
    return NextResponse.json(
      { error: "VACANCIES_FAILED" },
      { status: 500 }
    );
  }
}

function parseWorkFormat(
  v: string | null
): WorkFormat | "all" | undefined {
  if (v === "onsite" || v === "hybrid" || v === "remote" || v === "all") return v;
  return undefined;
}

function parseEmployment(
  v: string | null
): EmploymentType | "all" | undefined {
  if (
    v === "full_time" ||
    v === "part_time" ||
    v === "contract" ||
    v === "internship" ||
    v === "all"
  ) {
    return v;
  }
  return undefined;
}

function parseIntParam(v: string | null, fallback: number): number {
  if (v == null || v === "") return fallback;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function parseOptionalNumber(v: string | null): number | null | undefined {
  if (v == null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
