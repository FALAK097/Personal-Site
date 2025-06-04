"use client";

import { ErrorPage } from "@/components/custom/error-page";

export default function Error({ error, reset }) {
  return <ErrorPage error={error} reset={reset} />;
}
