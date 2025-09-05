import { http, HttpResponse } from "msw";
import { nanoid } from "nanoid";
import { builds, withLogs } from "./data";

export const handlers = [
  http.get("/api/builds", () => HttpResponse.json({ builds })),

  http.get("/api/builds/:id", ({ params }) => {
    const id = String(params.id);
    return HttpResponse.json(withLogs(id));
  }),

  http.post("/api/builds", async ({ request }) => {
    const body = (await request.json()) as { package: string; branch?: string };
    const b = {
      id: nanoid(8),
      package: body.package,
      status: "queued" as const,
      startedAt: new Date().toISOString(),
      branch: body.branch ?? "main",
    };
    builds.unshift(b);
    return HttpResponse.json(b, { status: 201 });
  }),
];
