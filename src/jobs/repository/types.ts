import type {
  Application,
  Employer,
  Resume,
  Vacancy,
  VacancyFeedQuery,
  VacancyFeedResult,
  ApplicationStatus,
} from "../domain/types";

export interface JobsRepository {
  getVacancies(query: VacancyFeedQuery): Promise<VacancyFeedResult>;
  getVacancy(id: string): Promise<Vacancy | null>;
  getEmployer(id: string): Promise<Employer | null>;
  getResume(ownerId: string): Promise<Resume | null>;
  saveResume(resume: Resume): Promise<Resume>;
  getApplications(ownerId: string): Promise<Application[]>;
  apply(params: {
    ownerId: string;
    vacancyId: string;
    resumeId: string;
    coverNote: string;
  }): Promise<{ ok: true; application: Application } | { ok: false; reason: string }>;
  withdrawApplication(ownerId: string, applicationId: string): Promise<boolean>;
  updateApplicationStatus(
    applicationId: string,
    status: ApplicationStatus
  ): Promise<Application | null>;
}
