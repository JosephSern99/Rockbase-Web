import { Code2, Smartphone, Workflow } from "lucide-react";
import type { ServiceSlug } from "@/lib/site-config";

export const serviceIcons: Record<ServiceSlug, typeof Code2> = {
  "web-development": Code2,
  "mobile-development": Smartphone,
  "robotic-process-automation": Workflow,
};
