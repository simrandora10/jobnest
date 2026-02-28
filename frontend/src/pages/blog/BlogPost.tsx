import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { blogs } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogs.find((b) => b.slug === slug);

  // Dynamic SEO meta tags via vanilla JS
  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | JobNest Blog`;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', blog.metaDescription);
    }
    
    // Cleanup on unmount (optional, but good practice if you want to restore a default)
    return () => {
      document.title = "JobNest | Premium Career Platform";
    };
  }, [blog]);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/blog">
          <Button variant="ghost" className="mb-8 pl-0 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all articles
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <Badge variant="outline" className="mb-6 bg-primary/5 text-primary border-primary/20">
            {blog.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-foreground">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </header>

        {/* Article Image / Rich Snippet Context */}
        <figure className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-border">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-[400px] object-cover"
            loading="eager" // Load hero image fast for Core Web Vitals (LCP)
          />
        </figure>

        {/* Semantic Body Content */}
        <div 
          className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-foreground/90 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-li:text-foreground/90 prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer & Tags for Context */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-muted-foreground mr-2" />
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* CTA Box */}
          <div className="mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/10 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to accelerate your career?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Join thousands of professionals finding their next challenge on JobNest. Create your profile in minutes.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="gradient-primary">Get Started</Button>
              </Link>
              <Link to="/seeker/jobs">
                <Button size="lg" variant="outline">Browse Jobs</Button>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogPost;
