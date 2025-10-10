import { Post, POST_API_URL, PostsResponse } from "../model";

/**
 * Fetches posts from the API with pagination
 * @param page - Page number (0-based index)
 * @param limit - Number of posts per page
 * @returns Promise resolving to PostsResponse
 * @throws Error if validation fails or API request fails
 */
export async function getPosts(
  page: number,
  limit: number,
): Promise<PostsResponse> {
  // Input validation
  if (!Number.isInteger(page) || page < 0) {
    throw new Error("getPosts: page must be a non-negative integer");
  }

  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error("getPosts: limit must be a positive integer");
  }

  try {
    const url = new URL(`${POST_API_URL}/v1/posts`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    const res = await fetch(url.toString());

    if (!res.ok) {
      // Provide more specific error information
      const errorMessage = `Failed to fetch posts: ${res.status} ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const data: PostsResponse = await res.json();
    return data;
  } catch (error) {
    // Re-throw network errors with context
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(`Network error while fetching posts: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Fetches a single post from the API by ID
 * Example: example.com/api/posts/1
 * @param id - Id number (0-based index)
 * @returns Promise resolving to Posts
 * @throws Error if validation fails or API request fails
 */
export async function getPost(id: number): Promise<Post> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("getPost: id must be a positive integer");
  }

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
    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error while fetching post ${id}: ${error.message}`,
      );
    }
    // Re-throw other errors (validation, HTTP errors, etc.)
    throw error;
  }
}
