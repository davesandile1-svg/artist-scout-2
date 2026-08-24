'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Shortlist {
  id: string;
  name: string;
  description: string;
  genre?: string;
  artistCount: number;
}

export default function ShortlistsPage() {
  const [shortlists, setShortlists] = useState<Shortlist[]>([
    { id: '1', name: 'Potential Signings', description: 'Artists ready for signing', genre: 'Mixed', artistCount: 12 },
    { id: '2', name: 'R&B Talents', description: 'Best R&B artists', genre: 'R&B', artistCount: 8 },
    { id: '3', name: 'Emerging Stars', description: 'Up and coming artists', genre: 'Mixed', artistCount: 15 },
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', genre: '' });

  const handleCreateShortlist = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to create shortlist
    const newShortlist: Shortlist = {
      id: Date.now().toString(),
      ...formData,
      artistCount: 0,
    };
    setShortlists([...shortlists, newShortlist]);
    setFormData({ name: '', description: '', genre: '' });
    setShowCreateForm(false);
  };

  const handleDeleteShortlist = async (id: string) => {
    // TODO: Call API to delete shortlist
    setShortlists(shortlists.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              My <span className="text-yellow-500">Shortlists</span>
            </h1>
            <p className="text-gray-400">Organize and track your favorite artists</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-primary px-6 py-3"
          >
            {showCreateForm ? 'Cancel' : '+ Create Shortlist'}
          </button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="card mb-12">
            <h2 className="text-2xl font-bold mb-6">Create New Shortlist</h2>
            <form onSubmit={handleCreateShortlist} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Shortlist Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Potential Signings"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this shortlist..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Genre (Optional)</label>
                <select
                  value={formData.genre}
                  onChange={e => setFormData({ ...formData, genre: e.target.value })}
                >
                  <option value="">All Genres</option>
                  <option value="Hip-Hop">Hip-Hop</option>
                  <option value="R&B">R&B</option>
                  <option value="Pop">Pop</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Electronic">Electronic</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary px-6 py-2">
                  Create Shortlist
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Shortlists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlists.map(shortlist => (
            <Link key={shortlist.id} href={`/shortlists/${shortlist.id}`}>
              <div className="card h-full hover:border-yellow-500 transition cursor-pointer group">
                {/* Placeholder Image */}
                <div className="w-full h-32 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg mb-4 flex items-center justify-center text-black font-bold group-hover:from-yellow-400 group-hover:to-yellow-500 transition">
                  {shortlist.name.charAt(0)}
                </div>

                <h3 className="text-xl font-semibold mb-2">{shortlist.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{shortlist.description}</p>

                {shortlist.genre && (
                  <div className="mb-4">
                    <span className="bg-yellow-500 bg-opacity-20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium">
                      {shortlist.genre}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <span className="text-gray-400 text-sm">{shortlist.artistCount} artists</span>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      handleDeleteShortlist(shortlist.id);
                    }}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    Delete
                  </button>
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
        <Link href="/discover" className="nav-item">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Discover</span>
        </Link>
        <Link href="/shortlists" className="nav-item active">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>Shortlists</span>
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
