import { prisma } from '@/lib/prisma';
import { defaultBlogSlug } from '@/lib/blogs';
import { handleApiError, jsonError, jsonOk } from '@/lib/api-response';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    let post = await prisma.blogPost.findUnique({ where: { slug } });

    if (!post) {
      post = await prisma.blogPost.findUnique({ where: { slug: defaultBlogSlug } });
    }

    if (!post) {
      return jsonError('Blog post not found', 404);
    }

    return jsonOk({
      slug: post.slug,
      title: post.title,
      heroImage: post.heroImage,
      category: post.category,
      publishedDate: post.publishedDate,
      readingTime: post.readingTime,
      authorName: post.authorName,
      likes: post.likes,
      views: post.views,
      shares: post.shares,
      introduction: post.introduction,
      sections: JSON.parse(post.sections) as { heading: string; paragraphs: string[] }[],
      relatedTopics: JSON.parse(post.relatedTopics) as string[],
    });
  } catch (error) {
    return handleApiError(error);
  }
}
