import React from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"

interface BreadCrumbProps {
  categoryPath: string[]
}

const BASE_PATH = "/c"

const BreadCrumb = ({ categoryPath }: BreadCrumbProps) => {
  return (
    <div className="w-fit rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 shadow-lg">
      <Breadcrumb>
        <BreadcrumbList className="text-sm text-muted-foreground">
          {/* Home */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="font-medium text-foreground hover:text-primary transition"
              >
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {categoryPath.map((category, index) => {
            const isLast = index === categoryPath.length - 1
            const href = `${BASE_PATH}/${categoryPath
              .slice(0, index + 1)
              .join("/")}`

            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4 opacity-60" />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-semibold text-foreground capitalize">
                      {category}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={href}
                        className="capitalize hover:text-primary transition"
                      >
                        {category}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default BreadCrumb
