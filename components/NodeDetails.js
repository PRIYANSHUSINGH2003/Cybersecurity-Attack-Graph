import React, { useState } from 'react';
import { FaTimes, FaInfoCircle } from 'react-icons/fa'; // Importing React Icons for better UI

const NodeDetails = () => {
    const [showDetails, setShowDetails] = useState(false);

    const handleClose = () => setShowDetails(false);
    const handleOpen = () => setShowDetails(true);

    return (
        <div className="relative">
            {/* Button to open details with animation */}
            <button
                onClick={handleOpen}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2"
            >
                <FaInfoCircle className="text-lg" />
                <span>Show Node Details</span>
            </button>

            {/* Modal Popup for Node Details */}
            {showDetails && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 transition-all duration-300">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-full transform scale-100 hover:scale-105 transition-all duration-300 ease-in-out">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Node Details</h2>
                            <button
                                onClick={handleClose}
                                className="text-gray-500 hover:text-red-600 p-2 rounded-full transition-all duration-300"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">Detailed information about the selected node will be displayed here. You can add more data as needed.</p>
                        <button
                            onClick={handleClose}
                            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NodeDetails;
