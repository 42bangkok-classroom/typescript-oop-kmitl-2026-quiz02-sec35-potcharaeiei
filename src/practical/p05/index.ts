import axios from "axios"

type ApiComment = {
  id: number
  body: string
}

type CommentResult = {
  id: number
  body: string
}

export async function safeFetchComment(
  commentId: number | null | undefined
): Promise<CommentResult | null> {
  try {
    if (typeof commentId !== "number" || commentId <= 0) {
      return null
    }

    const response = await axios.get<ApiComment>(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`
    )

    if (Object.keys(response.data).length === 0) {
      return null
    }

    const { id, body } = response.data
    return { id, body }
  } catch {
    return null
  }
}
