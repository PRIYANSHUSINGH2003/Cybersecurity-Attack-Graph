import React, { useEffect, useState } from 'react';
import Cytoscape from 'cytoscape';
import { FaInfoCircle } from 'react-icons/fa'; // React Icons for info icon
import NodeDetails from './NodeDetails';
import 'animate.css'; // For animations

const Graph = ({ data }) => {
    const [selectedNode, setSelectedNode] = useState(null); // Store selected node for details

    useEffect(() => {
        const cy = Cytoscape({
            container: document.getElementById('cy'),
            elements: data.nodes || [],
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#3498db',
                        'label': 'data(name)',
                        'width': 40, // Smaller circle size
                        'height': 40, // Smaller circle size
                        'font-size': 5, // Smaller font size
                        'color': '#fff',
                        'text-halign': 'center',
                        'text-valign': 'center',
                        'border-width': 2,
                        'border-color': '#fff',
                        'transition-property': 'background-color, width, height, transform',
                        'transition-duration': '0.3s', // Smooth transition for animations
                        'box-shadow': '0 4px 10px rgba(0, 0, 0, 0.2)', // Added shadow for depth
                    },
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#999',
                        'target-arrow-color': '#999',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier', // Smooth edges
                        'transition-duration': '0.3s',
                    },
                },
            ],
            layout: {
                name: 'circle', // Circular layout for a modern look
                padding: 10,
            },
            userZoomingEnabled: true, // Enable zooming
            userPanningEnabled: true, // Enable panning
            zoomingEnabled: true, // Allow zoom with mouse wheel or pinch gestures
            panningEnabled: true, // Allow panning with drag
        });

        // Handle node selection
        cy.on('tap', 'node', (event) => {
            const node = event.target;
            const nodeData = node.data();
            console.log("Node clicked:", nodeData);  // Debugging to check if data is correct
            setSelectedNode(nodeData);
        });

        // Optional: You can add event listeners to handle zoom/pan changes if you want to track them
        cy.on('zoom pan', () => {
            console.log('Zoom Level:', cy.zoom());
            console.log('Pan Position:', cy.pan());
        });

        return () => {
            cy.destroy();
        };
    }, [data]);

    return (
        <div className="flex flex-col items-center w-full py-8 space-y-6 bg-gradient-to-r from-blue-800 to-blue-500 min-h-screen">
            <h2 className="text-3xl font-semibold text-white mb-8 animate__animated animate__fadeIn">Cybersecurity Attack Graph</h2>

            <div
                id="cy"
                className="w-full h-96 bg-gray-900 rounded-xl shadow-2xl transition-all duration-500 transform"
            ></div>
            
            {selectedNode && (
                <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-2xl space-y-6 animate__animated animate__fadeIn animate__delay-1s">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-semibold text-gray-800">Node Details</h3>
                        <FaInfoCircle
                            className="text-blue-500 cursor-pointer text-2xl hover:text-blue-700 transition-all duration-300"
                            onClick={() => alert('More details about the node.')}
                        />
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <p><strong className="text-gray-900">Node ID:</strong> {selectedNode.id || 'N/A'}</p>
                        <p><strong className="text-gray-900">Query:</strong> {selectedNode.query || 'N/A'}</p>
                        <p><strong className="text-gray-900">Response:</strong> {selectedNode.response || 'N/A'}</p>
                        <p><strong className="text-gray-900">Is Active:</strong> {selectedNode.is_active ? 'Yes' : 'No'}</p>
                        <p><strong className="text-gray-900">Total Tokens:</strong> {selectedNode.total_tokens || 'N/A'}</p>
                    </div>
                </div>
            )}

            <NodeDetails node={selectedNode} />
        </div>
    );
};

export default Graph;
