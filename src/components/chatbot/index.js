"use client"

import { useState, useEffect } from "react"
import ChatbotButton from "./ChatbotButton"
import ChatbotWindow from "./ChatbotWindow"

/**
 * 챗봇 메인 컴포넌트
 * 챗봇 버튼과 창을 관리하고 상태를 제어합니다.
 */
const Chatbot = () => {
  // 챗봇 창 열림 상태
  const [isOpen, setIsOpen] = useState(false)

  // 챗봇 창 최소화 상태
  const [isMinimized, setIsMinimized] = useState(false)

  // 읽지 않은 메시지 수
  const [unreadCount, setUnreadCount] = useState(0)

  // 초기 메시지 표시 여부
  const [hasShownInitialMessage, setHasShownInitialMessage] = useState(false)

  // 페이지 로드 후 일정 시간 후에 챗봇 메시지 표시 (첫 방문 시)
  useEffect(() => {
    if (!hasShownInitialMessage) {
      // TODO: 백엔드 API 연동 - 사용자 방문 기록 확인
      const timer = setTimeout(() => {
        setUnreadCount(1)
        setHasShownInitialMessage(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [hasShownInitialMessage])

  /**
   * 챗봇 창 열기
   */
  const handleOpenChat = () => {
    setIsOpen(true)
    setIsMinimized(false)
    setUnreadCount(0)
  }

  /**
   * 챗봇 창 닫기
   */
  const handleCloseChat = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  /**
   * 챗봇 창 최소화
   */
  const handleMinimizeChat = () => {
    setIsMinimized(true)
  }

  return (
    <>
      {/* 챗봇 버튼 */}
      {(!isOpen || isMinimized) && <ChatbotButton onClick={handleOpenChat} unreadCount={unreadCount} />}

      {/* 챗봇 창 */}
      {isOpen && !isMinimized && <ChatbotWindow onClose={handleCloseChat} onMinimize={handleMinimizeChat} />}
    </>
  )
}

export default Chatbot
