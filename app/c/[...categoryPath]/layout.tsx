import Products from "@/app/components/Products";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    categoryPath: string[];
  }>;
};

export default async function CategoryLayout({ children, params }: Props) {
  const { categoryPath } = await params; // ✅ correct

  const currentCategory =
    categoryPath?.[categoryPath.length - 1] ?? "";

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT SIDEBAR */}
        <aside className="col-span-12 md:col-span-3">
          {children}
        </aside>

        {/* RIGHT CONTENT */}
        <main className="col-span-12 md:col-span-9">
          <Products category={currentCategory} />
        </main>
      </div>
    </div>
  );
}
