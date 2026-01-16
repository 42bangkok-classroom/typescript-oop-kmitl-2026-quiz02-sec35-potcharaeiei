import axios from "axios"

type ApiPost = {
  userId: number
  id: number
  title: string
}

type ApiComment = {
  postId: number
  id: number
  body: string
}

type PostWithCommentCount = {
  postId: number
  title: string
  totalComments: number
}

export async function mapPostWithCommentCount(): Promise<PostWithCommentCount[]> {
  try {
    const postsResponse = await axios.get<ApiPost[]>(
      "https://jsonplaceholder.typicode.com/posts"
    )

    const commentsResponse = await axios.get<ApiComment[]>(
      "https://jsonplaceholder.typicode.com/comments"
    )

    const posts = postsResponse.data
    const comments = commentsResponse.data

    return posts.map((post) => ({
      postId: post.id,
      title: post.title,
      totalComments: comments.filter(
        (comment) => comment.postId === post.id
      ).length,
    }))
  } catch {
    return []
  }
}
