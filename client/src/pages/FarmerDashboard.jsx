import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackNavigation from '../components/BackNavigation';

const FarmerDashboard = () => {
  const [farmerData] = useState({
    name: 'Rajesh Kumar',
    location: 'Pune, Maharashtra',
    farmSize: '2.5 acres',
    crops: ['Wheat', 'Tomato', 'Onion'],
    joinDate: '2024-01-15'
  });

  const [dashboardStats] = useState({
    totalQueries: 47,
    soilTests: 3,
    diseaseChecks: 8,
    weatherAlerts: 12,
    marketUpdates: 23
  });

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'soil-test',
      title: 'Soil Health Analysis Completed',
      description: 'pH level: 6.8 (Good), Nitrogen: Moderate',
      date: '2024-09-20',
      icon: '🔬',
      status: 'completed'
    },
    {
      id: 2,
      type: 'disease',
      title: 'Disease Detection - Tomato Blight',
      description: 'Early blight detected in tomato crop',
      date: '2024-09-18',
      icon: '🐛',
      status: 'action-required'
    },
    {
      id: 3,
      type: 'weather',
      title: 'Rain Alert Received',
      description: 'Heavy rainfall expected in next 48 hours',
      date: '2024-09-17',
      icon: '🌧️',
      status: 'alert'
    },
    {
      id: 4,
      type: 'market',
      title: 'Price Alert - Wheat',
      description: 'Wheat prices increased by 8% in local market',
      date: '2024-09-15',
      icon: '💰',
      status: 'info'
    }
  ]);

  const [recommendations] = useState([
    {
      id: 1,
      title: 'Apply Fungicide to Tomato Crop',
      description: 'Based on disease detection, apply copper-based fungicide within 2 days',
      priority: 'high',
      category: 'Disease Control',
      icon: '🚨'
    },
    {
      id: 2,
      title: 'Prepare for Rainfall',
      description: 'Check drainage systems and harvest mature crops before heavy rain',
      priority: 'medium',
      category: 'Weather Preparation',
      icon: '⚠️'
    },
    {
      id: 3,
      title: 'Soil Nutrient Boost',
      description: 'Add organic compost to improve soil nitrogen levels',
      priority: 'low',
      category: 'Soil Management',
      icon: '🌱'
    },
    {
      id: 4,
      title: 'Market Opportunity',
      description: 'Consider selling wheat stock as prices are favorable',
      priority: 'medium',
      category: 'Market Strategy',
      icon: '📈'
    }
  ]);

  const [upcomingTasks] = useState([
    { id: 1, task: 'Weekly soil moisture check', due: '2024-09-25', crop: 'Tomato' },
    { id: 2, task: 'Apply fertilizer to wheat field', due: '2024-09-27', crop: 'Wheat' },
    { id: 3, task: 'Pest monitoring for onion crop', due: '2024-09-30', crop: 'Onion' },
    { id: 4, task: 'Harvest assessment for tomatoes', due: '2024-10-05', crop: 'Tomato' }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'action-required': return 'bg-red-100 text-red-800';
      case 'alert': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <BackNavigation title="Back" />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
              <p className="text-gray-600">Welcome back, {farmerData.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Farm Location</p>
              <p className="text-lg font-semibold text-gray-800">{farmerData.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Queries</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalQueries}</p>
              </div>
              <div className="text-blue-500 text-2xl">💬</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Soil Tests</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.soilTests}</p>
              </div>
              <div className="text-green-500 text-2xl">🔬</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Disease Checks</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.diseaseChecks}</p>
              </div>
              <div className="text-red-500 text-2xl">🐛</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Weather Alerts</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.weatherAlerts}</p>
              </div>
              <div className="text-yellow-500 text-2xl">🌤️</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Market Updates</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.marketUpdates}</p>
              </div>
              <div className="text-purple-500 text-2xl">💰</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Farm Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">🚜 Farm Profile</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Farm Size</p>
                  <p className="text-lg font-semibold text-gray-800">{farmerData.farmSize}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Crops</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {farmerData.crops.map((crop, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(farmerData.joinDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">⚡ Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/soil-health" className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition text-center font-medium">
                  🔬 Test Soil Health
                </Link>
                <Link to="/disease-detection" className="block w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition text-center font-medium">
                  🐛 Check Plant Disease
                </Link>
                <Link to="/weather-advisory" className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition text-center font-medium">
                  🌤️ Weather Advisory
                </Link>
                <Link to="/market-prices" className="block w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition text-center font-medium">
                  💰 Market Prices
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">💡 Smart Recommendations</h2>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className={`border rounded-lg p-4 ${getPriorityColor(rec.priority)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{rec.icon}</span>
                        <div>
                          <h3 className="font-semibold">{rec.title}</h3>
                          <p className="text-sm mt-1">{rec.description}</p>
                          <span className="inline-block mt-2 text-xs px-2 py-1 bg-white rounded-full font-medium">
                            {rec.category}
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize`}>
                        {rec.priority} Priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status.replace('-', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 Upcoming Tasks</h2>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <h3 className="font-medium text-gray-800">{task.task}</h3>
                      <p className="text-sm text-gray-600">Crop: {task.crop}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">{task.due}</p>
                      <p className="text-xs text-gray-500">
                        {Math.ceil((new Date(task.due) - new Date()) / (1000 * 60 * 60 * 24))} days left
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;