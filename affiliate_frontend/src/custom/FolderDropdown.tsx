import React, { useState, useMemo, useRef, useEffect } from "react";

interface Folder {
  folderName: string;
}

interface FolderDropdownProps {
  folders: Folder[];
  loading: boolean;
}

const FolderDropdown: React.FC<FolderDropdownProps> = ({ folders, loading }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Memoize filtered folders
  const filteredFolders = useMemo(() => {
    return folders.filter((folder) =>
      folder.folderName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [folders, searchTerm]);

  const handleFolderSelect = (folderName: string) => {
    setSelectedFolder(folderName);
    setSearchTerm(folderName); // Update search term with selected folder
    setDropdownOpen(false); // Close dropdown after selection
  };

   // Close dropdown when clicking outside
   useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input for search and display */}
      <input
        type="text"
        placeholder={"Search Folder"}
        className="w-full px-2 py-1 border border-[#EAF096] focus:outline-zinc-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => setDropdownOpen(!isDropdownOpen)} // Open dropdown on click
        // disabled={loading}
      />

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <ul className="absolute z-10 w-full max-h-40 overflow-y-auto border border-[#EAF096] bg-white shadow-md">
          {filteredFolders.length > 0 ? (
            filteredFolders.map((folder, idx) => (
              <li
                key={idx}
                className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                onClick={() => handleFolderSelect(folder.folderName)}
              >
                {folder.folderName}
              </li>
            ))
          ) : (
            <li className="px-2 py-1 text-gray-500">No folders found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default FolderDropdown;