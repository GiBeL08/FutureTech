import { getPostById } from '@/lib/db';
import { notFound } from 'next/navigation';
import PostDetailClient from './PostDetailClient';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    notFound();
  }
  
  try {
    const post = await getPostById(id);
    
    if (!post) {
      notFound();
    }

    return <PostDetailClient initialPost={post} />;
  } catch (error) {
    notFound();
  }
}
