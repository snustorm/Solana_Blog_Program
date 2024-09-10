import React, { useState } from "react";
import { WalletButton } from './AppWalletProvider';

const StyledWalletButton: React.FC = () =>  {

    const [isHovered, setIsHovered] = useState(false);

    const baseStyle = {
        backgroundColor: "#e5e7eb", // bg-gray-200
        color: "#000000", // text-gray-800
        fontWeight: "normal",
        padding: "0.5rem 2.5rem", // py-2 px-6
        borderRadius: "30px", // rounded-full
        letterSpacing: "0.05em", // Adjust letter spacing
        transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
      };
    
      const hoverStyle = {
        backgroundColor: "#d1d5db", // bg-gray-300
        color: "#000000", // text-gray-900
      };



  return (
    <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ ...baseStyle, ...(isHovered ? hoverStyle : {}) }}
    >
        <WalletButton />
  </div>
  );
};


export default StyledWalletButton;