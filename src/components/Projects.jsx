import React from "react";
import { GithubOutlined, LinkOutlined } from "@ant-design/icons";

export const projects = [
  {
    title: "VCET-Connect",
    description:
      "A comprehensive academic management platform designed for VCET's ecosystem. Streamline administrative processes, enhance communication, and maintain transparency across all departments.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    image: "/vcetconnect.png",
    category: "React",
    demoLink: "https://vcet-connect.onrender.com/",
    githubLink: "#",
    features: [
      "Leave Management",
      "OD Management",
      "Defaulter Management",
      "CGPA Calculator",
    ],
  },
  {
    title: "Skip The Doctor",
    description:
      "Expert care online—book consults, prescription refills, and follow-ups anytime, anywhere. Your health, simplified.",
    tags: ["NextJs", "ShadCN", "PostgreSQL", "Supabase"],
    image: "/std.png",
    category: "NextJs",
    demoLink: "https://skipthedoctor.ca/",
    githubLink: "#",
    features: [
      "Book Consults",
      "Prescription Refills",
      "Follow-ups",
      "Your Health",
    ],
  },
  {
    title: "HR Management System",
    description:
      "Streamline your HR processes with our comprehensive human resource management system. Everything you need in one powerful platform.",
    tags: ["React", "GraphQL", "PostgreSQL", "Ant UI"],
    image: "/hrms.png",
    category: "React",
    demoLink: "https://hrms-rwyv.onrender.com/",
    githubLink: "#",
    features: [
      "Employee Management",
      "Leave Management",
      "Performance Management",
      "Payroll Management",
    ],
  },
  {
    title: "Skip The Clinic",
    description:
      "Expert care online—book consults, prescription refills, and follow-ups anytime, anywhere. Your health, simplified.",
    tags: ["NextJs", "ShadCN", "PostgreSQL", "Supabase"],
    image: "/stc.png",
    category: "NextJs",
    demoLink: "https://skiptheclinic.ca/",
    githubLink: "#",
    features: [
      "Book Consults",
      "Prescription Refills",
      "Follow-ups",
      "Your Health",
    ],
  },
  {
    title: "Promptopia",
    description:
      "Discover, share, and explore AI prompts with ease. Join a community of creators and innovators.",
    tags: ["NextJs", "ShadCN", "PostgreSQL", "Supabase"],
    image: "/promptopia.png",
    category: "NextJs",
    demoLink: "https://promptopia-mauve.vercel.app/",
    githubLink: "#",
    features: ["Discover", "Share", "Explore", "Community"],
  },
  {
    title: "Eventify",
    description:
      "Eventify is a platform that allows you to discover, share, and explore events with ease. Join a community of creators and innovators.",
    tags: ["NextJs", "ShadCN", "PostgreSQL", "Supabase"],
    image: "/eventify.png",
    category: "NextJs",
    demoLink: "https://evently-beige-eight.vercel.app/",
    githubLink: "#",
    features: ["Discover", "Share", "Explore", "Community"],
  },
  {
    title: "Nike Frontend",
    description:
      "A modern and responsive frontend for Nike, built with React, Tailwind CSS, and Framer Motion.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    image: "/nike.png",
    category: "React",
    demoLink: "https://nike-frontend-one.vercel.app/",
    githubLink: "#",
    features: ["Modern", "Responsive", "Framer Motion", "Tailwind CSS"],
  },
  {
    title: "Urban Uplift",
    description:
      "A platform to report issues, collaborate with authorities, and make your community better. Together, we can create positive change.",
    tags: ["React", "Node.js", "MongoDB", "React Prime"],
    image: "/urbanuplift.png",
    category: "React",
    demoLink: "https://themainone.onrender.com/",
    githubLink: "#",
    features: ["Issue Reporting", "Collaboration", "Positive Change"],
  },
];

const Projects = ({ darkMode }) => {
  // Group projects by category
  const groupedProjects = projects.reduce((acc, project) => {
    const category = project.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {});

  const ProjectCard = ({ project }) => (
    <div
      className={`rounded-lg p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg transition-all duration-300 hover:shadow-xl`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {project.title}
          </h3>
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p
          className={`mb-4 text-sm ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.features.map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 text-xs font-medium rounded-md bg-green-50 text-green-700"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-auto">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors
                ${
                  darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <GithubOutlined className="text-lg" />
              GitHub
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LinkOutlined className="text-lg" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      {Object.entries(groupedProjects).map(([category, categoryProjects]) => (
        <div key={category} className="space-y-6">
          {/* Category Header */}
          <div className="flex items-center justify-between">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {category} Projects
            </h2>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
              {categoryProjects.length} Projects
            </span>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
