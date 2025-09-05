// Enable MSW in dev; no-op in prod
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  import("./browser").then(({ worker }) =>
    worker.start({ onUnhandledRequest: "bypass" })
  );
}
