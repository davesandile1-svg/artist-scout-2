'use client';

import Link from 'next/link';

export default function GetScoutedPage() {
  const [formData, setFormData] = React.useState({
    artistName: '',
    genre: '',
    location: '',
    bio: '',
    contactEmail: '',
    socialLinks: '',
    musicUrl: '',
    videoUrl: '',
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/submissions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          artistName: '',
          genre: '',
          location: '',
          bio: '',
          contactEmail: '',
          socialLinks: '',
          musicUrl: '',
          videoUrl: '',
        });
      }
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Get <span className="text-yellow-500">Scouted</span>
          </h1>
          <p className="text-xl text-gray-400">
            Submit your talent to be discovered by scouts and industry professionals
          </p>
        </div>

        {submitted ? (
          <div className="card text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-3xl font-bold mb-2">Submission Received!</h2>
            <p className="text-gray-400 mb-6">Thank you for submitting your talent. Our team will review your application and get back to you soon.</p>
            <Link href="/feed">
              <button className="btn-primary">Back to Feed</button>
            </Link>
          </div>
        ) : (
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Artist Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Artist / Stage Name *</label>
                <input
                  type="text"
                  name="artistName"
                  value={formData.artistName}
                  onChange={handleChange}
                  placeholder="Your artist name"
                  required
                />
              </div>

              {/* Genre */}
              <div>
                <label className="block text-sm font-medium mb-2">Primary Genre *</label>
                <select name="genre" value={formData.genre} onChange={handleChange} required>
                  <option value="">Select a genre</option>
                  <option value="Hip-Hop">Hip-Hop</option>
                  <option value="R&B">R&B</option>
                  <option value="Pop">Pop</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Amapiano">Amapiano</option>
                  <option value="Gospel">Gospel</option>
                  <option value="Rock">Rock</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-2">About You *</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about your talent and what makes you unique"
                  rows={5}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Social Links */}
              <div>
                <label className="block text-sm font-medium mb-2">Social Media Links</label>
                <input
                  type="text"
                  name="socialLinks"
                  value={formData.socialLinks}
                  onChange={handleChange}
                  placeholder="Instagram, TikTok, Twitter URLs (separated by commas)"
                />
              </div>

              {/* Music URL */}
              <div>
                <label className="block text-sm font-medium mb-2">Music / Audio Links</label>
                <input
                  type="url"
                  name="musicUrl"
                  value={formData.musicUrl}
                  onChange={handleChange}
                  placeholder="Spotify, SoundCloud, YouTube links"
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-sm font-medium mb-2">Video Links</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="YouTube, TikTok, Instagram video links"
                />
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? 'Submitting...' : 'Submit for Review'}
              </button>

              <p className="text-gray-400 text-sm text-center">
                Our team reviews submissions regularly. We'll notify you if you're selected.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
