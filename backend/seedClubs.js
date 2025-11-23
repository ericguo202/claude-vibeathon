const mongoose = require('mongoose');
const Club = require('./models/Club');

// MongoDB connection string - update with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/princeton-clubs';

const clubs = [
  // STEM & Technical (12 clubs total)
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
  {
    name: "Princeton Rocketry Club",
    email: "rocketry@princeton.edu",
    description: "Design, build, and launch high-powered rockets. Compete in national competitions and conduct experiments in aerospace engineering.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 60,
    timeCommitment: 6,
    image: "stem_technical.jpg"
  },
  {
    name: "Cyberphysical Systems Club",
    email: "cyberphys@princeton.edu",
    description: "Explore the intersection of computing and physical systems. Build drones, IoT devices, and smart systems through hands-on projects.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 30,
    timeCommitment: 5,
    image: "stem_technical.jpg"
  },
  {
    name: "Princeton Blockchain Club",
    email: "blockchain@princeton.edu",
    description: "Study and develop blockchain technologies, cryptocurrencies, and decentralized applications. Host workshops and speaker events.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "stem_technical.jpg"
  },
  {
    name: "Princeton Quantum Computing Club",
    email: "quantum@princeton.edu",
    description: "Explore quantum computing theory and applications. Work with quantum programming languages and engage with cutting-edge research.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "stem_technical.jpg"
  },
  {
    name: "Princeton Data Science Club",
    email: "datascience@princeton.edu",
    description: "Apply data science techniques to real-world problems. Work on machine learning projects, data visualization, and statistical analysis.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 0,
    timeCommitment: 4,
    image: "stem_technical.jpg"
  },
  {
    name: "Engineers Without Borders",
    email: "ewb@princeton.edu",
    description: "Partner with developing communities to design and implement sustainable engineering projects including water systems and infrastructure.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 40,
    timeCommitment: 5,
    image: "stem_technical.jpg"
  },
  {
    name: "Princeton 3D Printing Club",
    email: "3dprinting@princeton.edu",
    description: "Learn additive manufacturing techniques and create 3D printed projects. Access to multiple 3D printers and CAD training.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 25,
    timeCommitment: 3,
    image: "stem_technical.jpg"
  },
  {
    name: "Makers@Princeton",
    email: "makers@princeton.edu",
    description: "Hands-on club for building, inventing, and creating. Access to makerspace tools including laser cutters, soldering stations, and woodworking equipment.",
    category: "STEM & Technical",
    selective: false,
    membershipDues: 35,
    timeCommitment: 4,
    image: "stem_technical.jpg"
  },

  // Pre-Professional/Career Development (10 clubs total)
  {
    name: "Princeton Biomedical Engineering Society",
    email: "pbes@princeton.edu",
    description: "Professional development organization for students interested in biomedical engineering careers. Hosts industry speakers, lab tours, and networking events.",
    category: "Pre-Professional/Career Development",
    selective: false,
    membershipDues: 20,
    timeCommitment: 2,
    image: "career.jpg"
  },
  {
    name: "Princeton Pre-Law Society",
    email: "prelaw@princeton.edu",
    description: "Supporting students interested in legal careers through LSAT prep, law school application guidance, and connections with legal professionals.",
    category: "Pre-Professional/Career Development",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "career.jpg"
  },
  {
    name: "Princeton Consulting Club",
    email: "consulting@princeton.edu",
    description: "Develop consulting skills through case competitions, workshops, and networking with consulting firms. Selective membership with competitive application process.",
    category: "Pre-Professional/Career Development",
    selective: true,
    membershipDues: 40,
    timeCommitment: 5,
    image: "career.jpg"
  },
  {
    name: "Princeton Pre-Medical Society",
    email: "premed@princeton.edu",
    description: "Support pre-medical students through MCAT preparation, medical school application guidance, clinical volunteering opportunities, and physician shadowing connections.",
    category: "Pre-Professional/Career Development",
    selective: false,
    membershipDues: 15,
    timeCommitment: 3,
    image: "career.jpg"
  },
  {
    name: "Princeton Finance Club",
    email: "finance@princeton.edu",
    description: "Learn about investment banking, trading, and asset management through workshops, speaker events, and networking opportunities with finance professionals.",
    category: "Pre-Professional/Career Development",
    selective: false,
    membershipDues: 30,
    timeCommitment: 3,
    image: "career.jpg"
  },
  {
    name: "Princeton Investment Company",
    email: "pic@princeton.edu",
    description: "Student-run investment fund managing a real portfolio. Learn equity research, portfolio management, and investment analysis.",
    category: "Pre-Professional/Career Development",
    selective: true,
    membershipDues: 0,
    timeCommitment: 7,
    image: "career.jpg"
  },
  {
    name: "Princeton Marketing Group",
    email: "marketing@princeton.edu",
    description: "Explore marketing strategy, brand management, and digital marketing through case competitions and consulting projects for real clients.",
    category: "Pre-Professional/Career Development",
    selective: false,
    membershipDues: 20,
    timeCommitment: 4,
    image: "career.jpg"
  },
  {
    name: "Princeton Women in Business",
    email: "wib@princeton.edu",
    description: "Support women pursuing business careers through mentorship, networking events, and professional development workshops.",
    category: "Pre-Professional/Career Development",
    selective: false,
    membershipDues: 15,
    timeCommitment: 2,
    image: "career.jpg"
  },
  {
    name: "Princeton Entrepreneurship Club",
    email: "entrepreneurship@princeton.edu",
    description: "Support student entrepreneurs through pitch competitions, startup weekends, and connections with investors and successful founders.",
    category: "Pre-Professional/Career Development",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "career.jpg"
  },
  {
    name: "Princeton Real Estate Club",
    email: "realestate@princeton.edu",
    description: "Learn about real estate development, investment, and finance through site visits, speaker events, and case competitions.",
    category: "Pre-Professional/Career Development",
    selective: false,
    membershipDues: 25,
    timeCommitment: 2,
    image: "career.jpg"
  },

  // Media & Communication (10 clubs total)
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
  {
    name: "Nassau Literary Review",
    email: "nassaulit@princeton.edu",
    description: "Second-oldest collegiate literary magazine in the U.S., publishing poetry, fiction, essays, and visual art since 1842.",
    category: "Media & Communication",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "media_communication.png"
  },
  {
    name: "Princeton Tory",
    email: "princetontory@princeton.edu",
    description: "Conservative student magazine offering alternative perspectives on campus and national issues through essays and commentary.",
    category: "Media & Communication",
    selective: false,
    membershipDues: 0,
    timeCommitment: 4,
    image: "media_communication.png"
  },
  {
    name: "Innovation Magazine",
    email: "innovation@princeton.edu",
    description: "Student-run science and technology magazine providing cutting-edge science news and featuring undergraduate research.",
    category: "Media & Communication",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "media_communication.png"
  },
  {
    name: "Princeton Undergraduate Research Journal",
    email: "purj@princeton.edu",
    description: "Peer-reviewed journal showcasing high-quality undergraduate research across all academic disciplines.",
    category: "Media & Communication",
    selective: false,
    membershipDues: 0,
    timeCommitment: 4,
    image: "media_communication.png"
  },
  {
    name: "Tiger Magazine",
    email: "tigermag@princeton.edu",
    description: "Princeton's lifestyle and culture magazine covering student life, fashion, arts, and campus trends.",
    category: "Media & Communication",
    selective: false,
    membershipDues: 0,
    timeCommitment: 4,
    image: "media_communication.png"
  },

  // Performance & Creative Arts (14 clubs total)
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
  {
    name: "The Princeton Nassoons",
    email: "nassoons@princeton.edu",
    description: "Princeton's oldest a cappella group, founded in 1941. All-male group performing pop, rock, and classic arrangements.",
    category: "Performance & Creative Arts",
    selective: true,
    membershipDues: 150,
    timeCommitment: 7,
    image: "performance_arts.jpg"
  },
  {
    name: "The Princeton Tigertones",
    email: "tigertones@princeton.edu",
    description: "All-male a cappella group known for energetic performances of contemporary pop and rock music.",
    category: "Performance & Creative Arts",
    selective: true,
    membershipDues: 120,
    timeCommitment: 7,
    image: "performance_arts.jpg"
  },
  {
    name: "Tigerlilies",
    email: "tigerlilies@princeton.edu",
    description: "All-female a cappella group performing contemporary pop hits with tight harmonies and choreography.",
    category: "Performance & Creative Arts",
    selective: true,
    membershipDues: 110,
    timeCommitment: 7,
    image: "performance_arts.jpg"
  },
  {
    name: "The Princeton Tigressions",
    email: "tigressions@princeton.edu",
    description: "Premier all-femme contemporary a cappella group with a bold sound, founded in 1981.",
    category: "Performance & Creative Arts",
    selective: true,
    membershipDues: 115,
    timeCommitment: 7,
    image: "performance_arts.jpg"
  },
  {
    name: "Katzenjammers",
    email: "katz@princeton.edu",
    description: "Oldest coed a cappella group at Princeton, performing diverse musical styles from pop to jazz.",
    category: "Performance & Creative Arts",
    selective: true,
    membershipDues: 100,
    timeCommitment: 6,
    image: "performance_arts.jpg"
  },
  {
    name: "Princeton Bhangra",
    email: "bhangra@princeton.edu",
    description: "High-energy South Asian dance team performing traditional and modern bhangra at competitions and showcases.",
    category: "Performance & Creative Arts",
    selective: false,
    membershipDues: 80,
    timeCommitment: 8,
    image: "performance_arts.jpg"
  },
  {
    name: "diSiac Dance Company",
    email: "disiac@princeton.edu",
    description: "Student-run contemporary dance company featuring original choreography and diverse dance styles.",
    category: "Performance & Creative Arts",
    selective: true,
    membershipDues: 60,
    timeCommitment: 9,
    image: "performance_arts.jpg"
  },
  {
    name: "BodyHype",
    email: "bodyhype@princeton.edu",
    description: "Hip-hop dance troupe performing at showcases and competitions with high-energy choreography.",
    category: "Performance & Creative Arts",
    selective: true,
    membershipDues: 50,
    timeCommitment: 8,
    image: "performance_arts.jpg"
  },
  {
    name: "Theatre Intime",
    email: "intime@princeton.edu",
    description: "Student theatre organization producing experimental and contemporary works in an intimate black box setting.",
    category: "Performance & Creative Arts",
    selective: false,
    membershipDues: 0,
    timeCommitment: 9,
    image: "performance_arts.jpg"
  },
  {
    name: "Princeton Ballet",
    email: "ballet@princeton.edu",
    description: "Classical ballet company performing full-length productions and contemporary works. Open to all levels.",
    category: "Performance & Creative Arts",
    selective: false,
    membershipDues: 90,
    timeCommitment: 7,
    image: "performance_arts.jpg"
  },

  // Outdoor & Recreation (4 clubs total)
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
  {
    name: "Princeton Sport Fishing Club",
    email: "fishing@princeton.edu",
    description: "Organize fishing trips to local lakes and ocean destinations. Learn different fishing techniques and conservation practices.",
    category: "Outdoor & Recreation",
    selective: false,
    membershipDues: 40,
    timeCommitment: 2,
    image: "outdoor_recreation.jpg"
  },
  {
    name: "Princeton Barn Dancing",
    email: "barndancing@princeton.edu",
    description: "Traditional American square dancing and contra dancing. Fun social dancing with live music and no experience necessary.",
    category: "Outdoor & Recreation",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "outdoor_recreation.jpg"
  },

  // Service Learning & Community Engagement (8 clubs total)
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
    timeCommitment: 5,
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
  {
    name: "Operation Smile at Princeton",
    email: "opsmile@princeton.edu",
    description: "Fundraising and awareness for Operation Smile's mission to provide free surgeries for children with cleft conditions worldwide.",
    category: "Service Learning & Community Engagement",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "service_community.jpg"
  },
  {
    name: "MedLife Princeton",
    email: "medlife@princeton.edu",
    description: "Organize medical service trips to underserved communities in Latin America and fundraise for mobile clinics and health education.",
    category: "Service Learning & Community Engagement",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "service_community.jpg"
  },
  {
    name: "Common Cents",
    email: "commoncents@princeton.edu",
    description: "Financial literacy tutoring program teaching personal finance skills to local middle and high school students.",
    category: "Service Learning & Community Engagement",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "service_community.jpg"
  },

  // Advocacy/Social Justice (6 clubs total)
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
  {
    name: "Princeton Students for Reproductive Justice",
    email: "reprojustice@princeton.edu",
    description: "Advocate for reproductive rights and health access through education, activism, and supporting reproductive healthcare access.",
    category: "Advocacy/Social Justice",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "advocacy_socialjustice.jpg"
  },
  {
    name: "Princeton Against Gun Violence",
    email: "gunviolence@princeton.edu",
    description: "Advocacy group working to reduce gun violence through education, community outreach, and policy advocacy.",
    category: "Advocacy/Social Justice",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "advocacy_socialjustice.jpg"
  },
  {
    name: "Sunrise Princeton",
    email: "sunrise@princeton.edu",
    description: "Youth climate movement building political power for climate action and Green New Deal policies.",
    category: "Advocacy/Social Justice",
    selective: false,
    membershipDues: 0,
    timeCommitment: 4,
    image: "advocacy_socialjustice.jpg"
  },
  {
    name: "Princeton for North Korean Human Rights",
    email: "pnkhr@princeton.edu",
    description: "Raise awareness about human rights issues in North Korea and advocate for policy changes and humanitarian aid.",
    category: "Advocacy/Social Justice",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "advocacy_socialjustice.jpg"
  },

  // Research & Innovation (6 clubs total)
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
  {
    name: "Princeton AI Alignment",
    email: "aialignment@princeton.edu",
    description: "Research group focused on AI safety and alignment, ensuring artificial intelligence systems are beneficial and aligned with human values.",
    category: "Research & Innovation",
    selective: false,
    membershipDues: 0,
    timeCommitment: 4,
    image: "research_innovation.jpg"
  },
  {
    name: "Princeton Biotechnology Group",
    email: "biotech@princeton.edu",
    description: "Explore cutting-edge biotechnology through seminars, lab visits, and discussions of synthetic biology, gene editing, and bioengineering.",
    category: "Research & Innovation",
    selective: false,
    membershipDues: 20,
    timeCommitment: 3,
    image: "research_innovation.jpg"
  },
  {
    name: "Princeton NeuroTech",
    email: "neurotech@princeton.edu",
    description: "Develop brain-computer interfaces and explore neurotechnology applications through hands-on projects and research.",
    category: "Research & Innovation",
    selective: false,
    membershipDues: 30,
    timeCommitment: 5,
    image: "research_innovation.jpg"
  },
  {
    name: "Princeton Rover Team",
    email: "rover@princeton.edu",
    description: "Design and build Mars rovers for competition in the University Rover Challenge. Multidisciplinary team working on robotics and aerospace.",
    category: "Research & Innovation",
    selective: false,
    membershipDues: 50,
    timeCommitment: 8,
    image: "research_innovation.jpg"
  },

  // Governance/Leadership (4 clubs total)
  {
    name: "American Whig-Cliosophic Society",
    email: "whigclio@princeton.edu",
    description: "Nation's oldest college political, literary, and debating society. Host debates, lectures, and discussions on contemporary issues since 1769.",
    category: "Governance/Leadership",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "governance.jpg"
  },
  {
    name: "Undergraduate Student Government",
    email: "usg@princeton.edu",
    description: "Primary representative body for Princeton undergraduates, working with administration on policy, organizing events, and funding student organizations.",
    category: "Governance/Leadership",
    selective: true,
    membershipDues: 0,
    timeCommitment: 7,
    image: "governance.jpg"
  },
  {
    name: "Model Congress, Princeton",
    email: "modelcongress@princeton.edu",
    description: "Simulate the legislative process through mock congressional sessions, developing skills in debate, legislation, and parliamentary procedure.",
    category: "Governance/Leadership",
    selective: false,
    membershipDues: 30,
    timeCommitment: 3,
    image: "governance.jpg"
  },
  {
    name: "Princeton Collegiate Moot Court",
    email: "mootcourt@princeton.edu",
    description: "Compete in intercollegiate moot court competitions, arguing appellate cases and developing oral advocacy and legal research skills.",
    category: "Governance/Leadership",
    selective: false,
    membershipDues: 50,
    timeCommitment: 6,
    image: "governance.jpg"
  },

  // Special Interest/Hobby (12 clubs total)
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
  {
    name: "Princeton Baking Club",
    email: "baking@princeton.edu",
    description: "Learn baking techniques and share sweet creations. Weekly baking sessions featuring cakes, cookies, bread, and pastries.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 25,
    timeCommitment: 2,
    image: "interest_hobby.jpg"
  },
  {
    name: "Institute for Chocolate Studies",
    email: "chocolate@princeton.edu",
    description: "Explore the art and science of chocolate through tastings, chocolate-making workshops, and discussions of cacao history and production.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 30,
    timeCommitment: 1,
    image: "interest_hobby.jpg"
  },
  {
    name: "Princeton D&D Club",
    email: "dnd@princeton.edu",
    description: "Play Dungeons & Dragons campaigns and one-shots. Welcoming to new players and experienced dungeon masters alike.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "interest_hobby.jpg"
  },
  {
    name: "Magic: The Gathering",
    email: "mtg@princeton.edu",
    description: "Play Magic: The Gathering in various formats including draft, standard, and commander. Host tournaments and casual play sessions.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "interest_hobby.jpg"
  },
  {
    name: "Princeton Mahjong Club",
    email: "mahjong@princeton.edu",
    description: "Learn and play Mahjong, the classic Chinese tile game. Teach different regional variations and host tournaments.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "interest_hobby.jpg"
  },
  {
    name: "Princeton Cigar Society",
    email: "cigars@princeton.edu",
    description: "Appreciate fine cigars and discuss history, production, and culture. Social gatherings for cigar enthusiasts.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 40,
    timeCommitment: 1,
    image: "interest_hobby.jpg"
  },
  {
    name: "Princeton Star Wars Club",
    email: "starwars@princeton.edu",
    description: "Celebrate Star Wars through movie marathons, trivia nights, discussions of lore, and cosplay events.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "interest_hobby.jpg"
  },
  {
    name: "Lego Club",
    email: "lego@princeton.edu",
    description: "Build creative Lego projects and participate in building challenges. Large collection of Lego bricks available for members.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 20,
    timeCommitment: 2,
    image: "interest_hobby.jpg"
  },
  {
    name: "Princeton Poker Club",
    email: "poker@princeton.edu",
    description: "Learn poker strategy and play in friendly tournaments. All skill levels welcome for Texas Hold'em and other poker variants.",
    category: "Special Interest/Hobby",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "interest_hobby.jpg"
  },

  // Athletic (8 clubs total)
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
  {
    name: "Princeton Boxing Club",
    email: "boxing@princeton.edu",
    description: "Learn boxing technique, footwork, and conditioning. Beginner-friendly with experienced coaches and sparring opportunities.",
    category: "Athletic",
    selective: false,
    membershipDues: 60,
    timeCommitment: 5,
    image: "athletics.jpg"
  },
  {
    name: "Princeton Muay Thai-gers",
    email: "muaythai@princeton.edu",
    description: "Train in Muay Thai kickboxing with certified instructors. Great workout combining technique, strength, and conditioning.",
    category: "Athletic",
    selective: false,
    membershipDues: 70,
    timeCommitment: 4,
    image: "athletics.jpg"
  },
  {
    name: "Aikido Club",
    email: "aikido@princeton.edu",
    description: "Learn Japanese martial art of Aikido focused on harmony, self-defense, and personal development. All levels welcome.",
    category: "Athletic",
    selective: false,
    membershipDues: 40,
    timeCommitment: 3,
    image: "athletics.jpg"
  },
  {
    name: "Princeton Pickleball Club",
    email: "pickleball@princeton.edu",
    description: "Fast-growing racquet sport combining elements of tennis, badminton, and ping pong. Fun, social, and easy to learn.",
    category: "Athletic",
    selective: false,
    membershipDues: 20,
    timeCommitment: 2,
    image: "athletics.jpg"
  },
  {
    name: "Princeton Fitness Club",
    email: "fitness@princeton.edu",
    description: "Group fitness classes including HIIT, yoga, strength training, and cardio. Supportive community for all fitness levels.",
    category: "Athletic",
    selective: false,
    membershipDues: 30,
    timeCommitment: 3,
    image: "athletics.jpg"
  },

  // Cultural/Religious (10 clubs total)
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
  {
    name: "Black Student Union",
    email: "bsu@princeton.edu",
    description: "Advocate for Black students, celebrate Black culture, and create community through social events, discussions, and activism.",
    category: "Cultural/Religious",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "cultural_religious.jpg"
  },
  {
    name: "Chinese Students Association",
    email: "csa@princeton.edu",
    description: "Promote Chinese culture through events, performances, language exchange, and community building for Chinese and Chinese-American students.",
    category: "Cultural/Religious",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "cultural_religious.jpg"
  },
  {
    name: "Korean Students Association",
    email: "ksa@princeton.edu",
    description: "Share Korean culture through K-pop dance, Korean food events, cultural celebrations, and building community among Korean students.",
    category: "Cultural/Religious",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "cultural_religious.jpg"
  },
  {
    name: "Latine Students Association",
    email: "lsa@princeton.edu",
    description: "Celebrate Latine heritage through cultural events, advocacy, mentorship, and community building. Host Latinx Heritage Month events.",
    category: "Cultural/Religious",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "cultural_religious.jpg"
  },
  {
    name: "African Students Association",
    email: "pasa@princeton.edu",
    description: "Showcase African culture through performances, discussions, food events, and creating community for students of African descent.",
    category: "Cultural/Religious",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "cultural_religious.jpg"
  },
  {
    name: "MASJID (Muslim Advocates for Social Justice)",
    email: "masjid@princeton.edu",
    description: "Muslim student organization providing prayer space, community events, interfaith dialogue, and social justice advocacy.",
    category: "Cultural/Religious",
    selective: false,
    membershipDues: 0,
    timeCommitment: 2,
    image: "cultural_religious.jpg"
  },
  {
    name: "Pride Alliance",
    email: "pride@princeton.edu",
    description: "Support LGBTQ+ students through social events, advocacy, education, and creating a welcoming and inclusive campus community.",
    category: "Cultural/Religious",
    selective: false,
    membershipDues: 0,
    timeCommitment: 3,
    image: "cultural_religious.jpg"
  },

  // Business & International Affairs (6 clubs total)
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
  {
    name: "International Relations Council",
    email: "irc@princeton.edu",
    description: "Host conferences and discussions on international affairs, foreign policy, and global issues. Organize Princeton's Model UN conference.",
    category: "Business & International Affairs",
    selective: false,
    membershipDues: 40,
    timeCommitment: 4,
    image: "business.jpg"
  },
  {
    name: "Princeton Investment Company",
    email: "pic@princeton.edu",
    description: "Student-run investment fund managing a real portfolio. Learn equity research, portfolio management, and investment analysis.",
    category: "Business & International Affairs",
    selective: true,
    membershipDues: 0,
    timeCommitment: 7,
    image: "business.jpg"
  },
  {
    name: "Alexander Hamilton Society",
    email: "ahs@princeton.edu",
    description: "Debate club focused on American foreign policy and national security. Host speakers and facilitate informed debate on policy issues.",
    category: "Business & International Affairs",
    selective: false,
    membershipDues: 20,
    timeCommitment: 2,
    image: "business.jpg"
  },

  // Eating Clubs (9 clubs total)
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
  },
  {
    name: "Ivy Club",
    email: "ivy@princeton.edu",
    description: "First eating club at Princeton, founded in 1879. Selective bicker club known for its historic building and distinguished alumni.",
    category: "Eating Club",
    selective: true,
    membershipDues: 9200,
    timeCommitment: 2,
    image: "eating_club.jpg"
  },
  {
    name: "Cottage Club",
    email: "cottage@princeton.edu",
    description: "Bicker eating club with beautiful Tudor-style building and motto 'Where there are friends there are riches.'",
    category: "Eating Club",
    selective: true,
    membershipDues: 9100,
    timeCommitment: 2,
    image: "eating_club.jpg"
  },
  {
    name: "Cap and Gown Club",
    email: "capandgown@princeton.edu",
    description: "Bicker eating club founded in 1891, known for its elegant Georgian-style building and vibrant social atmosphere.",
    category: "Eating Club",
    selective: true,
    membershipDues: 9050,
    timeCommitment: 2,
    image: "eating_club.jpg"
  },
  {
    name: "Terrace Club",
    email: "terrace@princeton.edu",
    description: "Sign-in eating club known for its alternative culture, live music, and inclusive community. Home to many performing arts events.",
    category: "Eating Club",
    selective: false,
    membershipDues: 8400,
    timeCommitment: 2,
    image: "eating_club.jpg"
  },
  {
    name: "Cloister Inn",
    email: "cloister@princeton.edu",
    description: "Sign-in eating club with Gothic architecture and warm community atmosphere. Known for themed dinners and social events.",
    category: "Eating Club",
    selective: false,
    membershipDues: 8450,
    timeCommitment: 2,
    image: "eating_club.jpg"
  },
  {
    name: "Quadrangle Club",
    email: "quad@princeton.edu",
    description: "Sign-in eating club known for diversity, technology, and hosting major USG concerts. Called 'Quad' or 'Drangle' by members.",
    category: "Eating Club",
    selective: false,
    membershipDues: 8550,
    timeCommitment: 2,
    image: "eating_club.jpg"
  },
  {
    name: "Colonial Club",
    email: "colonial@princeton.edu",
    description: "Sign-in eating club with Colonial Revival architecture. Welcoming atmosphere with strong sense of community among members.",
    category: "Eating Club",
    selective: false,
    membershipDues: 8480,
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