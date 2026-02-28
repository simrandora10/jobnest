import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { blogs } from "@/data/blogs";
import { Badge } from "@/components/ui/badge";

const BlogList = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-6">
        {/* Header section optimized for SEO */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-4">Career Resources</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Career Insights & <span className="text-primary">Advice</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Expert strategies to help you land your dream job, optimize your resume, and navigate the modern tech landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article 
              key={blog.slug}
              className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              <Link to={`/blog/${blog.slug}`} className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {blog.readTime}
                  </span>
                </div>
                
                <Badge variant="outline" className="w-fit mb-3 bg-primary/5 border-primary/20 text-primary">
                  {blog.category}
                </Badge>

                <h2 className="text-xl font-bold mb-3 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                  <Link to={`/blog/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h2>
                
                <p className="text-muted-foreground line-clamp-3 mb-6 flex-1 text-sm">
                  {blog.metaDescription}
                </p>

                <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{blog.author}</span>
                  </div>
                  <Link 
                    to={`/blog/${blog.slug}`}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
