import React from 'react';
import { Github } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/cfields7/SpotME", label: "GitHub" },
  ];

  return (
    <footer className="bg-red-900/0 fixed bottom-5 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex space-x-6 absolute left-1 mb-10">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label={label}
          >
            <Icon className="w-20 h-8 text-gray-200 group-hover:text-black transition-colors" />
          </a>
        ))}
      </div>

        <p className="text-center text-gray-200">
          Not © {new Date().getFullYear()}. Created by Fayaz and Christopher for HackNC on November 2nd 2024.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
