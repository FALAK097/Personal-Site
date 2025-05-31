"use client";

import { ErrorPage } from "@/components/error-page";

export default function Error({ error, reset }) {
  return <ErrorPage error={error} reset={reset} />;
}
