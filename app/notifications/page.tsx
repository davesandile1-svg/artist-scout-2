'use client';

import Link from 'next/link';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: 'like', message: 'The Weeknd liked your video', timestamp: '2 minutes ago', avatar: '❤️' },
    { id: 2, type: 'follow', message: 'J. Cole started following you', timestamp: '1 hour ago', avatar: '👤' },
    { id: 3, type: 'comment', message: 'Someone commented on your post', timestamp: '3 hours ago', avatar: '💬' },
    { id: 4, type: 'submission', message: 'Your submission was approved!', timestamp: '1 day ago', avatar: '✅' },
    { id: 5, type: 'opportunity', message: 'New opportunity: Audition for upcoming album', timestamp: '2 days ago', avatar: '🎯' },
  ];

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>

        {/* Notifications List */}
        <div>
          {notifications.map(notif => (
            <div key={notif.id} className="p-6 border-b border-gray-800 hover:bg-gray-900 transition cursor-pointer">
              <div className="flex gap-4">
                <div className="text-3xl flex-shrink-0">{notif.avatar}</div>
                <div className="flex-1">
                  <p className="font-medium">{notif.message}</p>
                  <p className="text-gray-400 text-sm mt-1">{notif.timestamp}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span>
                </div>
              </div>
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
        <Link href="/notifications" className="nav-item active">
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
