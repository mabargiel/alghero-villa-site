import { createClient } from "@sanity/client";
import { sanityDataset, sanityProjectId, sanityReadToken } from "./env";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2024-10-01",
  useCdn: sanityReadToken.length === 0,
  token: sanityReadToken || undefined,
});
