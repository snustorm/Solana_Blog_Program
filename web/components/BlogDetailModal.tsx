import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faXmark, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useWallet } from '@solana/wallet-adapter-react';

export default function BlogDetailModal({ isOpen, onClose, blog }) {
    const { publicKey } = useWallet();
    const [showSettings, setShowSettings] = useState(false);
    const dropdownRef = useRef(null);
    const modalRef = useRef(null);  // Reference for the entire modal

    const handleDeleteBlog = () => {
        console.log(`Deleting blog with ID: ${blog.id}`);
        onClose();
    };

    const handleUpdateBlog = () => {
        console.log(`Updating blog with ID: ${blog.id}`);
    };

    const handleClickOutside = (event) => {
        // Check if the click is outside the dropdown or the modal
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowSettings(false);
        }
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div ref={modalRef} className="bg-white rounded-lg overflow-hidden shadow-lg max-w-xl w-full relative h-[80vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 z-20"
                >
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                </button>

                <div className="relative w-full h-80 mb-4">
                    <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                    />

                    <div className="absolute bottom-4 right-4" ref={dropdownRef}>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="bg-black p-2 rounded-full shadow-lg hover:bg-opacity-60 transition duration-200 bg-opacity-40"
                        >
                            <FontAwesomeIcon icon={faEllipsisH} className="text-gray-200" />
                        </button>

                        {showSettings && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-30">
                                <button
                                    onClick={handleUpdateBlog}
                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={handleDeleteBlog}
                                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-6 pt-3">
                    <h3 className="text-3xl font-bold mb-2">{blog.title}</h3>
                    <p className="text-gray-700 text-base mb-3">{blog.content}</p>
                    <div className="text-gray-600 text-sm mb-4 flex items-center">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-red-500" />
                        {blog.location}
                    </div>
                </div>
            </div>
        </div>
    );
}
