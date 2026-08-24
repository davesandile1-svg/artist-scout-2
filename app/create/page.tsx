'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreatePage() {
  const [contentType, setContentType] = useState<'video' | 'music' | 'photo'>('video');
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    genres: [] as string[],
    hashtags: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Upload file to Cloudinary
    // TODO: Create post in database
    console.log('Creating post:', formData);
  };

  const genres = ['Hip-Hop', 'R&B', 'Pop', 'Jazz', 'Electronic', 'Amapiano', 'Gospel', 'Rock'];

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8">
          Create <span className="text-yellow-500">Content</span>
        </h1>

        {/* Content Type Selection */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { type: 'video', icon: '🎥', label: 'Video' },
            { type: 'music', icon: '🎵', label: 'Music' },
            { type: 'photo', icon: '📷', label: 'Photo' },
          ].map(item => (
            <button
              key={item.type}
              onClick={() => setContentType(item.type as 'video' | 'music' | 'photo')}
              className={`card text-center py-6 transition ${
                contentType === item.type
                  ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                  : 'hover:border-yellow-500'
              }`}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <p className="font-semibold">{item.label}</p>
            </button>
          ))}
        </div>

        {/* Upload Area */}
        <div className="card mb-8">
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-yellow-500 transition cursor-pointer">
            <div className="text-4xl mb-4">📤</div>
            <p className="text-lg font-semibold mb-2">Upload {contentType}</p>
            <p className="text-gray-400">Drag and drop or click to select</p>
            <input type="file" className="hidden" accept={contentType === 'video' ? 'video/*' : 'audio/*'} />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Give your content a title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Caption</label>
            <textarea
              value={formData.caption}
              onChange={e => setFormData({ ...formData, caption: e.target.value })}
              placeholder="Describe your content"
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Genres</label>
            <div className="grid grid-cols-2 gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      genres: formData.genres.includes(genre)
                        ? formData.genres.filter(g => g !== genre)
                        : [...formData.genres, genre],
                    });
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    formData.genres.includes(genre)
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hashtags</label>
            <input
              type="text"
              value={formData.hashtags}
              onChange={e => setFormData({ ...formData, hashtags: e.target.value })}
              placeholder="#art #music #talent (separated by spaces)"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary flex-1 py-3">
              Publish
            </button>
            <button type="button" className="btn-secondary flex-1 py-3">
              Save as Draft
            </button>
          </div>
        </form>
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
        <Link href="/create" className="nav-item active">
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
