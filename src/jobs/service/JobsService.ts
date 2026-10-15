import type { JobsRepository } from "../repository/types";
import type {
  Application,
  Resume,
  Vacancy,
  VacancyFeedQuery,
  VacancyFeedResult,
} from "../domain/types";
import { InMemoryJobsRepository } from "../repository/InMemoryJobsRepository";
import { DEMO_OWNER_ID } from "../data/demo";

export class JobsService {
  constructor(private readonly repo: JobsRepository) {}

  getVacancies(query: VacancyFeedQuery): Promise<VacancyFeedResult> {
    return this.repo.getVacancies(query);
  }

  getVacancy(id: string): Promise<Vacancy | null> {
    return this.repo.getVacancy(id);
  }

  getEmployer(id: string) {
    return this.repo.getEmployer(id);
  }

  getDemoOwnerId(): string {
    return DEMO_OWNER_ID;
  }

  getResume(ownerId: string): Promise<Resume | null> {
    return this.repo.getResume(ownerId);
  }

  saveResume(resume: Resume): Promise<Resume> {
    return this.repo.saveResume(resume);
  }

  getApplications(ownerId: string): Promise<Application[]> {
    return this.repo.getApplications(ownerId);
  }

  apply(params: {
    ownerId: string;
    vacancyId: string;
    resumeId: string;
    coverNote: string;
  }) {
    return this.repo.apply(params);
  }

  withdrawApplication(ownerId: string, applicationId: string) {
    return this.repo.withdrawApplication(ownerId, applicationId);
  }
}

let singleton: JobsService | null = null;

export function getJobsService(): JobsService {
  if (!singleton) {
    singleton = new JobsService(new InMemoryJobsRepository());
  }
  return singleton;
}
