import { NextRequest, NextResponse } from "next/server";
import { getJobsService } from "@/jobs";

/** GET /api/v1/jobs/vacancies/:id */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const vacancy = await getJobsService().getVacancy(id);
    if (!vacancy) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }
    return NextResponse.json({
      vacancy,
      source: "server",
      warning: vacancy.isDemo
        ? "Demo vacancy only. Not a real job posting."
        : undefined,
    });
  } catch (e) {
    console.error("[api/v1/jobs/vacancies/id]", e);
    return NextResponse.json({ error: "VACANCY_FAILED" }, { status: 500 });
  }
}
