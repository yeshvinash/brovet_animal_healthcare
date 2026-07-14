import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { db } from '../utils/db';
import { Icons } from '../components/UI/Icons';
import { Breadcrumbs, Button } from '../components/UI/Shared';

const BlogDetails = () => {
  const { paramId, navigate } = useRouter();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!paramId) {
      setBlog(null);
      return;
    }
    setBlog(db.getBlogs().find(x => x.id === paramId) || null);
  }, [paramId]);

  if (!blog) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-neutral-dark">Article Not Found</h2>
        <p className="text-neutral-muted mt-2">The article you are trying to read does not exist.</p>
        <div className="mt-6">
          <Button variant="primary" onClick={() => navigate('/blogs')}>Back to Blogs</Button>
        </div>
      </div>
    );
  }

  const relatedArticles = db.getBlogs()
    .filter(b => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: "Blogs", path: "/blogs" },
        { label: blog.title }
      ]} />

      {/* Main Blog Article */}
      <article className="mt-6 space-y-8">
        
        {/* Title Meta */}
        <div className="space-y-4">
          <span className="px-2.5 py-1 text-xs font-semibold tracking-wide text-primary bg-primary-light rounded border border-primary/20 uppercase">
            {blog.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark tracking-tight leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-4 text-xs text-neutral-muted font-semibold border-y border-neutral-light py-3">
            <span className="flex items-center gap-1">
              <Icons.User className="w-4 h-4 text-primary" /> {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <Icons.Calendar className="w-4 h-4 text-primary" /> {blog.date}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-video bg-neutral-light border rounded-2xl overflow-hidden shadow-premium">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* content */}
        <div className="max-w-none text-neutral-body text-md leading-relaxed space-y-6">
          {blog.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl font-bold text-neutral-dark pt-4 border-b pb-1">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              const items = paragraph.split('\n');
              return (
                <ul key={index} className="list-disc pl-6 space-y-2 text-sm">
                  {items.map((item, idx) => (
                    <li key={idx}>
                      {item.replace(/^\d+\.\s+\*\*(.*?)\*\*:\s*/, '$1: ').replace(/^-\s+\*\*(.*?)\*\*:\s*/, '$1: ').replace(/^[-\d.]+\s+/, '')}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="whitespace-pre-line text-sm">
                {paragraph}
              </p>
            );
          })}
        </div>

      </article>

      {/* Related Posts */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-10 border-t border-neutral-border space-y-8">
          <h3 className="text-xl font-extrabold text-neutral-dark">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map(art => (
              <div 
                key={art.id} 
                className="bg-white border rounded-xl overflow-hidden shadow-2xs hover:shadow-premium transition-shadow duration-200 cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/blog/${art.id}`)}
              >
                <div className="aspect-video overflow-hidden bg-neutral-light border-b">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <span className="text-3xs text-primary font-bold uppercase tracking-wider mb-1">{art.category}</span>
                  <h4 className="font-bold text-neutral-dark text-sm leading-tight line-clamp-2 hover:text-primary mb-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-neutral-muted line-clamp-2 leading-relaxed mb-3">
                    {art.summary}
                  </p>
                  <span className="text-3xs text-neutral-muted mt-auto block font-semibold">{art.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default BlogDetails;
