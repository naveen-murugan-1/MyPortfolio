const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const About = require('./models/About');
const Skill = require('./models/Skill');
const Education = require('./models/Education');
const Achievement = require('./models/Achievement');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected for Seeding');
        seedData();
    })
    .catch(err => console.error(err));

const seedData = async () => {
    try {
        // Clear existing data
        await Project.deleteMany({});
        await Experience.deleteMany({});
        await About.deleteMany({});
        await Skill.deleteMany({});
        await Education.deleteMany({});
        await Achievement.deleteMany({});

        // Projects
        const projects = [
            // ECE Projects
            {
                title: "IoT Based Weather Monitoring System",
                category: "RF_SYSTEMS",
                description: "Developed a smart weather station using ESP8266 Wi-Fi module and DHT11 sensors to log real-time temperature and humidity data to a cloud dashboard.",
                techStack: ["Embedded C", "IoT", "ESP8266", "MQTT", "Cloud Analytics"],
                specs: { latency: "45ms", power: "350mW", frequency: "2.4GHz", voltage: "3.3V" },
                date: "Oct '25",
                image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=1000",
                link: "https://github.com/Praveen1708/IoT-Weather",
                repo: "https://github.com/Praveen1708/IoT-Weather"
            },
            {
                title: "FPGA Traffic Light Controller",
                category: "EMBEDDED_LOGIC",
                description: "Designed and simulated a digital traffic light control system on a Xilinx FPGA board using Verilog HDL.",
                techStack: ["Verilog", "Xilinx Vivado", "FPGA", "Digital Design"],
                specs: { latency: "12ns", power: "1.2W", frequency: "100MHz", voltage: "1.8V" },
                date: "Sept '25",
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1000",
                link: "https://github.com/Praveen1708/FPGA-Traffic",
                repo: "https://github.com/Praveen1708/FPGA-Traffic"
            },
            {
                title: "DSP Audio Equalizer",
                category: "SIGNAL_PROCESSING",
                description: "Implemented digital filters (FIR/IIR) using MATLAB to process and equalize real-time audio signals, isolating noise frequencies.",
                techStack: ["MATLAB", "Signal Processing", "Simulink"],
                specs: { latency: "8ms", power: "50mW", frequency: "44.1kHz", voltage: "N/A" },
                date: "Sept '25",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
                link: "https://github.com/Praveen1708/DSP-Equalizer",
                repo: "https://github.com/Praveen1708/DSP-Equalizer"
            },
            {
                title: "Automated Robot Arm",
                category: "EMBEDDED_LOGIC",
                description: "Programmed a 4-degree-of-freedom robotic arm powered by an Arduino Mega and servo motors for automated pick-and-place tasks.",
                techStack: ["Arduino", "PWM Control", "Sensors", "C++"],
                specs: { latency: "250ms", power: "12W", frequency: "16MHz", voltage: "12V" },
                date: "July '25 - Present",
                image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000",
                link: "https://github.com/Praveen1708/Robo-Arm",
                repo: "https://github.com/Praveen1708/Robo-Arm"
            }
        ];
        await Project.insertMany(projects);

        // Experience
        const experiences = [
            {
                role: "MERN Stack Developer Intern",
                company: "Let’s Gam Tech",
                location: "Coimbatore",
                duration: "June '25 – July '25",
                description: [
                    "Developed a fully responsive weather app using React and styled with Tailwind CSS.",
                    "Integrated OpenWeatherMap API to fetch and display real-time weather data.",
                    "Implemented error handling, dynamic UI updates, and clean component structure."
                ],
                type: "Internship"
            }
        ];
        await Experience.insertMany(experiences);

        // Education
        const education = [
            {
                institution: "Karpagam College of Engineering",
                degree: "BE in Electronics and Communication Engineering",
                duration: "Aug '23 - Current",
                gpa: "8.0/10.0",
                courses: ["Computer Architecture", "Database Management System", "Data Structures and Algorithm", "Operating System"]
            }
        ];
        await Education.insertMany(education);

        // Skills
        const skills = [
            { category: "Hardware", items: ["Verilog", "VHDL", "Microcontrollers (8051/ARM)", "FPGA", "PCB Design"] },
            { category: "Languages", items: ["Embedded C", "C++", "Python", "MATLAB", "Assembly"] },
            { category: "Tools", items: ["Keil μVision", "Xilinx Vivado", "Proteus", "Arduino IDE", "LTSpice"] },
            { category: "Domains", items: ["VLSI Design", "Digital Signal Processing", "IoT Systems", "Control Systems"] }
        ];
        await Skill.insertMany(skills);

        // Achievements
        const achievements = [
            { title: "Head of Software Development Club", description: "Serving as Head at Karpagam College of Engineering", date: "Present" },
            { title: "SIH 2025 External Round", description: "Selected for Civic Issue Reporting System", date: "Sep '25" },
            { title: "LeetCode Solver", description: "Solved 430+ problems", date: "Sep '25" },
            { title: "Introduction to Pandas Badge", description: "Earned from LeetCode", date: "Oct '24" }
        ];
        await Achievement.insertMany(achievements);

        // Certificates
        const Certificate = require('./models/Certificate');
        await Certificate.deleteMany({});
        const certifications = [
            {
                title: "Soft Skill Development",
                platform: "NPTEL",
                category: "Soft Skills",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "The Joy of Computing using Python",
                platform: "NPTEL",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Frontend Development - HTML",
                platform: "Great Learning",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Frontend Development - CSS",
                platform: "Great Learning",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Artificial Intelligence",
                platform: "Infosys SpringBoard",
                category: "Technical",
                pdfLink: "https://www.dropbox.com/scl/fi/xivy3o0gqo62vzi98dug2/Artificial-Intelligence.pdf?rlkey=cd881thd9nomakkx7blnqfbmb&st=wcq3qcm5&dl=0",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Email Writing Skills",
                platform: "Infosys SpringBoard",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Generative AI Unleashing",
                platform: "Infosys SpringBoard",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "High Impact Presentations",
                platform: "Infosys SpringBoard",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Introduction to Artificial Intelligence",
                platform: "Infosys SpringBoard",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Introduction to Data Science",
                platform: "Infosys SpringBoard",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Introduction to Deep Learning",
                platform: "Infosys SpringBoard",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1639322537228-ad7117a3a634?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Introduction to Natural Language Processing",
                platform: "Infosys SpringBoard",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1655720031554-a9296e47a63d?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Prompt Engineering",
                platform: "Infosys SpringBoard",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1684369166649-6f10255c279a?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Time Management",
                platform: "Infosys",
                category: "Soft Skills",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "ChatBot Creation with Generative AI",
                platform: "Udemy",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Image Processing with Python PIL",
                platform: "Udemy",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=300"
            },
            {
                title: "Python for All Data Roles in 2025",
                platform: "Udemy",
                category: "Technical",
                pdfLink: "URL_TO_PDF_3",
                image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?auto=format&fit=crop&q=80&w=300"
            }
        ];
        await Certificate.insertMany(certifications);

        // About (Profile) - Using Data Science as default for now, but adding fields to switch content if needed
        // About (Profile)
        const about = {
            name: "Naveen M",
            title: "Signal Architect & Embedded Systems Engineer",
            email: "praveen17082005@gmail.com",
            phone: "9489790927",
            location: "Thoothukudi",
            summary: "Passionate Electronics and Communication Engineering undergraduate with hands-on experience in VLSI design, Digital Signal Processing, and IoT embedded systems. Bridging the gap between hardware architecture and robust software logic.",
            socialLinks: {
                linkedin: "LinkedIn",
                github: "GitHub",
                portfolio: "My Portfolio"
            },
            identifier: "main"
        };
        await About.create(about);

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

