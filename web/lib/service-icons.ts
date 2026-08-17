import { Code2, Workflow, Megaphone } from "lucide-react";
import type { ServiceSlug } from "@/lib/site-config";

export const serviceIcons: Record<ServiceSlug, typeof Code2> = {
  "web-development": Code2,
  "robotic-process-automation": Workflow,
  "social-media-marketing": Megaphone,
};
