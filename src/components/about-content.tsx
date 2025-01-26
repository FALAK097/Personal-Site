import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Layout,
  Server,
  Terminal,
  Workflow,
  Code2,
} from "lucide-react"

export function AboutContent() {
  const skills = {
    Frontend: {
      icon: <Layout className="w-5 h-5" />,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    },
    Backend: {
      icon: <Server className="w-5 h-5" />,
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
    },
    Tools: {
      icon: <Terminal className="w-5 h-5" />,
      items: ["Git", "Docker", "AWS", "Vercel", "VS Code"],
    },
    Other: {
      icon: <Workflow className="w-5 h-5" />,
      items: ["Agile", "CI/CD", "Testing", "Performance Optimization"],
    },
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">About Me</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            I&apos;m a software engineer passionate about building products that make a difference. With a focus on web
            technologies and user experience, I strive to create efficient, scalable, and maintainable solutions to
            complex problems.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Bachelor of Technology in Computer Science</h3>
              <p className="text-sm text-muted-foreground">University Name • 2018-2022</p>
              <p className="text-sm mt-2">
                Focused on core computer science concepts, data structures, and algorithms. Participated in various
                hackathons and coding competitions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Full Stack Development Bootcamp</h3>
              <p className="text-sm text-muted-foreground">Tech Academy • 2022</p>
              <p className="text-sm mt-2">
                Intensive program covering modern web development technologies and best practices.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Software Engineer</h3>
              <p className="text-sm text-muted-foreground">Current Company • 2022-Present</p>
              <ul className="text-sm mt-2 list-disc list-inside space-y-1">
                <li>Developing and maintaining full-stack web applications</li>
                <li>Implementing new features and optimizing performance</li>
                <li>Collaborating with cross-functional teams</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Software Developer Intern</h3>
              <p className="text-sm text-muted-foreground">Previous Company • 2021</p>
              <ul className="text-sm mt-2 list-disc list-inside space-y-1">
                <li>Assisted in developing frontend components</li>
                <li>Participated in code reviews and team meetings</li>
                <li>Learned industry best practices</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(skills).map(([category, { icon, items }]) => (
              <div key={category}>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  {icon}
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Projects & Contributions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Open Source Contributions</h3>
              <p className="text-sm text-muted-foreground">
                Actively contributing to various open-source projects, focusing on improving documentation and fixing
                bugs. Regular participant in Hacktoberfest and other community events.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Personal Projects</h3>
              <p className="text-sm text-muted-foreground">
                Building and maintaining several side projects to experiment with new technologies and improve my
                skills. Check out my projects page for more details.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

