import { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import { FaCog, FaSignal } from 'react-icons/fa'; // Importing React Icons

export default function Home() {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setGraphData(newData);
    };

    socket.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-800 via-purple-800 to-blue-800 text-white flex flex-col">
      {/* Header Section */}
      <header className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg">
        <h1 className="text-4xl font-bold tracking-wide text-yellow-400">Cybersecurity Attack Graph</h1>
        <div className="flex space-x-4 text-lg">
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <FaCog />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <FaSignal />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        <div className="bg-gray-900 p-6 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4">Real-time Graph Visualization</h2>
          <p className="text-lg text-gray-300 mb-4">Monitoring the latest attack patterns in the network.</p>
          
          {graphData ? (
            <Graph data={graphData} />
          ) : (
            <div className="flex justify-center items-center space-x-2">
              <span className="text-white">Loading graph...</span>
              <div className="w-4 h-4 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-center py-4">
        <p className="text-sm text-gray-400">© 2025 Cybersecurity Attack Graph. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
