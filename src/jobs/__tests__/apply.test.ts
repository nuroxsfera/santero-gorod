import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryJobsRepository } from "../repository/InMemoryJobsRepository";
import { DEMO_OWNER_ID } from "../data/demo";

describe("apply flow", () => {
  let repo: InMemoryJobsRepository;

  beforeEach(() => {
    repo = new InMemoryJobsRepository();
  });

  it("prevents duplicate active applications", async () => {
    const first = await repo.apply({
      ownerId: DEMO_OWNER_ID,
      vacancyId: "vac-demo-1",
      resumeId: "resume-demo-1",
      coverNote: "hi",
    });
    expect(first.ok).toBe(true);
    const second = await repo.apply({
      ownerId: DEMO_OWNER_ID,
      vacancyId: "vac-demo-1",
      resumeId: "resume-demo-1",
      coverNote: "again",
    });
    expect(second.ok).toBe(false);
    if (!second.ok) expect(second.reason).toBe("ALREADY_APPLIED");
  });

  it("resume save is independent of city context", async () => {
    const r = await repo.getResume(DEMO_OWNER_ID);
    expect(r).not.toBeNull();
    const saved = await repo.saveResume({
      ...r!,
      desiredTitle: "Senior Frontend",
    });
    expect(saved.desiredTitle).toBe("Senior Frontend");
    const again = await repo.getResume(DEMO_OWNER_ID);
    expect(again?.desiredTitle).toBe("Senior Frontend");
  });

  it("withdraw works", async () => {
    const first = await repo.apply({
      ownerId: DEMO_OWNER_ID,
      vacancyId: "vac-demo-2",
      resumeId: "resume-demo-1",
      coverNote: "",
    });
    expect(first.ok).toBe(true);
    if (!first.ok) return;
    const ok = await repo.withdrawApplication(DEMO_OWNER_ID, first.application.id);
    expect(ok).toBe(true);
    const list = await repo.getApplications(DEMO_OWNER_ID);
    expect(list.find((a) => a.id === first.application.id)?.status).toBe("withdrawn");
  });
});
