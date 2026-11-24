/**
 * Single source of truth for every visible fact on the site.
 * Facts come from the owner's brief or from verified public GitHub data.
 * Nothing in this file should be invented: no metrics, dates or credentials.
 */

export const profile = {
  name: 'GOKULNATH S B',
  displayName: 'Gokulnath S B',
  degree: 'B.E. Computer Science and Engineering',
  college: 'Dhaanish Ahmed College of Engineering, Chennai.',
  identity:
    'Computer Science Engineering Student | Aspiring Software Engineer | Research & Innovation Enthusiast',
  about:
    'I am a Computer Science Engineering student interested in software development, research, innovation and emerging technologies. I enjoy building practical projects, exploring new technologies, solving problems and continuously improving my technical knowledge.',
  gpa: [
    { label: 'Semester 1', value: '8.64' },
    { label: 'Semester 2', value: '9.12' },
    { label: 'CGPA', value: '8.88' },
  ],
  email: 'mrgokulnath3110@gmail.com',
  social: {
    github: 'https://github.com/Gokulnath-SB',
    linkedin: 'https://www.linkedin.com/in/gokulnath-s-b-7886ba381/',
    whatsapp: 'https://wa.me/917339051316',
  },
};

export const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Education', id: 'education' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
];

/** Every URL below was fetched successfully during asset research. */
export const assets = {
  hero: 'https://images.pexels.com/photos/33437258/pexels-photo-33437258.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
  intro:
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&h=900&q=80',
  introAlternate:
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600&h=900&q=80',
  about:
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&h=900&q=80',
  field:
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&h=900&q=80',
  farmland:
    'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1600&h=900&q=80',
  forestRiver:
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&h=900&q=80',
  forestTexture:
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&h=900&q=80',
  nanoLab: {
    inside:
      'https://raw.githubusercontent.com/Gokulnath-SB/nano-lab-/main/assets/INSIDE%20VIEW%20LAB.png',
    robotics:
      'https://raw.githubusercontent.com/Gokulnath-SB/nano-lab-/main/assets/ROBOTICS%20ZONE.png',
    coding:
      'https://raw.githubusercontent.com/Gokulnath-SB/nano-lab-/main/assets/CODING%20ZONE.png',
  },
};

export const skillGroups = [
  {
    title: 'Programming',
    items: [{ name: 'C++' }, { name: 'Java', note: 'Currently learning' }, { name: 'Python' }],
  },
  {
    title: 'Web Development',
    items: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'React.js' }],
  },
  {
    title: 'Tools and Platforms',
    items: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Antigravity' },
      { name: 'OpenCode' },
      { name: 'HackerRank' },
      { name: 'LeetCode' },
      { name: 'Oracle Java Learning' },
    ],
  },
  {
    title: 'Professional Skills',
    items: [
      { name: 'Research and Development' },
      { name: 'Leadership' },
      { name: 'Teamwork' },
      { name: 'Problem Solving' },
      { name: 'Presentation' },
    ],
  },
];

export const projects = [
  {
    id: 'garmo',
    number: '01',
    name: 'GARMO / GARMENTFLOW',
    kind: 'Production management dashboard',
    summary:
      'A garment factory production and management dashboard that follows an order through the full factory floor.',
    workflow: [
      'Order',
      'Cutting',
      'Stitching',
      'Quality Check',
      'Ironing',
      'Packing',
      'Dispatch',
    ],
    features: ['Order tracking', 'Production monitoring', 'Section-wise workflow', 'Management dashboard'],
    tech: ['Dashboard', 'Workflow', 'Production'],
    image: assets.field,
    imageAlt: 'Green agricultural field used as an atmospheric backdrop, not a project screenshot.',
    links: {
      github: 'https://github.com/Gokulnath-SB/garmo.hike',
    },
    sourceNote: 'The repository link supplied for this project currently returns 404 from GitHub’s public API.',
  },
  {
    id: 'brocode',
    number: '02',
    name: 'BROCODE',
    kind: 'ServiceHub — IT Help Desk',
    summary:
      'A technical support and IT assistance project. The repository is named ServiceHub — IT Help Desk Backend API: a ticket-based help desk with an Express, SQLite and JWT backend and a React frontend.',
    features: ['Ticket-based help desk', 'JWT authentication', 'Analytics', 'Kanban status transitions'],
    tech: ['React', 'Express', 'SQLite', 'JWT'],
    image: assets.forestRiver,
    imageAlt: 'Forest river used as an atmospheric backdrop, not a project screenshot.',
    links: {
      github: 'https://github.com/Gokulnath-SB/brocode',
      live: 'https://brocode-ruddy.vercel.app',
    },
  },
  {
    id: 'nano-spark',
    number: '03',
    name: 'NANO SPARK ROBOTICS LAB',
    kind: 'Robotics laboratory website',
    summary:
      'A robotics laboratory website presenting robotics, departments and laboratory activities, with a 3D navigation journey and a 360° lab experience.',
    features: ['Robotics and departments', 'Laboratory activities', '3D lab journey', '360° tour'],
    tech: ['JavaScript', 'Three.js', 'GSAP'],
    image: assets.nanoLab.inside,
    imageAlt: 'Actual Nano Spark laboratory interior image from the project repository.',
    gallery: [
      { src: assets.nanoLab.robotics, alt: 'Robotics zone image from the Nano Spark repository.' },
      { src: assets.nanoLab.coding, alt: 'Coding zone image from the Nano Spark repository.' },
    ],
    links: {
      github: 'https://github.com/Gokulnath-SB/nano-lab-',
      live: 'https://nanospark-360.vercel.app/',
    },
  },
];

export const experience = [
  {
    id: 'internship',
    type: 'Internship',
    title: 'PYTHON DEVELOPMENT INTERNSHIP',
    detail:
      'A Python development internship experience. No company name, dates or responsibilities have been supplied, so none are claimed here.',
  },
  {
    id: 'hackathon',
    type: 'Hackathon',
    title: 'SMART INDIA HACKATHON PARTICIPATION',
    project:
      'Safe and Efficient Operation of Mine Vehicles in Fog and Low-Visibility Conditions in Open Cast Iron Ore Mines.',
    detail:
      'A smart mining vehicle safety concept focused on low-visibility environments, obstacle detection and warning systems.',
  },
];

export const certifications = [
  {
    id: 'oracle-java',
    title: 'Oracle Java Learning',
    detail: 'Two badges',
    status: 'Completed',
  },
  {
    id: 'hackerrank-java',
    title: 'HackerRank Java coding practice',
    detail: 'Coding practice',
    status: 'In Progress',
  },
  {
    id: 'leetcode',
    title: 'LeetCode coding practice',
    detail: 'Coding practice',
    status: 'Ongoing',
  },
  {
    id: 'be10x',
    title: 'be10x AI Tools',
    detail: 'AI Tools certificate',
    status: 'Certificate',
  },
];

/** Public repos fetched from https://api.github.com/users/Gokulnath-SB/repos?per_page=100. */
export const repositories = [
  {
    name: 'brocode',
    language: 'JavaScript',
    url: 'https://github.com/Gokulnath-SB/brocode',
    homepage: 'https://brocode-ruddy.vercel.app',
  },
  {
    name: 'nano-lab-',
    language: 'JavaScript',
    url: 'https://github.com/Gokulnath-SB/nano-lab-',
    homepage: 'https://nano-lab.vercel.app',
  },
  {
    name: 'java_lab_manual',
    language: 'Java',
    url: 'https://github.com/Gokulnath-SB/java_lab_manual',
    homepage: null,
  },
  {
    name: '3a-java-shape-area-calculator',
    language: null,
    url: 'https://github.com/Gokulnath-SB/3a-java-shape-area-calculator',
    homepage: null,
  },
  {
    name: '3b-store-the-value-of-pi',
    language: null,
    url: 'https://github.com/Gokulnath-SB/3b-store-the-value-of-pi',
    homepage: null,
  },
  {
    name: 'leetcode',
    language: null,
    url: 'https://github.com/Gokulnath-SB/leetcode',
    homepage: null,
  },
];
