"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageHeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  className = "",
}: PageHeaderProps) {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const segments = pathname.split("/").filter(Boolean);

  // Create breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

    return { href, label };
  });

  // Get the title - use provided title or derive from last segment
  const pageTitle =
    title ||
    (segments.length > 0
      ? breadcrumbItems[breadcrumbItems.length - 1].label
      : "Home");

  return (
    <div className={`bg-transparent ${className}`}>
      <div className="px-6">
        {/* Breadcrumbs */}
        {breadcrumbItems.length > 0 && (
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {breadcrumbItems.map((item, index) => (
                <div key={item.href} className="flex items-center gap-1.5">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === breadcrumbItems.length - 1 ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Title and Description */}
        <div>
          <h1 className="text-2xl font-medium tracking-tight leading-8 text-primaryT">
            {pageTitle}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
