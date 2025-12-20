import { POST_API_URL_V1, PostsQueries } from "../model"

export async function getPostV1(id: number ) {
  try {
    
    // id must be >= 0
    if (id < 0) {
      throw new Error(`Id must be non negative`);
    }
    
    // request
    const response = await fetch(`${POST_API_URL_V1}/${id}`);
    if (!response.ok) {
      throw new Error(`Fetch error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (err){
    console.error("Failed to fetch post:", err);
    return null;
  }
}

export async function getPostsV1(queries: PostsQueries) {
  try {

    const url = new URL(POST_API_URL_V1);
    const params = new URLSearchParams();

    // [offset, limit]
    const range = queries.range || [0, 4];
    params.append("range", JSON.stringify(range));

    if (queries.filter && Object.keys(queries.filter).length > 0) {
      params.append("filter", JSON.stringify(queries.filter));
    }

    // [col, sort]
    const sort = queries.sort || ["id", "ASC"];
    params.append("sort", JSON.stringify(sort));

    url.search = params.toString();

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Fetch error! status: ${response.status}`);
    }

    let data = await response.json();
    return data;


  } catch (err) {
    console.error("Failed to fetch posts:", err);
    return null;
  }
}