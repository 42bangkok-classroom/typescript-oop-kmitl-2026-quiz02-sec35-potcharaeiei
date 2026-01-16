import axios from "axios"

type ApiComment = {
  postId?: number | null
  id: number
  body: string
}

type CommentCount = {
  [postId: number]: number
}

export async function countCommentsByPost(): Promise<CommentCount> {
  try {
    const response = await axios.get<ApiComment[]>(
      "https://jsonplaceholder.typicode.com/comments"
    )

    return response.data.reduce<CommentCount>((result, comment) => {
      if (comment.postId == null) {
        return result
      }

      result[comment.postId] = (result[comment.postId] ?? 0) + 1
      return result
    }, {})
  } catch {
    return {}
  }
}
