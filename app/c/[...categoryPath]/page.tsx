import { notFound } from "next/navigation";
import BreadCrumb from "@/app/components/BreadCrumb";

type Props = {
  params: Promise<{
    categoryPath: string[];
  }>;
};

export const revalidate = 300; // ISR

export default async function CategoryPage({ params }: Props) {
  const { categoryPath } = await params;

  if (!categoryPath || categoryPath.length === 0) {
    notFound();
  }

  const currentCategory = categoryPath[categoryPath.length - 1];
  const fullPath = categoryPath.join(" / ");

  return (
    <section
      className="
        min-h-screen
        bg-gradient-to-br
        from-white via-white/80 to-zinc-100
        dark:from-zinc-950 dark:via-zinc-900/80 dark:to-zinc-950
        px-4 py-10
      "
    >
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Breadcrumb */}
        <BreadCrumb categoryPath={categoryPath} />

        {/* Glass Card */}
        <div
          className="
            rounded-2xl
            border border-white/30 dark:border-zinc-800/60
            bg-white/40 dark:bg-zinc-900/60
            backdrop-blur-lg
            shadow-xl
            p-8
          "
        >
          <h1 className="text-3xl font-bold capitalize text-gray-950 dark:text-zinc-100">
            {currentCategory}
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
            Category path: {fullPath}
          </p>
        </div>
      </div>
    </section>
  );
}
