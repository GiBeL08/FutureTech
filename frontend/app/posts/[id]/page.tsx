import { getPostById } from '@/lib/db';
import PostDetailClient from './PostDetailClient';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const post = await getPostById(id);
    
    if (!post) {
      return (
        <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
          <p className="text-xl">Post not found</p>
        </div>
      );
    }

    return <PostDetailClient initialPost={post} />;
  } catch (error) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
        <p className="text-red-500">Failed to load post</p>
      </div>
    );
  }
}
