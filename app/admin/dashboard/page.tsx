'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
        <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
        <p className="text-black text-opacity-80">Manage the Artist Scouts platform</p>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Users', value: '1,234', icon: '👥' },
            { label: 'Active Subscriptions', value: '456', icon: '💳' },
            { label: 'Total Revenue', value: 'R45,000', icon: '💰' },
            { label: 'Reports', value: '23', icon: '🚨' },
          ].map((stat, idx) => (
            <div key={idx} className="card">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-800 mb-8 overflow-x-auto">
          {['users', 'subscriptions', 'reports', 'submissions', 'opportunities'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold capitalize border-b-2 transition whitespace-nowrap ${
                activeTab === tab
                  ? 'border-yellow-500 text-yellow-500'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card">
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Users Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-700">
                    <tr>
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Joined</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map(i => (
                      <tr key={i} className="border-b border-gray-800 hover:bg-gray-900 transition">
                        <td className="py-3 px-4">User {i}</td>
                        <td className="py-3 px-4">
                          <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-semibold">
                            {i % 2 === 0 ? 'Artist' : 'Scout'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-green-400">Active</span>
                        </td>
                        <td className="py-3 px-4">2024-01-{10 + i}</td>
                        <td className="py-3 px-4">
                          <button className="text-yellow-500 hover:text-yellow-400 mr-4">View</button>
                          <button className="text-red-500 hover:text-red-400">Suspend</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Subscription Management</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">User {i}</p>
                        <p className="text-gray-400 text-sm">Artist Pro - R50/month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">Active</p>
                        <p className="text-gray-400 text-sm">Renews: 2024-02-{10 + i}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Content Reports</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border border-red-700 border-opacity-30 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold">Report #{i}</p>
                        <p className="text-gray-400 text-sm">Reason: Inappropriate Content</p>
                        <p className="text-gray-400 text-sm mt-1">Reported by: User {i}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm">
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Get Scouted Submissions</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border border-blue-700 border-opacity-30 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold">Artist Name {i}</p>
                        <p className="text-gray-400 text-sm">Genre: Hip-Hop</p>
                        <p className="text-gray-400 text-sm">Location: South Africa</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                          View
                        </button>
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm">
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'opportunities' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Opportunities</h2>
              <button className="btn-primary mb-6">Create Opportunity</button>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border border-yellow-700 border-opacity-30 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold">Opportunity {i}</p>
                        <p className="text-gray-400 text-sm">Type: Audition</p>
                        <p className="text-gray-400 text-sm">Applications: 23</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
