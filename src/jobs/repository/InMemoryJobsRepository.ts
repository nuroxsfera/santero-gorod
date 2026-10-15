import type { JobsRepository } from "./types";
import type {
  Application,
  Employer,
  Resume,
  Vacancy,
  VacancyFeedQuery,
  VacancyFeedResult,
  ApplicationStatus,
} from "../domain/types";
import {
  DEMO_APPLICATIONS,
  DEMO_EMPLOYERS,
  DEMO_RESUME,
  DEMO_VACANCIES,
} from "../data/demo";
import { filterVacancies } from "../service/filters";

/** Client-side demo store. Resume/applications keyed by ownerId — independent of browsing city. */
export class InMemoryJobsRepository implements JobsRepository {
  private vacancies: Vacancy[];
  private employers: Employer[];
  private resumeByOwner: Map<string, Resume>;
  private applications: Application[];

  constructor() {
    this.vacancies = [...DEMO_VACANCIES];
    this.employers = [...DEMO_EMPLOYERS];
    this.resumeByOwner = new Map([[DEMO_RESUME.ownerId, { ...DEMO_RESUME }]]);
    this.applications = [...DEMO_APPLICATIONS];
  }

  async getVacancies(query: VacancyFeedQuery): Promise<VacancyFeedResult> {
    const filtered = filterVacancies(this.vacancies, query);
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 30;
    const page = filtered.slice(offset, offset + limit);
    return {
      items: page,
      total: filtered.length,
      isDemo: page.every((v) => v.isDemo) || page.length === 0,
    };
  }

  async getVacancy(id: string): Promise<Vacancy | null> {
    return this.vacancies.find((v) => v.id === id) ?? null;
  }

  async getEmployer(id: string): Promise<Employer | null> {
    return this.employers.find((e) => e.id === id) ?? null;
  }

  async getResume(ownerId: string): Promise<Resume | null> {
    return this.resumeByOwner.get(ownerId) ?? null;
  }

  async saveResume(resume: Resume): Promise<Resume> {
    const next = { ...resume, updatedAt: new Date().toISOString() };
    this.resumeByOwner.set(resume.ownerId, next);
    return next;
  }

  async getApplications(ownerId: string): Promise<Application[]> {
    return this.applications
      .filter((a) => a.ownerId === ownerId)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  async apply(params: {
    ownerId: string;
    vacancyId: string;
    resumeId: string;
    coverNote: string;
  }): Promise<{ ok: true; application: Application } | { ok: false; reason: string }> {
    const vacancy = this.vacancies.find((v) => v.id === params.vacancyId);
    if (!vacancy || vacancy.status !== "published") {
      return { ok: false, reason: "VACANCY_NOT_AVAILABLE" };
    }
    const dup = this.applications.find(
      (a) =>
        a.ownerId === params.ownerId &&
        a.vacancyId === params.vacancyId &&
        a.status !== "withdrawn"
    );
    if (dup) {
      return { ok: false, reason: "ALREADY_APPLIED" };
    }
    const now = new Date().toISOString();
    const application: Application = {
      id: `app-demo-${Date.now()}`,
      vacancyId: params.vacancyId,
      resumeId: params.resumeId,
      ownerId: params.ownerId,
      status: "submitted",
      coverNote: params.coverNote.slice(0, 500),
      createdAt: now,
      updatedAt: now,
      isDemo: true,
    };
    this.applications.push(application);
    return { ok: true, application };
  }

  async withdrawApplication(ownerId: string, applicationId: string): Promise<boolean> {
    const app = this.applications.find(
      (a) => a.id === applicationId && a.ownerId === ownerId
    );
    if (!app || app.status === "withdrawn") return false;
    app.status = "withdrawn";
    app.updatedAt = new Date().toISOString();
    return true;
  }

  async updateApplicationStatus(
    applicationId: string,
    status: ApplicationStatus
  ): Promise<Application | null> {
    const app = this.applications.find((a) => a.id === applicationId);
    if (!app) return null;
    app.status = status;
    app.updatedAt = new Date().toISOString();
    return app;
  }
}
