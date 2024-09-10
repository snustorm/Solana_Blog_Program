import React from 'react';
import Image from "next/image";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import BlogDetailModal from './BlogDetailModal';



export default function BlogCard({blog}) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowMore = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }


    return (

        <>
            <div className="bg-white rounded overflow-hidden shadow-md p-4 max-w-sm mx-auto">
                {/*Blog Image*/}
                <div className="relative w-full h-64">
                    <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t"
                    />
                </div>

                {/*Blog Content */}
                <div className="p-4">
                    {/*Blog Title */}
                    <h3 className="font-bold text-xl mb-2">{blog.title}</h3>

                    {/*Blog Title */}
                    <div className="text-gray-600 text-sm mb-4">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-1 text-gray-400" />
                        {blog.location}
                        </div>

                    {/*Blog Context */}
                    <p className="text-gray-700 text-base">
                        {blog.content.slice(0,70)}...
                    </p>

                    {/*Show More Button */}
                    <button 
                        onClick={handleShowMore}
                        className="text-blue-500 hover:text-blue-700 text-sm"    
                    >
                        show more
                    </button>
                </div>
            </div>

            {/*Blog Detail Modal*/}
            <BlogDetailModal isOpen={isModalOpen} onClose={handleCloseModal} blog={blog}></BlogDetailModal>
        </>
    );
}