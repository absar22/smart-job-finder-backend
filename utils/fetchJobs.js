const fetchJobs = async () => {
  return [
    {
      title: "Software Engineer",
      company: "Tech Corp",
      skills: ["JavaScript", "React", "Node.js"],
      location: "New York",
      link: "job1",
      salary: 120000,
      description: "Develop and maintain web applications."
    },
    {
      title: "Data Scientist",
      company: "Data Inc",
      skills: ["Python", "ML"],
      location: "San Francisco",
      link: "job2",
      salary: 115000,
      description: "Analyze and interpret complex data sets."
    },
    {
      title: "Product Manager",
      company: "Product Co",
      skills: ["Leadership", "Communication"],
      location: "Remote",
      link: "job3",
      salary: 130000,
      description: "Lead product development and strategy."
    },
    {
      title: "UX Designer",
      company: "Design Studio",
      skills: ["Figma", "Prototyping"],
      location: "Remote",
      link: "job4",
      salary: 110000,
      description: "Design user-friendly interfaces."
    },
    {
      title: "Data Analyst",
      company: "Analytics Co",
      skills: ["SQL", "Data Visualization"],
      location: "Remote",
      link: "job5",
      salary: 105000,
      description: "Analyze and interpret complex data sets."
    },
    {
      title: "Machine Learning Engineer",
      company: "AI Solutions",
      skills: ["Python", "TensorFlow"],
      location: "Remote",
      link: "job6",
      salary: 125000,
      description: "Develop and implement machine learning models."
    },
    {
      title: "DevOps Engineer",
      company: "Cloud Corp",
      skills: ["AWS", "Docker", "Kubernetes"],
      location: "Austin",
      link: "job7",
      salary: 130000,
      description: "Manage and optimize cloud infrastructure."
    },
    {
      title: "Full Stack Developer",
      company: "Web Solutions",
      skills: ["JavaScript", "React", "Node.js", "CSS"],
      location: "Remote",
      link: "job8",
      salary: 125000,
      description: "Build and maintain web applications."
    },{
      title: "Backend Developer",
      company: "API Solutions",
      skills: ["Node.js", "Express", "MongoDB"],
      location: "Remote",
      link: "job9",
      salary: 120000,
      description: "Develop and maintain server-side applications."
    },{
      title: "QA Engineer",
      company: "Testing Co",
      skills: ["Selenium", "TestRail"],
      location: "Remote",
      link: "job10",
      salary: 110000,
      description: "Ensure the quality of software products."
    },{
      title: "Cloud Engineer",
      company: "Cloud Solutions",
      skills: ["AWS", "Azure", "Terraform"],
      location: "Remote",
      link: "job11",
      salary: 125000,
      description: "Design and manage cloud infrastructure."
    }
  ];
};

module.exports = fetchJobs;