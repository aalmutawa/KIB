import React, { useState, useEffect } from 'react';
import { 
  FileText, CreditCard, Square, Building, Phone, Monitor, Settings, Home,
  Menu, Download, Edit2, Save, X, Upload, Link, Copy
} from 'lucide-react';

const CustomerJourneyDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  
  // Default data
  const defaultJourneyData = {
    totalJourneys: 224,
    smsMessages: 305,
    mobileContent: 12892,
    journeyReview: 100,
    journeyImplement: 45,
    smsMessagesProgress: 99,
    mobileAppProgress: 99
  };

  const defaultObjectives = [
    'Optimize 224 customer journeys',
    'Faster turnaround time',
    'Improved customer satisfaction',
    'Operational cost efficiency',
    'Increased digital channel adoption'
  ];

  const defaultProgressData = [
    { name: 'Total Identified Journeys', value: 224 },
    { name: 'Reviewed', value: '224 (100%)' },
    { name: 'Enhancements Implemented', value: '100 (45%)' },
    { name: 'Journeys in Progress', value: '124 (55%)' },
    { name: 'Target (Mid-Year)', value: '100% reviewed/50% enhanced' }
  ];

  const defaultChannelData = [
    { channel: 'Branches', count: 35, review: 100, implementation: 66 },
    { channel: 'Application', count: 68, review: 100, implementation: 34 },
    { channel: 'Contact center', count: 79, review: 100, implementation: 57 },
    { channel: 'ATM', count: 22, review: 100, implementation: 0 },
    { channel: 'ITM', count: 6, review: 100, implementation: 67 },
    { channel: 'DST', count: 9, review: 100, implementation: 44 },
    { channel: 'Black', count: 4, review: 100, implementation: 25 }
  ];

  const defaultJourneysData = {
    applications: [
      {
        id: 1,
        journey: "1.5 Add choice",
        comment: "Add choice functionality to application forms",
        complexity: "Simple = 1 week",
        status: "Pending"
      }
    ],
    atm: [
      {
        id: 1,
        journey: "ATM Balance Inquiry Enhancement",
        comment: "Improve balance display with additional account details",
        complexity: "Simple = 1 week",
        status: "Pending"
      }
    ],
    black: [
      {
        id: 1,
        journey: "Black Card Application",
        comment: "Streamlined application process for premium cards",
        complexity: "Moderate = 2-3 weeks",
        status: "Pending"
      }
    ],
    branch: [
      {
        id: 1,
        journey: "Appointment Booking",
        comment: "Online appointment scheduling system",
        complexity: "Moderate = 2-3 weeks",
        status: "Pending"
      }
    ],
    "contact-center": [
      {
        id: 1,
        journey: "Call Routing Optimization",
        comment: "Intelligent call routing based on customer profile",
        complexity: "Moderate = 2-3 weeks",
        status: "Pending"
      }
    ],
    dst: [
      {
        id: 1,
        journey: "Self-Service Terminal Navigation",
        comment: "Improved user interface for terminal operations",
        complexity: "Moderate = 2-3 weeks",
        status: "Pending"
      }
    ],
    itm: [
      {
        id: 1,
        journey: "Video Teller Connection",
        comment: "Enhanced video quality and connection stability",
        complexity: "Moderate = 2-3 weeks",
        status: "Pending"
      }
    ]
  };

  // State variables
  const [journeyData, setJourneyData] = useState(defaultJourneyData);
  const [objectives, setObjectives] = useState(defaultObjectives);
  const [progressData, setProgressData] = useState(defaultProgressData);
  const [channelData, setChannelData] = useState(defaultChannelData);
  const [journeysData, setJourneysData] = useState(defaultJourneysData);

  // Load data from URL on component mount
  useEffect(() => {
    loadFromURL();
  }, []);

  // Save to URL whenever data changes
  useEffect(() => {
    saveToURL();
  }, [journeyData, objectives, progressData, channelData, journeysData]);

  const encodeData = (data) => {
    try {
      return btoa(JSON.stringify(data));
    } catch (e) {
      console.error('Error encoding data:', e);
      return '';
    }
  };

  const decodeData = (encoded) => {
    try {
      return JSON.parse(atob(encoded));
    } catch (e) {
      console.error('Error decoding data:', e);
      return null;
    }
  };

  const saveToURL = () => {
    try {
      const data = {
        journeyData,
        objectives,
        progressData,
        channelData,
        journeysData
      };
      const encoded = encodeData(data);
      const url = new URL(window.location);
      url.searchParams.set('data', encoded);
      window.history.replaceState({}, '', url);
    } catch (e) {
      console.error('Error saving to URL:', e);
    }
  };

  const loadFromURL = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const encoded = urlParams.get('data');
      if (encoded) {
        const decoded = decodeData(encoded);
        if (decoded) {
          setJourneyData(decoded.journeyData || defaultJourneyData);
          setObjectives(decoded.objectives || defaultObjectives);
          setProgressData(decoded.progressData || defaultProgressData);
          setChannelData(decoded.channelData || defaultChannelData);
          setJourneysData(decoded.journeysData || defaultJourneysData);
        }
      }
    } catch (e) {
      console.error('Error loading from URL:', e);
    }
  };

  const generateShareableLink = () => {
    // Instead of sharing URL, generate a shareable data package
    const data = {
      journeyData,
      objectives,
      progressData,
      channelData,
      journeysData,
      timestamp: new Date().toISOString()
    };
    
    const shareableData = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(shareableData).then(() => {
      setShareMessage('Data copied to clipboard! Share this with others to import.');
      setTimeout(() => setShareMessage(''), 5000);
    }).catch(() => {
      setShareMessage('Unable to copy data');
      setTimeout(() => setShareMessage(''), 3000);
    });
  };

  const generateDownloadableLink = () => {
    const data = {
      journeyData,
      objectives,
      progressData,
      channelData,
      journeysData,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-share-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShareMessage('Download started! Share this file with others.');
    setTimeout(() => setShareMessage(''), 3000);
  };

  const importData = () => {
    try {
      const data = JSON.parse(importText);
      if (data.journeyData) setJourneyData(data.journeyData);
      if (data.objectives) setObjectives(data.objectives);
      if (data.progressData) setProgressData(data.progressData);
      if (data.channelData) setChannelData(data.channelData);
      if (data.journeysData) setJourneysData(data.journeysData);
      setShowImportModal(false);
      setImportText('');
      setShareMessage('Data imported successfully!');
      setTimeout(() => setShareMessage(''), 3000);
    } catch (e) {
      setShareMessage('Error importing data - please check format');
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'atm', label: 'ATM', icon: CreditCard },
    { id: 'black', label: 'Black', icon: Square },
    { id: 'branch', label: 'Branch', icon: Building },
    { id: 'contact-center', label: 'Contact Center', icon: Phone },
    { id: 'dst', label: 'DST', icon: Settings },
    { id: 'itm', label: 'ITM', icon: Monitor }
  ];

  const handleDataChange = (field, value) => {
    setJourneyData(prev => ({ ...prev, [field]: value }));
  };

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const handleProgressChange = (index, field, value) => {
    const newProgress = [...progressData];
    newProgress[index] = { ...newProgress[index], [field]: value };
    setProgressData(newProgress);
  };

  const handleChannelChange = (index, field, value) => {
    const newChannels = [...channelData];
    newChannels[index] = { ...newChannels[index], [field]: value };
    setChannelData(newChannels);
  };

  const handleJourneyChange = (channel, journeyId, field, value) => {
    setJourneysData(prev => ({
      ...prev,
      [channel]: prev[channel].map(journey => 
        journey.id === journeyId ? { ...journey, [field]: value } : journey
      )
    }));
  };

  const addNewJourney = (channel) => {
    const newJourney = {
      id: Date.now(),
      journey: "New Journey",
      comment: "Description...",
      complexity: "Simple = 1 week",
      status: "Pending"
    };
    setJourneysData(prev => ({
      ...prev,
      [channel]: [...(prev[channel] || []), newJourney]
    }));
  };

  const deleteJourney = (channel, journeyId) => {
    setJourneysData(prev => ({
      ...prev,
      [channel]: prev[channel].filter(journey => journey.id !== journeyId)
    }));
  };

  const getImplementationColor = (percentage) => {
    if (percentage >= 60) return 'bg-green-500';
    if (percentage >= 40) return 'bg-yellow-500';
    if (percentage >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity) => {
    if (complexity.includes('Simple')) return 'bg-green-100 text-green-800';
    if (complexity.includes('Moderate')) return 'bg-yellow-100 text-yellow-800';
    if (complexity.includes('Complex')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const DoughnutChart = ({ percentage, label, size = 120 }) => {
    const segments = [];
    const totalSegments = 20;
    const filledSegments = Math.round((percentage / 100) * totalSegments);
    
    for (let i = 0; i < totalSegments; i++) {
      const angle = (i * 360) / totalSegments;
      const isFilled = i < filledSegments;
      segments.push({
        angle,
        filled: isFilled
      });
    }

    const radius = size / 2 - 10;
    const innerRadius = radius - 8;

    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            {segments.map((segment, index) => {
              const startAngle = (segment.angle - 8) * (Math.PI / 180);
              const endAngle = (segment.angle + 8) * (Math.PI / 180);
              
              const x1 = size/2 + Math.cos(startAngle) * radius;
              const y1 = size/2 + Math.sin(startAngle) * radius;
              const x2 = size/2 + Math.cos(endAngle) * radius;
              const y2 = size/2 + Math.sin(endAngle) * radius;
              
              const x3 = size/2 + Math.cos(endAngle) * innerRadius;
              const y3 = size/2 + Math.sin(endAngle) * innerRadius;
              const x4 = size/2 + Math.cos(startAngle) * innerRadius;
              const y4 = size/2 + Math.sin(startAngle) * innerRadius;

              return (
                <path
                  key={index}
                  d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`}
                  fill={segment.filled ? '#4a90e2' : '#e0e0e0'}
                  stroke="white"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">
                {percentage}%
              </div>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-center text-gray-600" style={{ maxWidth: '80px' }}>
          {label}
        </p>
      </div>
    );
  };

  const EditableField = ({ value, onChange, className = '', type = 'text' }) => {
    if (!editMode) {
      return <span className={className}>{value}</span>;
    }
    return (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
        className={`${className} bg-transparent border-b border-blue-500 outline-none`}
      />
    );
  };

  const JourneyTable = ({ channel, journeys }) => {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg mt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">
            Pending Journeys - {channel.charAt(0).toUpperCase() + channel.slice(1).replace('-', ' ')}
          </h4>
          {editMode && (
            <button
              onClick={() => addNewJourney(channel)}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Add Journey
            </button>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Journey</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Comment</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Complexity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                {editMode && (
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {journeys && journeys.map((journey) => (
                <tr key={journey.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">
                    {editMode ? (
                      <textarea
                        value={journey.journey}
                        onChange={(e) => handleJourneyChange(channel, journey.id, 'journey', e.target.value)}
                        className="w-full p-2 border rounded resize-none bg-white border-gray-300"
                        rows="2"
                      />
                    ) : (
                      <span className="font-medium">{journey.journey}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {editMode ? (
                      <textarea
                        value={journey.comment}
                        onChange={(e) => handleJourneyChange(channel, journey.id, 'comment', e.target.value)}
                        className="w-full p-2 border rounded resize-none bg-white border-gray-300"
                        rows="2"
                      />
                    ) : (
                      journey.comment
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editMode ? (
                      <select
                        value={journey.complexity}
                        onChange={(e) => handleJourneyChange(channel, journey.id, 'complexity', e.target.value)}
                        className="w-full p-2 border rounded bg-white border-gray-300"
                      >
                        <option value="Simple = 1 week">Simple = 1 week</option>
                        <option value="Moderate = 2-3 weeks">Moderate = 2-3 weeks</option>
                        <option value="Complex = 4+ weeks">Complex = 4+ weeks</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(journey.complexity)}`}>
                        {journey.complexity}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editMode ? (
                      <select
                        value={journey.status}
                        onChange={(e) => handleJourneyChange(channel, journey.id, 'status', e.target.value)}
                        className="w-full p-2 border rounded bg-white border-gray-300"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(journey.status)}`}>
                        {journey.status}
                      </span>
                    )}
                  </td>
                  {editMode && (
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => deleteJourney(channel, journey.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
          {(!journeys || journeys.length === 0) && (
            <div className="text-center py-8">
              <p className="text-gray-600">
                No journeys found for this channel.
                {editMode && ' Click "Add Journey" to create one.'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderOverview = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Alternative delivery channels - Driving digital excellence
          </h2>
          
          {/* Top Section - Identified Journeys with Doughnut Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left - Identified Content */}
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Total journeys and content count across RBD
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Identified <span className="text-sm text-gray-600">Journeys and content</span>
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-gray-900 mr-2">
                    <EditableField
                      value={journeyData.totalJourneys}
                      onChange={(val) => handleDataChange('totalJourneys', val)}
                      type="number"
                    />
                  </span>
                  <span className="text-lg text-gray-600">Journeys</span>
                </div>
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-gray-900 mr-2">
                    <EditableField
                      value={journeyData.smsMessages}
                      onChange={(val) => handleDataChange('smsMessages', val)}
                      type="number"
                    />
                  </span>
                  <span className="text-lg text-gray-600">SMS messages content</span>
                </div>
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-gray-900 mr-2">
                    <EditableField
                      value={journeyData.mobileContent}
                      onChange={(val) => handleDataChange('mobileContent', val)}
                      type="number"
                    />
                  </span>
                  <span className="text-lg text-gray-600">Mobile content</span>
                </div>
              </div>
            </div>

            {/* Right - Doughnut Charts */}
            <div className="flex flex-col justify-start">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <DoughnutChart 
                  percentage={journeyData.journeyReview} 
                  label="Journey - review"
                  size={120}
                />
                <DoughnutChart 
                  percentage={journeyData.journeyImplement} 
                  label="Journey - implement"
                  size={120}
                />
                <DoughnutChart 
                  percentage={journeyData.smsMessagesProgress} 
                  label="SMS messages content"
                  size={120}
                />
                <DoughnutChart 
                  percentage={journeyData.mobileAppProgress} 
                  label="Mobile app content"
                  size={120}
                />
              </div>
              
              {editMode && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">
                    Edit Chart Values
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Journey Review %</label>
                      <input
                        type="number"
                        value={journeyData.journeyReview}
                        onChange={(e) => handleDataChange('journeyReview', parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Journey Implement %</label>
                      <input
                        type="number"
                        value={journeyData.journeyImplement}
                        onChange={(e) => handleDataChange('journeyImplement', parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">SMS Messages %</label>
                      <input
                        type="number"
                        value={journeyData.smsMessagesProgress}
                        onChange={(e) => handleDataChange('smsMessagesProgress', parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Mobile App %</label>
                      <input
                        type="number"
                        value={journeyData.mobileAppProgress}
                        onChange={(e) => handleDataChange('mobileAppProgress', parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded bg-white border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Bottom Section - Objectives and Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Objective</h3>
              <ol className="space-y-2">
                {objectives.map((objective, index) => (
                  <li key={index} className="text-gray-700">
                    {index + 1}. {editMode ? (
                      <input
                        value={objective}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                        className="bg-transparent border-b border-blue-500 outline-none w-full"
                      />
                    ) : objective}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Progress overview</h3>
              <ol className="space-y-2">
                {progressData.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {index + 1}. {editMode ? (
                      <input
                        value={item.name}
                        onChange={(e) => handleProgressChange(index, 'name', e.target.value)}
                        className="bg-transparent border-b border-blue-500 outline-none mr-2"
                      />
                    ) : item.name}: {editMode ? (
                      <input
                        value={item.value}
                        onChange={(e) => handleProgressChange(index, 'value', e.target.value)}
                        className="bg-transparent border-b border-blue-500 outline-none"
                      />
                    ) : (
                      <span className="font-semibold">{item.value}</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-6 text-gray-900">
            ... What is the channel count, status?
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 px-6 font-bold text-gray-700">Channel</th>
                  <th className="text-center py-4 px-6 font-bold text-gray-700">Count</th>
                  <th className="text-center py-4 px-6 font-bold text-gray-700">Review</th>
                  <th className="text-center py-4 px-6 font-bold text-gray-700">Implementation</th>
                </tr>
              </thead>
              <tbody>
                {channelData.map((channel, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {editMode ? (
                        <input
                          value={channel.channel}
                          onChange={(e) => handleChannelChange(index, 'channel', e.target.value)}
                          className="bg-transparent border-b border-blue-500 outline-none text-gray-900"
                        />
                      ) : channel.channel}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                        <span className="text-blue-600 font-bold">
                          {editMode ? (
                            <input
                              type="number"
                              value={channel.count}
                              onChange={(e) => handleChannelChange(index, 'count', parseFloat(e.target.value) || 0)}
                              className="w-8 text-center bg-transparent outline-none"
                            />
                          ) : channel.count}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-full h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {editMode ? (
                            <input
                              type="number"
                              value={channel.review}
                              onChange={(e) => handleChannelChange(index, 'review', parseFloat(e.target.value) || 0)}
                              className="w-12 text-center bg-transparent outline-none text-white"
                            />
                          ) : channel.review}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`w-full h-8 ${getImplementationColor(channel.implementation)} rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">
                          {editMode ? (
                            <input
                              type="number"
                              value={channel.implementation}
                              onChange={(e) => handleChannelChange(index, 'implementation', parseFloat(e.target.value) || 0)}
                              className="w-12 text-center bg-transparent outline-none text-white"
                            />
                          ) : channel.implementation}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderChannelContent = (channelName) => {
    const channelKey = channelName.toLowerCase().replace(' ', '-');
    const journeys = journeysData[channelKey] || [];
    
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            {channelName} Channel Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channelData
              .filter(ch => ch.channel.toLowerCase().includes(channelName.toLowerCase()) || 
                           channelName.toLowerCase().includes(ch.channel.toLowerCase()))
              .map((channel, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-2 text-gray-900">
                    {channel.channel}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Count:</span>
                      <span className="font-bold text-gray-900">{channel.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Review:</span>
                      <span className="font-bold text-green-500">{channel.review}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Implementation:</span>
                      <span className={`font-bold ${
                        channel.implementation >= 60 ? 'text-green-500' :
                        channel.implementation >= 40 ? 'text-yellow-500' :
                        'text-red-500'
                      }`}>
                        {channel.implementation}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <JourneyTable channel={channelKey} journeys={journeys} />
      </div>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return renderOverview();
      case 'applications':
        return renderChannelContent('Application');
      case 'atm':
        return renderChannelContent('ATM');
      case 'black':
        return renderChannelContent('Black');
      case 'branch':
        return renderChannelContent('Branches');
      case 'contact-center':
        return renderChannelContent('Contact center');
      case 'dst':
        return renderChannelContent('DST');
      case 'itm':
        return renderChannelContent('ITM');
      default:
        return renderOverview();
    }
  };

  const exportData = () => {
    const data = {
      journeyData,
      objectives,
      progressData,
      channelData,
      journeysData,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alternative-delivery-channels-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const ImportModal = () => {
    if (!showImportModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Import Shared Data</h3>
            <button
              onClick={() => setShowImportModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Option 1:</strong> Paste shared data from clipboard:
              </p>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste the copied dashboard data here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none text-sm"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Option 2:</strong> Upload a shared file:
              </p>
              <input
                type="file"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setImportText(event.target.result);
                    };
                    reader.readAsText(file);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <button
              onClick={importData}
              disabled={!importText.trim()}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                importText.trim() 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Import Data
            </button>
            <button
              onClick={() => {
                setShowImportModal(false);
                setImportText('');
              }}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>How to get shared data:</strong><br/>
              • Someone shares data with you by clicking the Copy button (📋)<br/>
              • Or they send you a .json file by clicking the Link button (🔗)<br/>
              • Paste or upload it here to see their dashboard exactly as they saved it
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300">
      <nav className="bg-white border-gray-200 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Alternative Delivery Channels Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center px-3 py-2 rounded-lg ${
                editMode 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-100 text-blue-700'
              } transition-colors`}
            >
              {editMode ? <Save className="h-4 w-4 mr-2" /> : <Edit2 className="h-4 w-4 mr-2" />}
              {editMode ? 'Save' : 'Edit'}
            </button>
            <button
              onClick={exportData}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Export Data"
            >
              <Download className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Import Data"
            >
              <Upload className="h-5 w-5 text-gray-600" />
            </button>
            <div className="relative">
              <button
                onClick={generateShareableLink}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Copy Data to Share"
              >
                <Copy className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <button
              onClick={generateDownloadableLink}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Download Share File"
            >
              <Link className="h-5 w-5 text-gray-600" />
            </button>
            {shareMessage && (
              <span className="text-sm text-green-600 font-medium">
                {shareMessage}
              </span>
            )}
          </div>
        </div>
      </nav>

      <div className="flex">
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out`}>
          <div className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : ''}`} />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>

      <ImportModal />
    </div>
  );
};

export default CustomerJourneyDashboard;
