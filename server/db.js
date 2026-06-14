// In-memory store — swap these with Supabase queries in production
const bcrypt = require('bcryptjs');

const db = {
  school: {
    id: 1,
    name: 'Alwaarith Nursery & Primary School',
    tagline: 'Nurturing Minds, Shaping Futures',
    email: 'info@alwaarithschool.edu',
    phone: '+234 800 000 0000',
    address: 'No. 1 Knowledge Lane, Abuja, FCT, Nigeria',
    about: 'Alwaarith Nursery & Primary School is a leading educational institution dedicated to providing quality education in a nurturing environment. We blend modern pedagogy with strong moral values.',
    vision: 'To be the foremost institution for holistic child development in Nigeria.',
    mission: 'Providing an engaging, inclusive, and values-based education that prepares every child for lifelong success.',
    founded: 2005,
    students: 450,
    teachers: 32,
    programs: ['Nursery 1 & 2', 'Kindergarten', 'Primary 1–6'],
    logo: null,
    heroImage: null,
    primaryColor: '#1B4F8A',
    accentColor: '#F4A100',
    portalUrl: 'https://app.alwaarithschool.edu',
  },
  users: [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@alwaarithschool.edu',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin',
    }
  ],
  events: [
    { id: 1, title: 'Back to School Open Day', date: '2025-09-05', time: '9:00 AM', location: 'School Hall', description: 'Welcome parents and new students for the new academic session. Tour classrooms and meet teachers.', category: 'General', image: null, published: true },
    { id: 2, title: 'Annual Sports Day', date: '2025-10-15', time: '8:00 AM', location: 'School Field', description: 'A day of athletic competitions, team spirit and healthy fun for all students.', category: 'Sports', image: null, published: true },
    { id: 3, title: 'Cultural Day Celebration', date: '2025-11-20', time: '10:00 AM', location: 'Main Hall', description: 'Students showcase Nigeria\'s rich cultural heritage through dance, music, and costumes.', category: 'Cultural', image: null, published: true },
    { id: 4, title: 'PTA Meeting – First Term', date: '2025-10-01', time: '3:00 PM', location: 'Conference Room', description: 'Parents and teachers discuss student progress and school improvements for the term.', category: 'PTA', image: null, published: true },
    { id: 5, title: 'End of Year Graduation', date: '2025-12-10', time: '11:00 AM', location: 'School Hall', description: 'Graduation ceremony for Primary 6 leavers and prize-giving day for all students.', category: 'Graduation', image: null, published: true },
  ],
  pages: [
    { id: 1, slug: 'about', title: 'About Us', content: '', published: true },
    { id: 2, slug: 'admissions', title: 'Admissions', content: '', published: true },
    { id: 3, slug: 'academics', title: 'Academics', content: '', published: true },
  ],
  admissions: [],
  nextId: { events: 6, users: 2, admissions: 1 },
};

module.exports = db;
