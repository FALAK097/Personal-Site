export const TableOfContents = ({
  sections,
  activeSection,
  scrollToSection,
}) => {
  return (
    <nav className="space-y-1">
      {sections.map((section, index) => (
        <div key={section.id} className="relative">
          {index < sections.length - 1 && (
            <div className="absolute left-2 top-8 w-px h-6 bg-border transition-colors duration-300" />
          )}

          <button
            onClick={() => scrollToSection(section.id)}
            className={`relative flex items-center w-full px-3 py-2 text-sm rounded-md cursor-pointer transition-all duration-300 ease-in-out ${
              activeSection === section.id
                ? "bg-purple-500/10 text-purple-500 font-medium border-l-2 border-purple-500"
                : "text-muted-foreground hover:text-purple-400 hover:bg-transparent hover:border-l-2 hover:border-border"
            }`}
          >
            <div
              className={`absolute left-1 w-2 h-2 rounded-full transition-all duration-300 ease-in-out ${
                activeSection === section.id
                  ? "bg-purple-500 scale-110"
                  : "bg-border scale-100"
              }`}
            />
            <span className="ml-4 transition-all duration-300">
              {section.label}
            </span>
          </button>
        </div>
      ))}
    </nav>
  );
};
