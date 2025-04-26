"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, AlertCircle, Check } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import axios from "axios"

function ForgotPasswordPage() {
  const [step, setStep] = useState(1) // 1: 이메일 입력, 2: 인증 코드 입력, 3: 새 비밀번호 설정, 4: 완료
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)

  // 이메일 제출 핸들러
  const handleEmailSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError("이메일을 입력해주세요.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      /* 
      백엔드 개발자 참고:
      POST /api/auth/forgot-password
      요청 본문: { email: string }
      응답: { success: boolean, message: string }
      */
      const response = await axios.post("/api/auth/forgot-password", { email })

      if (response.data.success) {
        setIsCodeSent(true)
        setStep(2)
      } else {
        setError("등록되지 않은 이메일입니다.")
      }
    } catch (err) {
      console.error("비밀번호 찾기 오류:", err)
      setError("서버 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  // 인증 코드 확인 핸들러
  const handleVerifyCode = async (e) => {
    e.preventDefault()

    if (!verificationCode) {
      setError("인증 코드를 입력해주세요.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      /* 
      백엔드 개발자 참고:
      POST /api/auth/verify-reset-code
      요청 본문: { email: string, code: string }
      응답: { success: boolean, valid: boolean }
      */
      const response = await axios.post("/api/auth/verify-reset-code", {
        email,
        code: verificationCode,
      })

      if (response.data.valid) {
        setStep(3)
      } else {
        setError("인증 코드가 일치하지 않습니다.")
      }
    } catch (err) {
      console.error("인증 코드 확인 오류:", err)
      setError("서버 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  // 새 비밀번호 설정 핸들러
  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (!newPassword) {
      setError("새 비밀번호를 입력해주세요.")
      return
    }

    if (newPassword.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      /* 
      백엔드 개발자 참고:
      POST /api/auth/reset-password
      요청 본문: { email: string, code: string, newPassword: string }
      응답: { success: boolean }
      */
      const response = await axios.post("/api/auth/reset-password", {
        email,
        code: verificationCode,
        newPassword,
      })

      if (response.data.success) {
        setStep(4)
      } else {
        setError("비밀번호 재설정에 실패했습니다.")
      }
    } catch (err) {
      console.error("비밀번호 재설정 오류:", err)
      setError("서버 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link to="/" className="mr-4">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-medium">비밀번호 찾기</h1>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm">
          {error && (
            <div className="bg-red-50 p-3 rounded-md mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">비밀번호 찾기</h2>
              <p className="text-sm text-gray-600 mb-4">
                가입 시 등록한 이메일을 입력하시면 비밀번호 재설정 안내 메일을 보내드립니다.
              </p>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? "처리 중..." : "인증 코드 받기"}
              </Button>

              <div className="text-center mt-4">
                <Link to="/login" className="text-sm text-blue-500 hover:underline">
                  로그인 페이지로 돌아가기
                </Link>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">인증 코드 확인</h2>
              <p className="text-sm text-gray-600 mb-4">{email}로 전송된 인증 코드를 입력해주세요.</p>

              <div className="space-y-2">
                <Label htmlFor="verificationCode">인증 코드</Label>
                <Input
                  id="verificationCode"
                  placeholder="인증 코드 6자리"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? "확인 중..." : "확인"}
              </Button>

              <div className="text-sm text-gray-500 mt-2 text-center">
                <button
                  type="button"
                  className="text-blue-500 hover:underline"
                  onClick={() => {
                    setIsCodeSent(false)
                    handleEmailSubmit({ preventDefault: () => {} })
                  }}
                >
                  인증 코드 재전송
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">새 비밀번호 설정</h2>
              <p className="text-sm text-gray-600 mb-4">새로운 비밀번호를 입력해주세요.</p>

              <div className="space-y-2">
                <Label htmlFor="newPassword">새 비밀번호</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="새 비밀번호 (8자 이상)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? "처리 중..." : "비밀번호 변경"}
              </Button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">비밀번호 변경 완료</h2>
              <p className="text-sm text-gray-600 mb-6">
                비밀번호가 성공적으로 변경되었습니다.
                <br />새 비밀번호로 로그인해주세요.
              </p>
              <Link to="/login">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">로그인 페이지로 이동</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default ForgotPasswordPage
