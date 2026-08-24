'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-yellow-500 to-black h-32 md:h-48"></div>

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto px-4 relative">
        <div className="card -mt-16 mb-8">
          {/* Avatar */}
          <div className="flex flex-col md:flex-row md:gap-6 md:items-end mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gray-800 border-4 border-black -mt-12 md:-mt-16 flex-shrink-0">
              {/* Profile Image */}
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold mb-1">Your Name</h1>
              <p className="text-gray-400">@username • Artist</p>
              <p className="text-gray-400 text-sm mt-2">Bio goes here</p>
            </div>
            <button className="btn-secondary w-full md:w-auto mt-4 md:mt-0">
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500">12</p>
              <p className="text-gray-400 text-sm">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500">2.5K</p>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500">45.2K</p>
              <p className="text-gray-400 text-sm">Likes</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-800 mb-8 overflow-x-auto">
          {['posts', 'music', 'photos', 'about'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold capitalize border-b-2 transition ${
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Media {i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <Link href="/feed" className="nav-item">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Home</span>
        </Link>
        <Link href="/discover" className="nav-item">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Discover</span>
        </Link>
        <Link href="/create" className="nav-item">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create</span>
        </Link>
        <Link href="/notifications" className="nav-item">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span>Notifications</span>
        </Link>
        <Link href="/profile" className="nav-item active">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
}
