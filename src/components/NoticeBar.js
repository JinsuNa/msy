"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { X } from "lucide-react"

function NoticeBar() {
  const [notices, setNotices] = useState([])
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // 공지사항 데이터 가져오기
  useEffect(() => {
    // TODO: 백엔드 API - 공지사항 목록 가져오기
    // axios.get('/api/notices/featured')
    //   .then(response => {
    //     setNotices(response.data);
    //   })
    //   .catch(error => {
    //     console.error('공지사항을 불러오는데 실패했습니다:', error);
    //   });

    // 임시 데이터
    setNotices([
      { id: 1, title: "요양보호사 자격증 취득 지원 프로그램 안내", link: "/notices/1" },
      { id: 2, title: "2023년 노인장기요양보험 제도 변경 안내", link: "/notices/2" },
      { id: 3, title: "실버타운 모바일 앱 출시 안내", link: "/notices/3" },
    ])
  }, [])

  // 공지사항 순환 표시
  useEffect(() => {
    if (notices.length <= 1) return

    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [notices])

  // 공지사항 닫기
  const closeNotice = () => {
    setIsVisible(false)

    // 로컬 스토리지에 닫은 상태 저장 (24시간 동안)
    const expireTime = new Date().getTime() + 24 * 60 * 60 * 1000
    localStorage.setItem("noticeBarClosed", expireTime.toString())
  }

  // 로컬 스토리지에서 닫은 상태 확인
  useEffect(() => {
    const closedUntil = localStorage.getItem("noticeBarClosed")
    if (closedUntil && Number.parseInt(closedUntil) > new Date().getTime()) {
      setIsVisible(false)
    }
  }, [])

  if (!isVisible || notices.length === 0) return null

  const currentNotice = notices[currentNoticeIndex]

  return (
    <div className="bg-blue-500 text-white py-2 px-4 text-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/notice-icon.png" alt="공지" className="h-4 w-4 mr-2" />
          <Link to={currentNotice.link} className="hover:underline truncate">
            {currentNotice.title}
          </Link>
        </div>
        <button onClick={closeNotice} className="ml-2 p-1 rounded-full hover:bg-blue-600">
          <X className="h-4 w-4" />
          <span className="sr-only">닫기</span>
        </button>
      </div>
    </div>
  )
}

export default NoticeBar
