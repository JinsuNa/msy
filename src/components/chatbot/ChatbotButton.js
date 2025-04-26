"use client"
import { MessageCircle } from "lucide-react"
import { Button } from "../ui/Button"
import "./ChatbotButton.css"

/**
 * 챗봇 버튼 컴포넌트
 *
 * @param {Object} props
 * @param {Function} props.onClick - 버튼 클릭 시 실행할 함수
 * @param {number} [props.unreadCount=0] - 읽지 않은 메시지 수
 */
const ChatbotButton = ({ onClick, unreadCount = 0 }) => {
  return (
    <Button onClick={onClick} className="chatbot-button">
      <MessageCircle className="chatbot-button-icon" />
      {unreadCount > 0 && <span className="chatbot-unread-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>}
    </Button>
  )
}

export default ChatbotButton
