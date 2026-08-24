'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiHeart, FiMessageCircle, FiShare2, FiBookmark, FiVolume2, FiVolumeX } from 'react-icons/fi';

interface Post {
  id: string;
  artistId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  caption: string;
  artist: {
    stageName: string;
    profileImage: string;
    genres: string[];
    location: string;
  };
  viewCount: number;
  likes: { id: string }[];
  comments: { id: string }[];
  _count?: {
    likes: number;
    comments: number;
  };
}

interface FeedState {
  posts: Post[];
  currentIndex: number;
  loading: boolean;
  muted: boolean;
  likedPosts: Set<string>;
  savedPosts: Set<string>;
}

export default function FeedPage() {
  const router = useRouter();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<FeedState>({
    posts: [],
    currentIndex: 0,
    loading: true,
    muted: false,
    likedPosts: new Set(),
    savedPosts: new Set(),
  });

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts/feed');
        if (res.ok) {
          const data = await res.json();
          setState(prev => ({
            ...prev,
            posts: data.posts || [],
            loading: false,
          }));
        } else {
          setState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchPosts();
  }, []);

  // Autoplay video
  useEffect(() => {
    const video = videoRefs.current[state.currentIndex];
    if (video) {
      video.play().catch(() => {});
    }
  }, [state.currentIndex]);

  // Pause other videos
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== state.currentIndex) {
        video.pause();
      }
    });
  }, [state.currentIndex]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const scrollPosition = containerRef.current.scrollTop;
    const itemHeight = window.innerHeight;
    const newIndex = Math.round(scrollPosition / itemHeight);

    if (newIndex !== state.currentIndex && newIndex < state.posts.length) {
      setState(prev => ({ ...prev, currentIndex: newIndex }));
    }
  }, [state.currentIndex, state.posts.length]);

  // Toggle like
  const handleLike = async (postId: string) => {
    const isLiked = state.likedPosts.has(postId);
    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: isLiked ? 'DELETE' : 'POST',
      });

      if (res.ok) {
        const newLikedPosts = new Set(state.likedPosts);
        if (isLiked) {
          newLikedPosts.delete(postId);
        } else {
          newLikedPosts.add(postId);
        }
        setState(prev => ({ ...prev, likedPosts: newLikedPosts }));
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // Toggle save
  const handleSave = async (postId: string) => {
    const isSaved = state.savedPosts.has(postId);
    try {
      const res = await fetch(`/api/posts/${postId}/save`, {
        method: isSaved ? 'DELETE' : 'POST',
      });

      if (res.ok) {
        const newSavedPosts = new Set(state.savedPosts);
        if (isSaved) {
          newSavedPosts.delete(postId);
        } else {
          newSavedPosts.add(postId);
        }
        setState(prev => ({ ...prev, savedPosts: newSavedPosts }));
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  // Handle mute
  const handleMute = () => {
    setState(prev => ({ ...prev, muted: !prev.muted }));
    videoRefs.current.forEach(video => {
      if (video) {
        video.muted = !state.muted;
      }
    });
  };

  if (state.loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (state.posts.length === 0) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        <p className="text-gray-400 mb-4">No posts yet. Check back soon!</p>
        <Link href="/profile">
          <button className="btn-primary">View Profile</button>
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="feed-container snap-y snap-mandatory"
      onScroll={handleScroll}
    >
      {state.posts.map((post, idx) => (
        <div key={post.id} className="video-item snap-start">
          {/* Video */}
          <video
            ref={el => { videoRefs.current[idx] = el; }}
            src={post.videoUrl}
            className="w-full h-full object-cover"
            muted={state.muted}
            loop
            playsInline
          />

          {/* Mute Button */}
          <button
            onClick={handleMute}
            className="absolute top-4 right-4 z-30 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition"
          >
            {state.muted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
          </button>

          {/* Artist Info Overlay */}
          <div className="artist-overlay">
            <div className="artist-info">
              <div className="artist-avatar">
                <img src={post.artist.profileImage || '/placeholder-avatar.png'} alt={post.artist.stageName} />
              </div>
              <div className="artist-details flex-1">
                <h3>{post.artist.stageName}</h3>
                <p>{post.artist.genres.join(', ')}</p>
                <p className="text-xs">{post.artist.location}</p>
              </div>
              <button className="btn-secondary px-4 py-1 text-sm whitespace-nowrap">
                Follow
              </button>
            </div>
            {post.caption && (
              <p className="mt-3 text-sm text-gray-200">{post.caption}</p>
            )}
          </div>

          {/* Engagement Sidebar */}
          <div className="engagement-sidebar">
            {/* Like */}
            <button
              onClick={() => handleLike(post.id)}
              className={`engagement-btn ${state.likedPosts.has(post.id) ? 'liked' : ''}`}
            >
              <FiHeart
                size={32}
                fill={state.likedPosts.has(post.id) ? 'currentColor' : 'none'}
              />
              <span>{post._count?.likes || 0}</span>
            </button>

            {/* Comment */}
            <button className="engagement-btn">
              <FiMessageCircle size={32} />
              <span>{post._count?.comments || 0}</span>
            </button>

            {/* Share */}
            <button className="engagement-btn">
              <FiShare2 size={32} />
              <span>Share</span>
            </button>

            {/* Save */}
            <button
              onClick={() => handleSave(post.id)}
              className={`engagement-btn ${state.savedPosts.has(post.id) ? 'liked' : ''}`}
            >
              <FiBookmark
                size={32}
                fill={state.savedPosts.has(post.id) ? 'currentColor' : 'none'}
              />
              <span>Save</span>
            </button>
          </div>
        </div>
      ))}

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <Link href="/feed" className="nav-item active">
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
