import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrollToSection }) => {
  const navItems = [
    'home',
    'about',
    'education',
    'skills',
    'projects',
    'leetcode',
    'experience',
    'certifications',
    'achievements', // fixed lowercase
    'contact'
  ];

  return (
    <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/login" className="text-white font-bold text-xl cursor-pointer hover:text-violet-300 transition-colors">
              Naveen M
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`${activeSection === item
                  ? 'text-violet-400'
                  : 'text-gray-300 hover:text-violet-300'
                  } capitalize transition-colors`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-violet-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-16 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="md:hidden absolute top-16 right-0 w-[60%] h-[calc(100vh-4rem)] bg-gray-950/95 backdrop-blur-md  border-l border-gray-700 overflow-y-auto z-50">
            <div className="px-2 pt-4 pb-3 space-y-2 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`${activeSection === item
                    ? 'bg-black text-violet-400'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } block px-4 py-3 rounded-md text-base font-medium w-full text-left capitalize transition-colors`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;

