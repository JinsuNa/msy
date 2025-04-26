"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs"
import { Link } from "react-router-dom"

const FacilityReviewPage = () => {
  const { id } = useParams()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newReview, setNewReview] = useState({
    rating: 5,
    content: "",
  })

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        // TODO: 백엔드 개발자는 아래 엔드포인트를 구현해야 합니다.
        // GET /api/facilities/{id}/reviews - 시설 리뷰 목록 조회
        const response = await axios.get(`/api/facilities/${id}/reviews`)
        setReviews(response.data)
      } catch (err) {
        console.error("리뷰를 불러오는 중 오류가 발생했습니다:", err)
        setError("리뷰를 불러오는 중 오류가 발생했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReview({
      ...newReview,
      [name]: value,
    })
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    if (!newReview.content.trim()) {
      alert("리뷰 내용을 입력해주세요.")
      return
    }

    try {
      // TODO: 백엔드 개발자는 아래 엔드포인트를 구현해야 합니다.
      // POST /api/facilities/{id}/reviews - 시설 리뷰 작성
      const response = await axios.post(`/api/facilities/${id}/reviews`, newReview)

      // 새 리뷰를 목록에 추가
      setReviews([response.data, ...reviews])

      // 입력 폼 초기화
      setNewReview({
        rating: 5,
        content: "",
      })

      alert("리뷰가 등록되었습니다.")
    } catch (err) {
      console.error("리뷰 등록 중 오류가 발생했습니다:", err)
      alert("리뷰 등록 중 오류가 발생했습니다.")
    }
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "gold" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline-block"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ))
  }

  return (
    <div className="container mx-auto p-4">
      {/* 탭 메뉴 */}
      <Tabs defaultValue="review" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="info">
            <Link to={`/facility/${id}`} className="w-full h-full flex items-center justify-center">
              기본 정보
            </Link>
          </TabsTrigger>
          <TabsTrigger value="cost">
            <Link to={`/facility/${id}/cost`} className="w-full h-full flex items-center justify-center">
              비용 안내
            </Link>
          </TabsTrigger>
          <TabsTrigger value="review">리뷰</TabsTrigger>
          <TabsTrigger value="question">
            <Link to={`/facility/${id}/question`} className="w-full h-full flex items-center justify-center">
              문의
            </Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">리뷰 작성</h2>

          <form onSubmit={handleSubmitReview} className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">평점</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="mr-1 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={star <= newReview.rating ? "gold" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                리뷰 내용
              </label>
              <textarea
                id="content"
                name="content"
                value={newReview.content}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="이용 경험을 자세히 작성해주세요."
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              리뷰 등록
            </button>
          </form>

          <h2 className="text-xl font-semibold mb-4">리뷰 목록</h2>

          {loading ? (
            <div className="text-center py-4">로딩 중...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-4 text-gray-500">아직 리뷰가 없습니다.</div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{review.userName}</div>
                    <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="mb-2">{renderStars(review.rating)}</div>
                  <p className="text-gray-700">{review.content}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FacilityReviewPage
