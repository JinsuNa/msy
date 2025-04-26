"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../components/Layout"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Textarea } from "../../components/ui/Textarea"
import { Label } from "../../components/ui/Label"
import "./AdminNoticeCreatePage.css" // 수정: 경로 변경

/**
 * 공지사항 작성 페이지
 * 관리자가 새로운 공지사항을 작성할 수 있는 페이지입니다.
 */
const NoticeCreatePage = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isImportant: false,
    isVisible: true,
  })
  const [errors, setErrors] = useState({})

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // 에러 상태 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  // 폼 유효성 검사
  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요"
    }

    if (!formData.content.trim()) {
      newErrors.content = "내용을 입력해주세요"
    }

    return newErrors
  }

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: 백엔드 API 연동 - 공지사항 등록 요청
      console.log("공지사항 등록 요청:", formData)

      // 성공 시 공지사항 목록 페이지로 이동
      alert("공지사항이 성공적으로 등록되었습니다.")
      navigate("/admin/notices")
    } catch (error) {
      console.error("공지사항 등록 오류:", error)
      alert("공지사항 등록 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // 취소 버튼 핸들러
  const handleCancel = () => {
    if (window.confirm("작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?")) {
      navigate("/admin/notices")
    }
  }

  return (
    <Layout>
      <div className="admin-notice-create">
        <div className="admin-header">
          <h1>공지사항 작성</h1>
          <Button onClick={() => navigate("/admin/notices")} variant="outline">
            목록으로 돌아가기
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="notice-form">
          <div className="form-group">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="공지사항 제목을 입력하세요"
            />
            {errors.title && <p className="error-text">{errors.title}</p>}
          </div>

          <div className="form-group">
            <Label htmlFor="content">내용 *</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              error={errors.content}
              rows={15}
              placeholder="공지사항 내용을 입력하세요"
            />
            {errors.content && <p className="error-text">{errors.content}</p>}
          </div>

          <div className="form-options">
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="isImportant"
                name="isImportant"
                checked={formData.isImportant}
                onChange={handleChange}
              />
              <Label htmlFor="isImportant">중요 공지로 표시</Label>
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="isVisible"
                name="isVisible"
                checked={formData.isVisible}
                onChange={handleChange}
              />
              <Label htmlFor="isVisible">즉시 게시</Label>
            </div>
          </div>

          <div className="form-actions">
            <Button type="button" variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "등록 중..." : "공지사항 등록"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default NoticeCreatePage
