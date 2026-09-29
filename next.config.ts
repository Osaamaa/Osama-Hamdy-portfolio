import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  devIndicators: false,
  // Optional in-process workers for environments that restrict child processes.
  ...(process.env.NEXT_WORKER_THREADS === "1" ? { experimental: { workerThreads: true, useTypeScriptCli: false, cpus: 2 } } : {}),
};

export default config;
