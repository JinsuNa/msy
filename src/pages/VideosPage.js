"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/VideosPage.css"

/**
 * 비디오 페이지 컴포넌트
 *
 * 노인 복지 관련 교육 및 정보 비디오를 표시하는 페이지
 *
 * @returns {JSX.Element}
 */
const VideosPage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState("all")

  // 백엔드에서 비디오 데이터 가져오기
  // API 엔드포인트: GET /api/videos?category={category}
  // 응답 형식: { id, title, category, duration, views, uploadDate, thumbnailUrl, videoUrl }[]
  useEffect(() => {
    // 실제 구현 시 axios 사용
    const fetchVideos = async () => {
      try {
        setLoading(true)
        // const response = await axios.get(`/api/videos?category=${currentTab !== 'all' ? currentTab : ''}`);
        // setVideos(response.data);

        // 임시 데이터
        setTimeout(() => {
          const mockVideos = [
            {
              id: 1,
              title: "노인 복지 시설 종류와 특징",
              category: "교육",
              duration: "12:34",
              views: 1245,
              uploadDate: "2023-04-15",
              thumbnailUrl: "/images/welfare-facilities-types-thumbnail.png",
              videoUrl: "https://www.youtube.com/watch?v=example1",
            },
            {
              id: 2,
              title: "노인 복지 시설 이용 방법",
              category: "가이드",
              duration: "08:21",
              views: 987,
              uploadDate: "2023-04-10",
              thumbnailUrl: "/images/senior-facility-usage-thumbnail.png",
              videoUrl: "https://www.youtube.com/watch?v=example2",
            },
            {
              id: 3,
              title: "실버타운과 요양원의 차이점",
              category: "정보",
              duration: "15:47",
              views: 2345,
              uploadDate: "2023-04-05",
              thumbnailUrl: "/images/senior-housing-differences-thumbnail.png",
              videoUrl: "https://www.youtube.com/watch?v=example3",
            },
            {
              id: 4,
              title: "노인 복지 정책 설명회",
              category: "정책",
              duration: "32:18",
              views: 876,
              uploadDate: "2023-03-28",
              thumbnailUrl: "/images/senior-welfare-presentation-thumbnail.png",
              videoUrl: "https://www.youtube.com/watch?v=example4",
            },
            {
              id: 5,
              title: "치매 예방을 위한 두뇌 활동",
              category: "건강",
              duration: "10:05",
              views: 3456,
              uploadDate: "2023-03-20",
              thumbnailUrl: "/images/thoughtful-communication.png",
              videoUrl: "https://www.youtube.com/watch?v=example5",
            },
            {
              id: 6,
              title: "노인 운동 프로그램: 관절 건강",
              category: "건강",
              duration: "18:32",
              views: 2134,
              uploadDate: "2023-03-15",
              thumbnailUrl: "/images/supportive-stroll.png",
              videoUrl: "https://www.youtube.com/watch?v=example6",
            },
          ]

          if (currentTab !== "all") {
            setVideos(mockVideos.filter((video) => video.category === currentTab))
          } else {
            setVideos(mockVideos)
          }

          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("비디오를 불러오는 중 오류가 발생했습니다:", error)
        setLoading(false)
      }
    }

    fetchVideos()
  }, [currentTab])

  // 카테고리 탭 목록
  const tabs = [
    { id: "all", label: "전체" },
    { id: "교육", label: "교육" },
    { id: "가이드", label: "가이드" },
    { id: "정보", label: "정보" },
    { id: "정책", label: "정책" },
    { id: "건강", label: "건강" },
  ]

  return (
    <div className="videos-page">
      <div className="page-header">
        <div className="container">
          <Link to="/" className="back-button">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h1>교육 영상</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${currentTab === tab.id ? "active" : ""}`}
                onClick={() => setCurrentTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="videos-grid">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <div key={video.id} className="video-card">
                    <div className="video-thumbnail">
                      <img src={video.thumbnailUrl || "/placeholder.svg"} alt={video.title} />
                      <div className="video-duration">{video.duration}</div>
                      <div className="play-button">
                        <i className="fas fa-play"></i>
                      </div>
                    </div>
                    <div className="video-info">
                      <h3 className="video-title">{video.title}</h3>
                      <div className="video-meta">
                        <span className="video-category">{video.category}</span>
                        <span className="video-views">조회수 {video.views}회</span>
                        <span className="video-date">{video.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <i className="fas fa-video"></i>
                  </div>
                  <h2>영상이 없습니다</h2>
                  <p>현재 카테고리에 등록된 영상이 없습니다.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideosPage
