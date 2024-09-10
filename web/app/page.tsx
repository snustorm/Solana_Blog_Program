"use client";

import Image from "next/image";
import { WalletButton } from "@/components/AppWalletProvider";
import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import BlogModal from "@/components/BlogModal";
import BlogCard from "@/components/BlogCard";



export default function Home() {

  const { connected } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const blogs = [
    {
      id: 1,
      title: "Exploring the Solana Blockchain",
      location: "United State",
      content: "Discover the latest trends and developments in the Solana ecosystem",
      imageUrl: "/country/california.png", // Update with your image path
    },
    {
      id: 2,
      title: "A Guide to Decentralized Blogging",
      location: "Norway",
      content: "Learn how to create and manage a decentralized blog using Solana",
      imageUrl: "/country/norway.png", // Update with your image path
    },
    // Add more blog objects here...
  ];

  return (
    <main className="flex flex-col items-center justify-start min-h-screen">
      {/* Background Section */}

      

      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/pexels-jeswin.jpg')" }}
      >
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-4 bg-white/20 z-20">
          <h1 className="text-white text-lg">Solana Blog</h1>
          {/* Additional nav items can go here if needed */}
        </nav>

        <div className="bg-white/50 backdrop-blur-md py-16 px-24 rounded-lg max-w-4xl mx-4 text-white text-center">
          <div className="mb-8 text-lg">Presented by Oliver Spencer</div>
          <h1 className="text-6xl font-bold mb-8 leading-tight">
            Welcome To Awer Solana Blog.
          </h1>
          <div className="w-4/5 mx-auto">
            <p className="text-lg mb-10 leading-relaxed">
              A decentralized blogging platform powered by Solana. Share your thoughts with the world securely and effortlessly. Connect your wallet to get started.
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <WalletButton
              style={{
                backgroundColor: "#e5e7eb", // bg-gray-200
                color: "#000000", // text-gray-800
                fontWeight: "normal",
                padding: "0.5rem 2.5rem", // py-2 px-6
                borderRadius: "30px", // rounded-full
                letterSpacing: "0.05em", // Adjust letter spacing
                transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
              }}
            />
            {connected && (
              <button
                className="bg-gray-200 text-gray-800 font-normal py-2 px-12 rounded-full transition duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onClick={handleOpenModal}
              >
                Write a Blog
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Blog Cards Section */}
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-8">
        <h2 className="text-3xl font-bold mb-8">All Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            
            {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                    <BlogCard blog={blog}/>
                ))
            ) : (
                <p>No Blogs Found</p>
            )}
        </div>
      </div>


      {/* Blog Modal */}
      <BlogModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}