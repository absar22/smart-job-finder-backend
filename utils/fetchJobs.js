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
    }
  ];
};

module.exports = fetchJobs;