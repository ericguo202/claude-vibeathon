const mongoose = require('mongoose');
const Club = require('./models/Club');

// MongoDB connection string - update with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/princeton-clubs';

const clubs = [
  // STEM & Technical
  {
    name: "Hoagie Club",
    email: "hoagieclub@princeton.edu",
    description: "Software development club focused on building practical applications and fostering a collaborative coding community. Members work on projects ranging from web apps to mobile development.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 0,
    timeCommitment: 4,
    image: "stem_technical.jpg"
  },
  {
    name: "Princeton Robotics Club",
    email: "robotics@princeton.edu",
    description: "Design, build, and program robots for competitions and research. Members gain hands-on experience with mechanical engineering, electronics, and programming.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 50,
    timeCommitment: 7,
    image: "stem_technical.jpg"
  },
  {
    name: "Women in Computer Science",
    email: "wics@princeton.edu",
    description: "Supporting and empowering women in technology through workshops, mentorship programs, networking events, and technical skill-building sessions.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "stem_technical.jpg"
  },
  {
    name: "HackPrinceton",
    email: "hackprinceton@princeton.edu",
    description: "Organize Princeton's premier hackathon and host coding workshops throughout the year. Open to all students interested in technology and innovation.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 0,
    timeCommitment: 5,
    image: "stem_technical.jpg"
  },

  // Pre-Professional/Career Development
  {
    name: "Princeton Biomedical Engineering Society",
    email: "pbes@princeton.edu",
    description: "Professional development organization for students interested in biomedical engineering careers. Hosts industry speakers, lab tours, and networking events.",
    category: "Pre-Professional/Career Development",
    selective: false,
    membershipDues: 20,
    timeCommitment: 2,
    image: "business.jpg"
  },
  {
    name: "Princeton Pre-Law Society",
    email: "prelaw@princeton.edu",
    description: "Supporting students interested in legal careers through LSAT prep, law school application guidance, and connections with legal professionals.",
    category: "Pre-Professional/Career Development",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "business.jpg"
  },
  {
    name: "Princeton Consulting Club",
    email: "consulting@princeton.edu",
    description: "Develop consulting skills through case competitions, workshops, and networking with consulting firms. Selective membership with competitive application process.",
    category: "Pre-Professional/Career Development",
    selective: true,
    membershipDues: 40,
    timeCommitment: 5,
    image: "business.jpg"
  },
  {
    name: "Princeton Pre-Medical Society",
    email: "premed@princeton.edu",
    description: "Support pre-medical students through MCAT preparation, medical school application guidance, clinical volunteering opportunities, and physician shadowing connections.",
    category: "Pre-Professional/Career Development",
    selective: false,
    membershipDues: 15,
    timeCommitment: 3,
    image: "business.jpg"
  },

  // Media & Communication
  {
    name: "The Daily Princetonian",
    email: "daily.prince@princeton.edu",
    description: "Princeton's independent student newspaper, published since 1876. Covers campus news, sports, opinion, and features. Open to writers, editors, photographers, and business staff.",
    category: "Media & Communication",
    selective: false,
    membershipDues: 0,
    timeCommitment: 7,
    image: "media_communication.png"
  },
  {
    name: "Figments Magazine",
    email: "figments@princeton.edu",
    description: "Princeton's creative arts magazine featuring student poetry, prose, visual art, and photography. Published twice per semester.",
    category: "Media & Communication",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "media_communication.png"
  },
  {
    name: "The Nassau Weekly",
    email: "nassauweekly@princeton.edu",
    description: "Princeton's humor and satire magazine, providing comedic commentary on campus life and current events since 1981.",
    category: "Media & Communication",
    selective: false,
    membershipDues: 0,
    timeCommitment: 4,
    image: "media_communication.png"
  },
  {
    name: "Princeton University Press Club",
    email: "pressclub@princeton.edu",
    description: "Student journalism organization covering university events and providing multimedia storytelling opportunities including podcasting and video production.",
    category: "Media & Communication",
    selective: false,
    membershipDues: 0,
    timeCommitment: 4,
    image: "media_communication.png"
  },

  // Performance & Creative Arts
  {
    name: "VTone A Cappella",
    email: "vtone@princeton.edu",
    description: "Princeton's premier all-gender a cappella group performing contemporary pop, R&B, and original arrangements at campus events and competitions.",
    category: "Performance & Creative Arts",
    selective: true,
    membershipDues: 100,
    timeCommitment: 7,
    image: "performance_arts.jpg"
  },
  {
    name: "Princeton University Glee Club",
    email: "gleeclub@princeton.edu",
    description: "One of the oldest collegiate choirs in the United States, performing classical and contemporary choral music at concerts and tours.",
    category: "Performance & Creative Arts",
    selective: false,
    membershipDues: 75,
    timeCommitment: 6,
    image: "performance_arts.jpg"
  },
  {
    name: "Princeton Triangle Club",
    email: "triangle@princeton.edu",
    description: "Touring musical comedy theatre troupe founded in 1893. Produces an original musical each year and tours during winter break.",
    category: "Performance & Creative Arts",
    selective: true,
    membershipDues: 200,
    timeCommitment: 10,
    image: "performance_arts.jpg"
  },
  {
    name: "Princeton University Players",
    email: "pup@princeton.edu",
    description: "Student-run theatre company producing plays and musicals throughout the academic year. Open to actors, directors, designers, and technical crew.",
    category: "Performance & Creative Arts",
    selective: false,
    membershipDues: 0,
    timeCommitment: 8,
    image: "performance_arts.jpg"
  },

  // Outdoor & Recreation
  {
    name: "Outdoor Action",
    email: "outdooraction@princeton.edu",
    description: "Wilderness pre-orientation program for incoming freshmen and year-round outdoor adventure trips including hiking, camping, climbing, and kayaking.",
    category: "Outdoor & Recreation",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "outdoor_recreation.jpg"
  },
  {
    name: "Princeton Outing Club",
    email: "outingclub@princeton.edu",
    description: "Organize outdoor recreational trips including hiking, backpacking, rock climbing, skiing, and paddling. Equipment rentals available to members.",
    category: "Outdoor & Recreation",
    selective: false,
    membershipDues: 30,
    timeCommitment: 2,
    image: "outdoor_recreation.jpg"
  },

  // Service Learning & Community Engagement
  {
    name: "Acts of Kindness",
    email: "kindness@princeton.edu",
    description: "Promote kindness and community service through random acts of kindness, care packages, and support for fellow students and local community members.",
    category: "Service Learning & Community Engagement",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "service_community.jpg"
  },
  {
    name: "Camp Kesem at Princeton",
    email: "kesem@princeton.edu",
    description: "Chapter of national organization supporting children whose parents have been affected by cancer through free summer camp programs and year-round activities.",
    category: "Service Learning & Community Engagement",
    selective: false,
    membershipDues: 0,
    timeCommitment: 4,
    image: "service_community.jpg"
  },
  {
    name: "Blossom Together",
    email: "blossom@princeton.edu",
    description: "Student-led humanitarian organization supporting improved living standards in developing African countries through fundraising and awareness campaigns.",
    category: "Service Learning & Community Engagement",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "service_community.jpg"
  },
  {
    name: "Princeton Tutoring Program",
    email: "tutoring@princeton.edu",
    description: "Provide free tutoring to local Trenton students in math, reading, and other subjects. Weekly commitment during the academic year.",
    category: "Service Learning & Community Engagement",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "service_community.jpg"
  },

  // Advocacy/Social Justice
  {
    name: "Jewish Progressives at Princeton",
    email: "jewishprogressives@princeton.edu",
    description: "Advocacy group promoting social justice from a progressive Jewish perspective, focusing on intersectional activism and community dialogue.",
    category: "Advocacy/Social Justice",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "advocacy_socialjustice.jpg"
  },
  {
    name: "Princeton Environmental Action",
    email: "environment@princeton.edu",
    description: "Campus environmental advocacy organization working on sustainability initiatives, climate action, and environmental education.",
    category: "Advocacy/Social Justice",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "advocacy_socialjustice.jpg"
  },

  // Research & Innovation
  {
    name: "AI@Princeton",
    email: "aiprinceton@princeton.edu",
    description: "Research and discussion group exploring artificial intelligence applications, ethics, and innovations. Host talks with AI researchers and industry leaders.",
    category: "Research & Innovation",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "research_innovation.jpg"
  },
  {
    name: "Claude Builder Club",
    email: "claudebuilder@princeton.edu",
    description: "Hands-on club focused on building AI-powered applications and exploring large language model capabilities through practical projects.",
    category: "Research & Innovation",
    selective: false,
    membershipDues: 0,
    timeCommitment: 4,
    image: "research_innovation.jpg"
  },

  // Governance/Leadership
  {
    name: "American Whig-Cliosophic Society",
    email: "whigclio@princeton.edu",
    description: "Nation's oldest college political, literary, and debating society. Host debates, lectures, and discussions on contemporary issues since 1769.",
    category: "Governance/Leadership",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "governance.svg"
  },
  {
    name: "Undergraduate Student Government",
    email: "usg@princeton.edu",
    description: "Primary representative body for Princeton undergraduates, working with administration on policy, organizing events, and funding student organizations.",
    category: "Governance/Leadership",
    selective: true,
    membershipDues: 0,
    timeCommitment: 7,
    image: "governance.svg"
  },

  // Special Interest/Hobby
  {
    name: "Princeton Chess Club",
    email: "chess@princeton.edu",
    description: "Weekly chess games, tournaments, and instruction for players of all skill levels. Compete in intercollegiate chess competitions.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 10,
    timeCommitment: 2,
    image: "interest_hobby.jpg"
  },
  {
    name: "Princeton Crochet Club",
    email: "crochet@princeton.edu",
    description: "Learn and practice crochet while socializing. Create projects ranging from scarves to stuffed animals. All skill levels welcome.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 15,
    timeCommitment: 2,
    image: "interest_hobby.jpg"
  },
  {
    name: "Princeton Board Game Club",
    email: "boardgames@princeton.edu",
    description: "Weekly gatherings to play board games including strategy games, party games, and RPGs. Large game library available to members.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "interest_hobby.jpg"
  },

  // Athletic
  {
    name: "Club Tennis",
    email: "clubtennis@princeton.edu",
    description: "Competitive and recreational tennis for students of all skill levels. Travel to tournaments and compete against other universities.",
    category: "Athletic",
    selective: false,
    membershipDues: 100,
    timeCommitment: 6,
    image: "athletics.jpg"
  },
  {
    name: "Princeton Running Club",
    email: "running@princeton.edu",
    description: "Group runs for all paces and distances. Participate in local road races and build a supportive running community.",
    category: "Athletic",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "athletics.jpg"
  },
  {
    name: "Princeton Ultimate Frisbee",
    email: "ultimate@princeton.edu",
    description: "Competitive ultimate frisbee team competing in regional and national tournaments. Practices multiple times per week.",
    category: "Athletic",
    selective: false,
    membershipDues: 150,
    timeCommitment: 8,
    image: "athletics.jpg"
  },

  // Cultural/Religious
  {
    name: "Princeton Christian Fellowship",
    email: "pcf@princeton.edu",
    description: "Christian community offering Bible studies, worship services, fellowship events, and spiritual support for students of all backgrounds.",
    category: "Cultural/Religious",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "cultural_religious.jpg"
  },
  {
    name: "South Asian Students Association",
    email: "sasa@princeton.edu",
    description: "Celebrate and share South Asian culture through festivals, performances, discussions, and community building events.",
    category: "Cultural/Religious",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "cultural_religious.jpg"
  },
  {
    name: "Princeton Hillel",
    email: "hillel@princeton.edu",
    description: "Jewish student life organization offering Shabbat services, holiday celebrations, social events, and community engagement opportunities.",
    category: "Cultural/Religious",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "cultural_religious.jpg"
  },

  // Business & International Affairs
  {
    name: "Business Today",
    email: "businesstoday@princeton.edu",
    description: "Student-run organization hosting the International Conference bringing together students and business leaders to discuss contemporary business issues.",
    category: "Business & International Affairs",
    selective: true,
    membershipDues: 50,
    timeCommitment: 6,
    image: "business.jpg"
  },
  {
    name: "Princeton Student Ventures",
    email: "psv@princeton.edu",
    description: "Student-run venture capital organization providing funding and mentorship to student entrepreneurs. Review business plans and make investment decisions.",
    category: "Business & International Affairs",
    selective: true,
    membershipDues: 0,
    timeCommitment: 5,
    image: "business.jpg"
  },
  {
    name: "Model United Nations",
    email: "mun@princeton.edu",
    description: "Participate in Model UN conferences simulating United Nations proceedings. Develop skills in diplomacy, negotiation, and public speaking.",
    category: "Business & International Affairs",
    selective: false,
    membershipDues: 75,
    timeCommitment: 5,
    image: "business.jpg"
  },

  // Eating Clubs
  {
    name: "Charter Club",
    email: "charter@princeton.edu",
    description: "Sign-in eating club known for its welcoming atmosphere, diverse membership, and engaging social events. Open to juniors and seniors.",
    category: "Eating Club",
    selective: false,
    membershipDues: 8500,
    timeCommitment: 2,
    image: "eating_club.jpg"
  },
  {
    name: "Tiger Inn",
    email: "tigerinn@princeton.edu",
    description: "Bicker eating club founded in 1890, known for its social atmosphere and strong community. One of the most historic clubs on Prospect Avenue.",
    category: "Eating Club",
    selective: true,
    membershipDues: 9000,
    timeCommitment: 2,
    image: "eating_club.jpg"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing clubs
    await Club.deleteMany({});
    console.log('Cleared existing clubs');

    // Insert new clubs
    await Club.insertMany(clubs);
    console.log(`Successfully seeded ${clubs.length} clubs`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();