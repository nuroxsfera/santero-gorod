/**
 * Jobs domain — Santero Город
 * Geo via Geography v1.0 only. Personal data is NOT tied to browsing city.
 */

export type WorkFormat = "onsite" | "hybrid" | "remote";
export type EmploymentType = "full_time" | "part_time" | "contract" | "internship";
export type VacancyStatus = "draft" | "published" | "closed" | "archived";
export type ResumeVisibility = "private" | "employers" | "public";
export type ApplicationStatus =
  | "submitted"
  | "viewed"
  | "invite"
  | "rejected"
  | "withdrawn";

export interface Employer {
  id: string;
  name: string;
  description: string;
  website: string | null;
  localityId: string | null;
  localityName: string | null;
  regionId: string | null;
  isDemo: boolean;
}

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  requirements: string;
  conditions: string;
  employerId: string;
  employerName: string;
  salaryFrom: number | null;
  salaryTo: number | null;
  salaryCurrency: "RUB";
  salaryNotSpecified: boolean;
  localityId: string | null;
  localityName: string | null;
  regionId: string | null;
  regionName: string | null;
  workFormat: WorkFormat;
  employmentType: EmploymentType;
  schedule: string;
  status: VacancyStatus;
  publishedAt: string | null;
  isDemo: boolean;
}

export interface Resume {
  id: string;
  ownerId: string;
  profession: string;
  desiredTitle: string;
  experienceYears: number;
  skills: string[];
  education: string;
  desiredSalary: number | null;
  preferredLocalityId: string | null;
  preferredLocalityName: string | null;
  preferredRegionId: string | null;
  preferredWorkFormat: WorkFormat | "any";
  visibility: ResumeVisibility;
  published: boolean;
  isDraft: boolean;
  contactEmail: string | null;
  contactPhone: string | null;
  updatedAt: string;
  isDemo: boolean;
}

export interface Application {
  id: string;
  vacancyId: string;
  resumeId: string;
  ownerId: string;
  status: ApplicationStatus;
  coverNote: string;
  createdAt: string;
  updatedAt: string;
  isDemo: boolean;
}

export interface VacancyFeedQuery {
  localityId?: string | null;
  regionId?: string | null;
  workFormat?: WorkFormat | "all";
  employmentType?: EmploymentType | "all";
  query?: string;
  salaryFrom?: number | null;
  limit?: number;
  offset?: number;
}

export interface VacancyFeedResult {
  items: Vacancy[];
  total: number;
  isDemo: boolean;
}
