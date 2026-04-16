
"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  FileDown, 
  Play, 
  ChevronDown, 
  ChevronUp,
  GraduationCap,
  Award,
  BookOpen,
  Lightbulb,
  Wrench,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Database,
  Workflow,
  Shield,
  Clock,
  GitPullRequest,
  GitCommit,
  Code2,
  Star,
  Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"

// Navigation items
const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "opensource", label: "Open Source" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "thinking", label: "How I Think" },
  { id: "process", label: "My Process" },
  { id: "contact", label: "Contact" },
]

// Open Source Contributions
const openSourceContributions = [
  {
    project: "Apache Airflow",
    logo: "https://airflow.apache.org/images/feature-image.png",
    description: "The most popular open-source workflow orchestration platform. Used by thousands of companies to programmatically author, schedule, and monitor data pipelines.",
    contributions: [
      {
        title: "Enhanced DAG Serialization Performance",
        type: "Feature",
        description: "Improved DAG serialization by implementing lazy loading for task dependencies, reducing scheduler startup time by 40% for large deployments.",
        pr: "#28453",
        prLink: "https://github.com/apache/airflow/pull/28453",
        status: "Merged"
      },
      {
        title: "Fixed Memory Leak in TaskInstance State Tracking",
        type: "Bug Fix",
        description: "Identified and fixed a memory leak in the task instance state tracking mechanism that caused scheduler OOM issues in long-running deployments.",
        pr: "#29102",
        prLink: "https://github.com/apache/airflow/pull/29102",
        status: "Merged"
      },
      {
        title: "Documentation: Best Practices for Dynamic DAG Generation",
        type: "Documentation",
        description: "Authored comprehensive documentation on patterns for generating DAGs dynamically, including factory patterns and configuration-driven approaches.",
        pr: "#28891",
        prLink: "https://github.com/apache/airflow/pull/28891",
        status: "Merged"
      }
    ],
    stats: {
      prs: 3,
      commits: 12,
      linesChanged: "2,400+"
    },
    link: "https://github.com/apache/airflow"
  }
]

// Projects data
const projects = [
  {
    id: 1,
    title: "Real-Time Fraud Detection",
    cloud: "AWS",
    cloudColor: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    description: "End-to-end fraud detection streaming pipeline processing 120K+ events/day with confidence scoring and real-time pattern detection.",
    metrics: "120K+ events/day | AWS | Kafka | Spark | <60s latency",
    features: [
      "Confidence Scoring Engine",
      "Dead Letter Queue with Auto-Replay",
      "Real-Time Fraud Pattern Dashboard",
      "Behavioral Baseline Per Customer",
      "Geo-Velocity Fraud Detection"
    ],
    skills: ["Apache Kafka", "Spark Structured Streaming", "PySpark", "Python", "Amazon S3", "Amazon Redshift", "Parquet"],
    github: "https://github.com/sunildataengineer/Real-Time-Fraud-Anomaly-Detection-Streaming-Platform",
    svg: "/diagrams/project1_pipeline.svg",
  },
  {
    id: 2,
    title: "Data Quality & Governance",
    cloud: "Azure",
    cloudColor: "bg-sky-500/10 text-sky-500 border-sky-500/30",
    description: "Medallion architecture pipeline with 6 quality rules, processing 200K+ records/day through Bronze, Silver, Gold layers.",
    metrics: "200K+ records/day | Azure | Delta Lake | <30s latency",
    features: [
      "Quality Score Per Data Source",
      "Schema Registry with Version Control",
      "Quarantine Auto-Reprocessing",
      "Data Lineage Tracking",
      "SLA Breach Detection"
    ],
    skills: ["Azure Event Hubs", "Azure Databricks", "Delta Lake", "PySpark", "Python", "Azure Data Factory"],
    github: "https://github.com/sunildataengineer/Real-Time-Data-Quality-Streaming-Governance-Platform",
    svg: "/diagrams/project2_pipeline.svg",
  },
  {
    id: 3,
    title: "Global Event Processing",
    cloud: "GCP",
    cloudColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    description: "Multi-region stateful streaming with event-time windowing, processing 300K+ events/day across 3 global regions.",
    metrics: "300K+ events/day | GCP | Dataflow | 3 regions | <45s latency",
    features: [
      "Multi-Region Latency Tracking",
      "Adaptive Watermark Strategy",
      "Session Anomaly Detection",
      "Cross-Region Event Correlation",
      "Real-Time Funnel Analytics"
    ],
    skills: ["Google Pub/Sub", "Cloud Dataflow", "BigQuery", "Apache Beam", "Python", "SQL"],
    github: "https://github.com/sunildataengineer/Global-Real-Time-Event-Processing-Stateful-Streaming-Platform",
    svg: "/diagrams/project3_pipeline.svg",
  },
  {
    id: 4,
    title: "Real-Time CDC Database Replication",
    cloud: "AWS",
    cloudColor: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    description: "Change Data Capture pipeline with Debezium, processing 500K+ change events/day with schema auto-detection.",
    metrics: "500K+ events/day | AWS | Debezium | Kafka | <15s latency",
    features: [
      "Schema Change Auto-Detection",
      "Multi-Table Transaction Ordering",
      "Immutable Audit Log on S3",
      "Snowflake Merge Idempotency",
      "Change Velocity Monitoring"
    ],
    skills: ["PostgreSQL", "Debezium", "Kafka", "Spark", "Snowflake", "AWS S3", "PySpark", "Python"],
    github: "https://github.com/sunildataengineer/Real-Time-CDC-Database-Replication-Pipeline",
    svg: "/diagrams/project4_pipeline.svg",
  },
  {
    id: 5,
    title: "Real-Time ML Feature Store",
    cloud: "AWS",
    cloudColor: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    description: "Dual-store feature platform with online/offline consistency, serving 400K+ events/day with <10ms latency.",
    metrics: "400K+ events/day | AWS | Redis | Kafka | <10ms latency",
    features: [
      "Feature Drift Detection",
      "Point-in-Time Correct Feature Lookup",
      "Feature Freshness SLA",
      "A/B Feature Experiment Tracking",
      "Online-Offline Consistency Checker"
    ],
    skills: ["Apache Kafka", "Spark", "Redis", "AWS S3", "PySpark", "Python", "Great Expectations", "PostgreSQL"],
    github: "https://github.com/sunildataengineer/Real-Time-ML-Feature-Store-Streaming-Pipeline",
    svg: "/diagrams/project5_pipeline.svg",
  },
  {
    id: 6,
    title: "Multi-Cloud Data Lakehouse",
    cloud: "AWS + GCP",
    cloudColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
    description: "Cross-cloud Apache Iceberg lakehouse processing 600K+ events/day with unified SQL queries via Trino.",
    metrics: "600K+ events/day | AWS + GCP | Iceberg | Trino | <90s latency",
    features: [
      "Cross-Cloud Data Sovereignty Routing",
      "Iceberg Time Travel Audit API",
      "Automatic Iceberg Table Optimization",
      "dbt Data Lineage Visualization",
      "Cost Monitoring Per Cloud"
    ],
    skills: ["Apache Kafka", "Spark", "Apache Iceberg", "AWS S3", "BigQuery", "Trino", "dbt", "PySpark", "Python", "SQL"],
    github: "https://github.com/sunildataengineer/Multi-Cloud-Real-Time-Data-Lakehouse---Apache-Iceberg",
    svg: "/diagrams/project6_pipeline.svg",
  }
]

// Skills data
const skillCategories = [
  {
    category: "Languages & Query",
    skills: ["Python", "SQL", "Window Functions", "CTEs", "Query Optimization", "Indexing"]
  },
  {
    category: "Core Skills",
    skills: ["Data Pipelines", "ETL/ELT", "Batch Processing", "Streaming Processing", "Data Warehousing"]
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "Redshift", "BigQuery", "Snowflake", "ClickHouse"]
  },
  {
    category: "Big Data & Streaming",
    skills: ["Apache Spark", "PySpark", "Apache Kafka", "Apache Airflow", "Apache Beam", "Hadoop"]
  },
  {
    category: "Cloud - AWS",
    skills: ["S3", "Redshift", "Glue", "Kinesis", "Lambda", "EMR"]
  },
  {
    category: "Cloud - GCP",
    skills: ["Pub/Sub", "Dataflow", "BigQuery", "Cloud Storage", "Composer"]
  },
  {
    category: "Cloud - Azure",
    skills: ["Event Hubs", "Databricks", "Data Factory", "Synapse", "ADLS"]
  },
  {
    category: "Data Engineering",
    skills: ["Data Modelling", "Data Quality", "Data Governance", "Medallion Architecture", "Delta Lake"]
  },
  {
    category: "Tools & DevOps",
    skills: ["OpenTelemetry", "Structured Logging", "Git", "Linux", "CI/CD", "Docker"]
  }
]

// Certifications data
const certifications = [
  {
    title: "AWS Certified Data Engineer - Associate",
    issuer: "Amazon Web Services",
    date: "Jan 2026",
    badge: "AWS",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/30"
  },
  {
    title: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    date: "Feb 2026",
    badge: "Databricks",
    color: "bg-red-500/10 text-red-500 border-red-500/30"
  }
]

// Engineering principles
const engineeringPrinciples = [
  {
    icon: AlertTriangle,
    title: "Think in Failure Modes",
    description: "Every system I design, I start by asking: what can go wrong here?",
    details: [
      "Network partition? Kafka handles it.",
      "Process crash? Checkpoint handles it.",
      "Duplicate message? Idempotent write handles it.",
      "Schema change? Schema registry handles it."
    ],
    conclusion: "A pipeline that works under normal conditions is a prototype. A pipeline that recovers correctly from failure is a production system."
  },
  {
    icon: Shield,
    title: "Think in Data Contracts",
    description: "Data flowing through a pipe is easy to visualise. But what matters is the contract at each stage.",
    details: [
      "What schema does this topic expect?",
      "What guarantees does this stage make to the next?",
      "What happens when this contract is violated?"
    ],
    conclusion: "If every stage enforces its contract, the whole system is reliable. If any stage is loose, the whole system is fragile."
  },
  {
    icon: Database,
    title: "Think About Downstream First",
    description: "Before I design a pipeline, I ask: who reads this data, and what do they need?",
    details: [
      "ML model needs: low latency, no nulls, consistent schema.",
      "BI dashboard needs: pre-aggregated, partitioned, fast queries.",
      "Compliance audit needs: immutable, timestamped, queryable history."
    ],
    conclusion: "The consumer's needs determine the pipeline's design. Not the other way."
  },
  {
    icon: Workflow,
    title: "Think in Trade-offs",
    description: "There is no universally correct answer in data engineering.",
    details: [
      "Exactly-once is more correct but slower than at-least-once.",
      "Event-time is more accurate but more complex than processing-time.",
      "Normalised schema is cleaner but slower to query than denormalised."
    ],
    conclusion: "Every choice is a trade-off. My job is to understand the trade-off, make the right call for this context, and document why."
  },
  {
    icon: Clock,
    title: "Think About Cost Alongside Correctness",
    description: "A pipeline that processes 600K events/day perfectly but costs $10,000/month is not a good pipeline for a small company.",
    details: [
      "How much data am I storing? Do I need all of it?",
      "How often am I running this query? Can I cache it?",
      "Am I using the right instance type for this workload?"
    ],
    conclusion: "Correctness and cost efficiency are not opposites. Good engineering achieves both."
  }
]

// Build process steps
const buildProcess = [
  {
    step: 1,
    title: "Understand the Business Problem First",
    description: "For every project, I asked: what is the actual cost of NOT having this pipeline?",
    examples: [
      "P1: Fraud detected 4 hours late = money gone. That's real money.",
      "P2: Bad data reaching dashboards = wrong decisions. That's real business impact.",
      "P4: Database changes not captured = analytics 24 hours stale. That breaks real systems."
    ],
    rule: "If I can't explain the business problem in two sentences, I don't start building."
  },
  {
    step: 2,
    title: "Design on Paper Before Code",
    description: "I draw the pipeline on paper first. Every component. Every arrow. Every failure point.",
    questions: [
      "What happens if this component crashes?",
      "What happens if this component is slow?",
      "What happens if data arrives out of order?",
      "What happens if the schema changes?"
    ],
    rule: "Questions I answer before writing line 1."
  },
  {
    step: 3,
    title: "Build the Unhappy Path First",
    description: "Most tutorials build the happy path. I build the failure path first.",
    items: [
      "Dead letter queues before the main consumer.",
      "Checkpoint configuration before the processing logic.",
      "Schema validation before the business logic."
    ],
    rule: "If the failure path works, the happy path is easy."
  },
  {
    step: 4,
    title: "Measure Everything",
    description: "I don't trust that a pipeline works unless I can see it working.",
    metrics: [
      "Event count per second (not per day - per second)",
      "Consumer lag (are we keeping up or falling behind?)",
      "Checkpoint age (when did we last save state?)",
      "Error rate (what % of events are failing?)"
    ],
    rule: "Observable systems are debuggable systems."
  },
  {
    step: 5,
    title: "Document the Decisions",
    description: "Code explains what. Architecture Decision Records (ADRs) explain why.",
    examples: [
      '"Why Kafka over Kinesis?" - documented.',
      '"Why Parquet over Avro?" - documented.',
      '"Why session windows over sliding windows?" - documented.'
    ],
    rule: "Future me (and future teammates) will thank present me."
  }
]

// Project Card Component
function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden group hover:border-border transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              {project.title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {project.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className={project.cloudColor}>
            {project.cloud}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* SVG Diagram */}
        <div className="relative w-full overflow-hidden rounded-lg border border-border/50 bg-muted/30">
          <img 
            src={project.svg} 
            alt={`${project.title} Architecture Diagram`}
            className="w-full h-auto"
          />
        </div>
        
        {/* Metrics Badge */}
        <div className="flex items-center justify-center">
          <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full">
            {project.metrics}
          </span>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            Key Features ({project.features.length})
          </button>
          {expanded && (
            <ul className="grid gap-1.5 pl-6 text-sm text-muted-foreground">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {project.skills.map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="text-xs"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant="default" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View Code
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Play className="h-4 w-4 mr-2" />
              Watch Demo
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Animated Counter Component
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const startTime = performance.now()
            
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4)
              const currentCount = Math.floor(easeOutQuart * target)
              
              setCount(currentCount)
              
              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }
            
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={countRef}>{count.toLocaleString()}</span>
}

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("home")

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3"
            >
              <div className="h-9 w-9 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-lg font-bold text-background">S</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-foreground">Sunil</p>
                <p className="text-xs text-muted-foreground">Data Engineer</p>
              </div>
            </button>
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    activeSection === item.id 
                      ? "bg-secondary text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm" asChild className="hidden sm:flex">
                <a href="/resume.pdf" download>
                  <Download className="h-4 w-4 mr-2" />
                  Resume
                </a>
              </Button>
              <Button size="sm" onClick={() => scrollToSection("contact")}>
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Profile Photo */}
              <div className="mb-8">
                <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-secondary shadow-lg">
                  <Image
                    src="/images/profile.png"
                    alt="Sunil - Data Engineer"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              
              <Badge variant="secondary" className="mb-4">
                AWS & Databricks Certified
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 text-balance">
                Data Engineer
              </h1>
              
              <div className="mb-6 flex justify-center">
                <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100">
                  Available for Data Engineer roles in Bangalore · Open to Work
                </Badge>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-2">
                Kafka | Spark | Python | Fresher
              </p>
              
              {/* Animated Counter */}
              <div className="mb-8 py-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    <AnimatedCounter target={2120000} duration={2000} />+
                  </span>
                  <span className="text-lg md:text-xl text-muted-foreground">
                    events/day across 6 pipelines
                  </span>
                </div>
              </div>
              
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                I build production-grade streaming pipelines. Real-time fraud detection, 
                CDC replication, ML feature stores. AWS, Azure, GCP.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" onClick={() => scrollToSection("projects")}>
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://github.com/sunildataengineer" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>

      {/* Floating Hire Me Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <Button 
          size="lg"
          className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg rounded-full"
          asChild
        >
          <a href="mailto:sunildataengineer@outlook.com?subject=Data Engineer Role">
            Hire Me
          </a>
        </Button>
      </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">About Me</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    I&apos;m I am Data Engineer with expertise in building real-time streaming pipelines 
                    and data platforms. My focus is on creating reliable, scalable systems that handle 
                    millions of events while maintaining data quality and governance.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    I specialize in Apache Kafka, Spark Structured Streaming, and cloud-native services 
                    across AWS, Azure, and GCP. I believe in designing for failure modes first, enforcing 
                    data contracts, and always considering the downstream consumer.
                  </p>
                </div>
                {/* <div className="space-y-4"> */}
                  {/* <h3 className="font-semibold text-foreground">Tech Stack I Work With:</h3> */}
                  {/* <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Next.js + TypeScript
                    </div> */}
                    {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      FastAPI (Python)
                    </div> */}
                    {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Kafka / Redpanda
                    </div> */}
                    {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ClickHouse
                    </div> */}
                    {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Dagster
                    </div> */}
                    {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Apache Spark
                    </div> */}
                  {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Education Section */}
        <section id="education" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Education</h2>
              </div>
              <div className="grid gap-6">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">Master of Computer Applications (MCA)</CardTitle>
                        <CardDescription>Himalayan Garhwal University, Uttarakhand, India</CardDescription>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <Badge variant="secondary">GPA: 8.0/10</Badge>
                        <span className="text-xs text-muted-foreground">Jun 2021 – Apr 2023</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Coursework:</span> Distributed Systems, Database Management Systems, Big Data Analytics, Data Mining and Warehousing
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">Bachelor of Computer Applications (BCA)</CardTitle>
                        <CardDescription>Himalayan Garhwal University, Uttarakhand, India</CardDescription>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <Badge variant="secondary">GPA: 7.55/10</Badge>
                        <span className="text-xs text-muted-foreground">Jun 2018 – Apr 2021</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Coursework:</span> Data Structures and Algorithms, Database Management Systems, Operating Systems, Computer Networks
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
        </div>
        </section>
        
        <Separator />
        <Separator />

        {/* Open Source Section */}
        <section id="opensource" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <GitPullRequest className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Open Source Contributions</h2>
              </div>
              
              <div className="grid gap-8">
                {openSourceContributions.map((contribution, idx) => (
                  <Card key={idx} className="bg-card/50 border-border/50 overflow-hidden">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-foreground">{contribution.project}</h3>
                            <Badge variant="outline">Open Source</Badge>
                          </div>
                          <p className="text-muted-foreground">{contribution.description}</p>
                        </div>
                        <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                          <a href={contribution.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Project
                          </a>
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Contribution Stats */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/30 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">{contribution.stats.prs}</div>
                          <div className="text-xs text-muted-foreground">Pull Requests</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">{contribution.stats.commits}</div>
                          <div className="text-xs text-muted-foreground">Commits</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">{contribution.stats.linesChanged}</div>
                          <div className="text-xs text-muted-foreground">Lines Changed</div>
                        </div>
                      </div>
                      
                      {/* Individual Contributions */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Code2 className="h-4 w-4" />
                          Notable Contributions
                        </h4>
                        <div className="space-y-3">
                          {contribution.contributions.map((contrib, cidx) => (
                            <div key={cidx} className="border border-border/50 rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                                <div>
                                  <h5 className="font-medium text-foreground">{contrib.title}</h5>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="text-xs">{contrib.type}</Badge>
                                    <Badge variant="outline" className="text-xs">{contrib.status}</Badge>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" asChild className="text-xs">
                                  <a href={contrib.prLink} target="_blank" rel="noopener noreferrer">
                                    PR {contrib.pr}
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </a>
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">{contrib.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />
        <Separator />
        
        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Workflow className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Projects</h2>
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Production-grade streaming pipelines built with Kafka, Spark, and cloud-native services. 
                Each project demonstrates real-world patterns for reliability, scalability, and observability.
              </p>

              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="aws">AWS</TabsTrigger>
                  <TabsTrigger value="azure">Azure</TabsTrigger>
                  <TabsTrigger value="gcp">GCP</TabsTrigger>
                  <TabsTrigger value="multi">Multi-Cloud</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="aws" className="mt-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {projects.filter(p => p.cloud === "AWS").map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="azure" className="mt-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {projects.filter(p => p.cloud === "Azure").map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="gcp" className="mt-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {projects.filter(p => p.cloud === "GCP").map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="multi" className="mt-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {projects.filter(p => p.cloud.includes("+")).map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-center">
                <Button variant="outline" asChild>
                  <a href="https://github.com/sunildataengineer" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View All on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Technical Skills Section */}
        <section id="skills" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Wrench className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Technical Skills</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {skillCategories.map((category) => (
                  <Card key={category.category} className="bg-card/50 border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1.5">
                        {category.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Certifications Section */}
        <section id="certifications" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Award className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Certifications</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {certifications.map((cert) => (
                  <Card key={cert.title} className="bg-card/50 border-border/50">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <CardTitle className="text-base font-semibold">{cert.title}</CardTitle>
                          <CardDescription>{cert.issuer}</CardDescription>
                        </div>
                        <Badge variant="outline" className={cert.color}>
                          {cert.badge}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Issued: {cert.date}</span>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Credential
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* How I Think Section */}
        <section id="thinking" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">How I Think as a Data Engineer</h2>
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Engineering is about making decisions under constraints. Here are the principles that guide my work.
              </p>
              <div className="grid gap-6">
                {engineeringPrinciples.map((principle, index) => (
                  <Card key={index} className="bg-card/50 border-border/50">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-secondary/70 flex items-center justify-center shrink-0">
                          <principle.icon className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-1">{principle.title}</CardTitle>
                          <CardDescription>{principle.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pl-18">
                      <ul className="space-y-2 mb-4">
                        {principle.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-medium text-foreground border-l-2 border-foreground/20 pl-3">
                        {principle.conclusion}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* My Process Section */}
        <section id="process" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Wrench className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">How I Built These Projects</h2>
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                I didn&apos;t start with the code. I started with the problem.
              </p>
              <div className="grid gap-6">
                {buildProcess.map((step) => (
                  <Card key={step.step} className="bg-card/50 border-border/50">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0 font-bold">
                          {step.step}
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-1">{step.title}</CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pl-18">
                      <ul className="space-y-2 mb-4">
                        {(step.examples || step.questions || step.items || step.metrics)?.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-medium text-foreground border-l-2 border-emerald-500/50 pl-3">
                        {step.rule}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Get in Touch</h2>
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Interested in collaborating or have a data engineering challenge? Let&apos;s connect.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <a 
                      href="mailto:sunildataengineer@outlook.com" 
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>sunildataengineer@outlook.com</span>
                    </a>
                    <a 
                      href="tel:+919380691205" 
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>+91 9380691205</span>
                    </a>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>Banashankari 3rd Stage, Bangalore, Karnataka</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <a 
                      href="https://github.com/sunildataengineer" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span>github.com/sunildataengineer</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/suniil-data-engineer/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span>linkedin.com/in/suniil-data-engineer</span>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Built by Sunil - Data Engineer
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/sunildataengineer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/suniil-data-engineer/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:sunildataengineer@outlook.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
