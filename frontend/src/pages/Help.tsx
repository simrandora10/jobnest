import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How do I create an account?", a: "Click the Register button and choose your role (Job Seeker or Employer). Fill in your details and you're ready to go." },
  { q: "Is JobNest free to use?", a: "Yes! Job seekers can use all core features for free. Employers have a free tier with premium plans for advanced features." },
  { q: "How does AI matching work?", a: "Our AI analyzes your skills, experience, and preferences to match you with the most relevant job opportunities." },
  { q: "Can I upload my resume?", a: "Absolutely. Upload your resume in PDF or DOCX format. Our system will parse it to enhance your profile." },
  { q: "How do I contact support?", a: "Visit our Contact page or email support@jobnest.com. We typically respond within 24 hours." },
];

const Help = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Help Center</p>
            <h1 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">Find answers to common questions about JobNest.</p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <GlassCard className="cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-sm">{faq.q}</h3>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
                </div>
                {open === i && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{faq.a}</p>}
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
