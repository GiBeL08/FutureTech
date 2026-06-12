'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Share2, Trash2, Plus } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({
    name: '',
    avatar: '',
    bio: '',
  });

  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    image: '',
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const tokenStr = localStorage.getItem('token');

    if (!userStr || !tokenStr) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userStr));
    setToken(tokenStr);

    fetchProfile(tokenStr);
  }, [router]);

  const fetchProfile = async (authToken: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data.data);
      setEditForm({
        name: data.data.name || '',
        avatar: data.data.avatar || '',
        bio: data.data.bio || '',
      });
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setProfile(data.data);
      localStorage.setItem('user', JSON.stringify(data.data));
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postForm),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Refresh profile
      await fetchProfile(token);
      setPostForm({ title: '', content: '', image: '' });
      setIsCreatingPost(false);
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Refresh profile
      await fetchProfile(token);
    } catch (err) {
      setError('Failed to delete post');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
        <p className="text-red-500">{error || 'Profile not found'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-[#1A1A1C] border border-[#262626] rounded-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#FFD700] rounded-full flex items-center justify-center">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-black">{profile.name?.[0]?.toUpperCase()}</span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{profile.name || 'Anonymous'}</h1>
                <p className="text-[#98989A]">{profile.email}</p>
                <p className="text-[#98989A] mt-2">{profile.bio || 'No bio'}</p>
                <p className="text-[#FFD700] text-sm mt-2">Role: {profile.role}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#d5b300] transition-colors duration-300"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <form onSubmit={handleUpdateProfile} className="space-y-4 mt-6 pt-6 border-t border-[#262626]">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#262626] border border-[#404040] rounded text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Avatar URL</label>
                <input
                  type="text"
                  value={editForm.avatar}
                  onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                  className="w-full px-4 py-2 bg-[#262626] border border-[#404040] rounded text-white focus:outline-none focus:border-[#FFD700]"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#262626] border border-[#404040] rounded text-white focus:outline-none focus:border-[#FFD700]"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#d5b300] transition-colors duration-300"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>

        {/* Create Post Button */}
        <button
          onClick={() => setIsCreatingPost(!isCreatingPost)}
          className="flex items-center gap-2 px-6 py-3 bg-[#FFD700] text-black font-semibold rounded mb-8 hover:bg-[#d5b300] transition-colors duration-300 "
        >
          <Plus size={20} />
          {isCreatingPost ? 'Cancel' : 'Create Post'}
        </button>

        {/* Create Post Form */}
        {isCreatingPost && (
          <form onSubmit={handleCreatePost} className="bg-[#1A1A1C] border border-[#262626] rounded-lg p-8 mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={postForm.title}
                onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                required
                className="w-full px-4 py-2 bg-[#262626] border border-[#404040] rounded text-white focus:outline-none focus:border-[#FFD700]"
                placeholder="Post title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={postForm.content}
                onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 bg-[#262626] border border-[#404040] rounded text-white focus:outline-none focus:border-[#FFD700]"
                placeholder="Write your post content..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image URL (optional)</label>
              <input
                type="text"
                value={postForm.image}
                onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                className="w-full px-4 py-2 bg-[#262626] border border-[#404040] rounded text-white focus:outline-none focus:border-[#FFD700]"
                placeholder="https://..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#d5b300] transition-colors duration-300"
            >
              Post
            </button>
          </form>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Posts</h2>
          {profile.posts && profile.posts.length > 0 ? (
            profile.posts.map((post: any) => (
              <div key={post.id} className="bg-[#1A1A1C] border border-[#262626] rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <p className="text-[#98989A] text-sm mt-1">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-2 hover:bg-red-900 rounded text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                )}
                <p className="text-[#E0E0E0] mb-4">{post.content}</p>
                <div className="flex gap-4 text-[#98989A]">
                  <div className="flex items-center gap-2">
                    <Heart size={18} />
                    <span>0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={18} />
                    <span>0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 size={18} />
                    <span>0</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#98989A]">No posts yet. Create your first post!</p>
          )}
        </div>
      </div>
    </div>
  );
}
