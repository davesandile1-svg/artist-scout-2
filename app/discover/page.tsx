'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DiscoverPage() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const genres = ['Hip-Hop', 'R&B', 'Pop', 'Jazz', 'Electronic', 'Amapiano', 'Gospel', 'Rock'];
  const locations = ['South Africa', 'Nigeria', 'Kenya', 'Ghana', 'USA', 'UK', 'Canada'];

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8">
          Discover <span className="text-yellow-500">Artists</span>
        </h1>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Genre Filter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Genre</h3>
            <div className="grid grid-cols-2 gap-3">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedGenre === genre
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <div className="grid grid-cols-2 gap-3">
              {locations.map(location => (
                <button
                  key={location}
                  onClick={() => setSelectedLocation(selectedLocation === location ? null : location)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedLocation === location
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View Options */}
        <div className="flex gap-4 mb-8">
          {['Trending', 'New Talent', 'Most Viewed', 'Most Liked'].map(option => (
            <button key={option} className="btn-secondary px-4 py-2">
              {option}
            </button>
          ))}
        </div>

        {/* Artist Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Link key={i} href={`/artist/${i}`}>
              <div className="card hover:border-yellow-500 transition cursor-pointer">
                <div className="w-full h-40 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-600">Video Thumbnail</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Artist Name {i}</h3>
                <p className="text-gray-400 text-sm mb-3">Genre • Location</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>👥 2.5K Followers</span>
                  <span>❤️ 15.2K Likes</span>
                </div>
              </div>
            </Link>
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
        <Link href="/discover" className="nav-item active">
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
        <Link href="/profile" className="nav-item">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
}
