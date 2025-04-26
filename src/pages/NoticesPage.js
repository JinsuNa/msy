"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/NoticesPage.css"

/**
 * 공지사항 페이지 컴포넌트
 *
 * 시스템의 모든 공지사항을 표시하는 페이지
 *
 * @returns {JSX.Element}
 */
const NoticesPage = () => {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState("all")

  // 백엔드에서 공지사항 데이터 가져오기
  // API 엔드포인트: GET /api/notices?category={category}
  // 응답 형식: { id, title, category, date, content, important }[]
  useEffect(() => {
    // 실제 구현 시 axios 사용
    const fetchNotices = async () => {
      try {
        setLoading(true)
        // const response = await axios.get(`/api/notices?category=${currentTab !== 'all' ? currentTab : ''}`);
        // setNotices(response.data);

        // 임시 데이터
        setTimeout(() => {
          const mockNotices = [
            {
              id: 1,
              title: "노인장기요양보험 신청 방법 안내",
              category: "공지사항",
              date: "2023-05-15",
              content: "노인장기요양보험 신청 방법에 대한 안내입니다...",
              important: true,
            },
            {
              id: 2,
              title: "2023년 노인복지시설 안전점검 결과 발표",
              category: "복지뉴스",
              date: "2023-05-10",
              content: "2023년 노인복지시설 안전점검 결과를 발표합니다...",
              important: false,
            },
            {
              id: 3,
              title: "치매 예방을 위한 생활 수칙 10가지",
              category: "건강정보",
              date: "2023-05-05",
              content: "치매 예방을 위한 생활 수칙 10가지를 안내합니다...",
              important: false,
            },
            {
              id: 4,
              title: "노인 일자리 지원 사업 참여자 모집",
              category: "정부지원",
              date: "2023-05-01",
              content: "노인 일자리 지원 사업 참여자를 모집합니다...",
              important: true,
            },
            {
              id: 5,
              title: "요양보호사 자격증 취득 과정 안내",
              category: "교육정보",
              date: "2023-04-28",
              content: "요양보호사 자격증 취득 과정에 대한 안내입니다...",
              important: false,
            },
          ]

          if (currentTab !== "all") {
            setNotices(mockNotices.filter((notice) => notice.category === currentTab))
          } else {
            setNotices(mockNotices)
          }

          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류가 발생했습니다:", error)
        setLoading(false)
      }
    }

    fetchNotices()
  }, [currentTab])

  // 카테고리 탭 목록
  const tabs = [
    { id: "all", label: "전체" },
    { id: "공지사항", label: "공지사항" },
    { id: "복지뉴스", label: "복지뉴스" },
    { id: "건강정보", label: "건강정보" },
    { id: "정부지원", label: "정부지원" },
    { id: "교육정보", label: "교육정보" },
  ]

  return (
    <div className="notices-page">
      <div className="page-header">
        <div className="container">
          <Link to="/" className="back-button">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h1>공지사항</h1>
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
            <div className="notices-list">
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <div key={notice.id} className="notice-item">
                    {notice.important && <span className="important-badge">중요</span>}
                    <div className="notice-content">
                      <h3 className="notice-title">{notice.title}</h3>
                      <div className="notice-meta">
                        <span className="notice-category">{notice.category}</span>
                        <span className="notice-date">{notice.date}</span>
                      </div>
                    </div>
                    <div className="notice-arrow">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <i className="fas fa-clipboard"></i>
                  </div>
                  <h2>공지사항이 없습니다</h2>
                  <p>현재 카테고리에 등록된 공지사항이 없습니다.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoticesPage
