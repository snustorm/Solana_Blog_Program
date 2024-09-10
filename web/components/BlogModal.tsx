import { title } from 'process';
import React, {useState} from 'react';
import Select from "react-select";
import ReactCountryFlag from 'react-country-flag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';
import { pinFileToIPFS } from './UploadImageToPinata';

const countryOptions = [

        { value: "USA", label: "United States", countryCode: "US" },
        { value: "CAN", label: "Canada", countryCode: "CA" },
        { value: "GBR", label: "United Kingdom", countryCode: "GB" },
        { value: "IND", label: "India", countryCode: "IN" },
        { value: "CHN", label: "China", countryCode: "CN" },
        { value: "AUS", label: "Australia", countryCode: "AU" },
        { value: "BRA", label: "Brazil", countryCode: "BR" },
        { value: "DEU", label: "Germany", countryCode: "DE" },
        { value: "FRA", label: "France", countryCode: "FR" },
        { value: "ITA", label: "Italy", countryCode: "IT" },
        { value: "JPN", label: "Japan", countryCode: "JP" },
        { value: "MEX", label: "Mexico", countryCode: "MX" },
        { value: "RUS", label: "Russia", countryCode: "RU" },
        { value: "ZAF", label: "South Africa", countryCode: "ZA" },
        { value: "ESP", label: "Spain", countryCode: "ES" },
    ];
    



interface BlogModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BlogModal({ isOpen, onClose} : BlogModalProps) {

    console.log("Blog Modal Called");
    console.log(isOpen);

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState(null);
    const [blogText, setBlogText] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [notification, setNotification] = useState(false);
    const [isClosing, setIsClosing] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (image) {
            console.log("Image detected");
            const response = await pinFileToIPFS(image);
            if(response?.IpfsHash) {
                setImageUrl(`https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`);
            } else {
                return null;
            }  
        } 
        console.log("Title: ", title);
        console.log("Location: ", location);
        console.log("Blog Text: ", blogText);
        console.log("Image URL: ", imageUrl); 
        
        //Show the notification
        setNotification(true);

        // Keep the notification visible for 3 seconds
        setTimeout(() => {
            setNotification(false);
        }, 3000);

        handleModalClose();
    }

    const handleModalClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 500);
    }

    //Custom function to render each option with a flag
    const formatOptionLabel = ({ label, countryCode }: { label: string, countryCode: string }) => (
        <div className="flex items-center">
            <ReactCountryFlag countryCode={countryCode} svg style={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }} />
            <span>{label}</span>
        </div>
    );

    return(
        <>
            {isOpen && (
                <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 
                        ${isClosing ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 ease-in-out`}>
                    <div className="relative bg-white rounded-lg shadow-lg p-6  max-w-lg w-full h-[70vh] overflow-auto">

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            {/* Use FontAwesomeIcon component for the "X" icon */}
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </button>

                        <h2 className="Text-2xl font-bold mb-4">Write a Blog</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    className="input_bar"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="location" className="block font-medium text-gray-700">
                                    Location
                                </label>
                                <Select
                                    id="location"
                                    options={countryOptions}
                                    onChange={(selectedOption) => setLocation(selectedOption)}
                                    className='mt-1 text-sm'
                                    classNamePrefix="select"
                                    formatOptionLabel={formatOptionLabel}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="blogText" className="block font-medium text-gray-700">
                                    Blog Text
                                </label>
                                <textarea id="blogText" 
                                            rows={5}
                                            className="input_bar"
                                            value={blogText}
                                            onChange={(e) => setBlogText(e.target.value)}>
                                            required
                                </textarea>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="image" className="block font-medium text-gray-700">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    id = "image"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setImage(file); // Set the image state when file is selected
                                        }
                                    }}
                                    required
                                />

                            </div>


                            <div className="flex justify-end">
                                <button type="submit" className="submit_button">
                                    <img
                                        src="/solanaLogoMark.png"
                                        alt="Solana Logo"
                                        className="w-4 h-4 mr-2"
                                    />
                                    Post on Solana
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {notification && (
                <div className="fixed top-4 right-4 bg-gray-200 text-gray-900 py-4 px-6 rounded-lg shadow-lg flex items-center space-x-3 w-72 ">
                    <div>
                        Blog created successfully!
                    </div>
                    <FontAwesomeIcon icon={faPagelines} size="lg" className="text-green-800" />
                </div>
            )}
         
                
            
        </>
    );
}
