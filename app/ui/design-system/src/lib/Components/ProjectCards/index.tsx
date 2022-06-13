import { ButtonLink } from "../Button"
import ProjectCard, { ProjectCardProps } from "../ProjectCard"

export type ProjectCardsProps = {
  projects: ProjectCardProps[]
}

const ProjectCards = ({ projects }: ProjectCardsProps) => {
  return (
    <div className="container">
      <div className="text-h2 mb-10">Featured Initiatives</div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
        <ButtonLink href="#" rightIcon="external">
          Submit a Project
        </ButtonLink>
        <ButtonLink href="#" rightIcon="right" variant="secondary">
          Go to Github
        </ButtonLink>
      </div>
    </div>
  )
}

export default ProjectCards
