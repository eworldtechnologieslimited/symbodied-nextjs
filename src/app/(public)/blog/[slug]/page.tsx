import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { BlogCard } from "@/components/commerce/blog-card";

const ALL_BLOGS = [
  { id: "b1", category: "Medicine", title: "The Dibia Pharmacopoeia: Documenting Igbo Herbal Knowledge", excerpt: "How communities are preserving centuries of botanical medicine for the next generation of healers.", author: "Dr. Ada Eze", date: "Jun 12, 2026", readTime: "6 min read", seed: 2, image: "/images/blogs/img_683c8bdbbd0ec.webp" },
  { id: "b2", category: "Agriculture", title: "Reviving Yam Barns: Storage Traditions That Still Work", excerpt: "Pre-colonial storage techniques are outperforming modern silos in humid climates.", author: "Chidi Nwosu", date: "Jun 8, 2026", readTime: "4 min read", seed: 0, image: "/images/blogs/img_683c97d33a54b.webp" },
  { id: "b3", category: "Textile", title: "From Loom to Runway: The Akwete Resurgence", excerpt: "A new generation of weavers is taking heritage cloth global without losing its soul.", author: "Ngozi Okafor", date: "Jun 2, 2026", readTime: "5 min read", seed: 3, image: "/images/blogs/img_683c9cfac47b4.webp" },
];

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = ALL_BLOGS.find((b) => b.id === slug) ?? ALL_BLOGS[0];
  if (!post) notFound();

  const related = ALL_BLOGS.filter((b) => b.id !== post.id);

  return (
    <div className="bg-white">
      <div className="max-w-[var(--container-max)] mx-auto px-6 pt-8">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-brand font-sans transition-colors">
          <ArrowLeft size={15} /> Back to Blog
        </Link>
      </div>

      {post.image && (
        <div className="max-w-[var(--container-max)] mx-auto px-6 mt-6">
          <div className="relative h-[400px] md:h-[480px] rounded-2xl overflow-hidden">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="(max-width: 1280px) 100vw, 80rem" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
        </div>
      )}

      <article className="max-w-2xl mx-auto px-6 py-12">
        <Badge tone="brand" className="mb-5">{post.category}</Badge>
        <h1 className="font-display font-bold text-4xl text-ink leading-tight tracking-tight mb-6">{post.title}</h1>

        <div className="flex items-center gap-4 pb-7 border-b border-ink-200 mb-8">
          <Avatar name={post.author} size="md" />
          <div className="flex-1">
            <div className="font-semibold text-sm text-ink font-sans">{post.author}</div>
            <div className="text-xs text-ink-500 font-sans">{post.date}</div>
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-500 font-sans">
            <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
            <span className="flex items-center gap-1"><Eye size={12} />1.2k views</span>
          </div>
        </div>

        <div className="space-y-5 font-sans text-ink-600 leading-[1.8]">
          <p className="text-xl text-ink-700 font-medium leading-relaxed">{post.excerpt}</p>
          <p>Across communities from Nsukka to Ibadan, practitioners and researchers are working together to preserve knowledge that might otherwise be lost. What began as informal documentation projects has evolved into a broader movement to respect, record, and transmit traditional wisdom.</p>
          <p>The challenge is not simply archival. It requires building trust with elders and specialists who have, understandably, been wary of extraction — of outsiders taking knowledge without giving back. Symbodied's approach centres reciprocity: communities own and control their documented knowledge, and any commercial benefit flows back to the source.</p>
          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-3">What This Means in Practice</h2>
          <p>Vendors on the platform are required to trace provenance — where a product was made, by whom, using which methods. This traceability creates accountability and premium value. Buyers know exactly what they are supporting.</p>
          <p>For practitioners in {post.category.toLowerCase()}, this means a path to market that didn't previously exist — one that rewards authenticity rather than penalising it.</p>
          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-3">Looking Forward</h2>
          <p>The work is ongoing. Symbodied is partnering with universities and cultural foundations to digitise records, translate documentation, and build open repositories that communities can access freely. The goal is a living archive — not a museum piece.</p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-14 bg-ink-100">
          <div className="max-w-[var(--container-max)] mx-auto px-6">
            <h2 className="font-sans font-bold text-xl text-ink mb-7">More Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((b) => (
                <Link key={b.id} href={`/blog/${b.id}`}><BlogCard {...b} /></Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
