"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemConfig {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItemConfig[];
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`bg-transparent ${className}`}>
      <div className="px-6">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {breadcrumbs.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="flex items-center gap-1.5"
                >
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 || !item.href ? (
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
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
