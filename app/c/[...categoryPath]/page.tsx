import { notFound } from "next/navigation"
import BreadCrumb from "@/app/components/BreadCrumb"

type Props = {
  params: Promise<{
    categoryPath: string[]
  }>
}

export const revalidate = 300 // ISR

export default async function CategoryPage({ params }: Props) {
  const { categoryPath } = await params

  if (!categoryPath || categoryPath.length === 0) {
    notFound()
  }

  const currentCategory = categoryPath[categoryPath.length - 1]
  const fullPath = categoryPath.join(" / ")
  console.log(categoryPath)
  return (
    <section className="min-h-screen bg-gradient-to-br from-background to-muted px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Breadcrumb */}
        <BreadCrumb categoryPath={categoryPath} />

        {/* Glass Card */}
        <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold capitalize text-foreground">
            {currentCategory}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Category path: {fullPath}
          </p>
        </div>
      </div>
    </section>
  )
}
