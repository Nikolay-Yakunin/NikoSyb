import { Post, POST_API_URL, PostsResponse } from "../model";

/**
 * Fetches posts from the API with pagination
 * @param page - Page number (1-based index)
 * @param limit - Number of posts per page
 * @returns Promise resolving to PostsResponse
 * @throws Error if validation fails or API request fails
 */
export async function getPosts(
  page: number,
  limit: number,
): Promise<PostsResponse> {
  try {
    const url = new URL(`${POST_API_URL}/v1/posts`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    const res = await fetch(url.toString());

    if (!res.ok) {
      const errorMessage = `Failed to fetch posts: ${res.status} ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const data: PostsResponse = await res.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(`Network error while fetching posts: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Fetches a single post from the API by ID
 * Example: example.com/api/posts/1
 * @param id - Id number (1-based index)
 * @returns Promise resolving to Posts
 * @throws Error if validation fails or API request fails
 */
export async function getPost(id: number): Promise<Post> {
  try {
    const url = `${POST_API_URL}/v1/posts/${id}`;
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`Post with id ${id} not found`);
      }
      throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
    }

    const data: Post = await res.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error while fetching post ${id}: ${error.message}`,
      );
    }
    throw error;
  }
}
