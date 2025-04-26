"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { AlertCircle } from "lucide-react"
import { useAuth } from "../../hooks/use-auth"

// UI 컴포넌트
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import Checkbox from "../ui/Checkbox"

function LoginForm() {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
    rememberMe: false,
  })

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (checked) => {
    setLoginData({
      ...loginData,
      rememberMe: checked,
    })
  }

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault()

    // 유효성 검사
    if (!loginData.userId || !loginData.password) {
      setError("아이디와 비밀번호를 ���두 입력해주세요.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await login({
        userId: loginData.userId,
        password: loginData.password,
      })

      if (result.success) {
        // 로그인 성공
        if (result.isAdmin) {
          navigate("/admin/dashboard")
        } else {
          navigate("/")
        }
      } else {
        setError(result.message || "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.")
      }
    } catch (err) {
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  // 소셜 로그인 처리
  const handleSocialLogin = (provider) => {
    /* 
    백엔드 개발자 참고:
    소셜 로그인 구현 필요
    - 카카오: GET /api/auth/kakao
    - 구글: GET /api/auth/google
    각 엔드포인트는 해당 OAuth 제공자의 인증 페이지로 리디렉션해야 함
    */
    alert(`${provider} 로그인 시도`)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

      {error && (
        <div className="bg-red-50 p-3 rounded-md mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="userId">아이디</Label>
          <Input
            id="userId"
            name="userId"
            placeholder="아이디를 입력하세요"
            value={loginData.userId}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">비밀번호</Label>
            <Link to="/forgot-password" className="text-xs text-blue-500 hover:underline">
              비밀번호 찾기
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="rememberMe" checked={loginData.rememberMe} onCheckedChange={handleCheckboxChange} />
          <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
            로그인 상태 유지
          </label>
        </div>

        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>
      </form>

      {/* 테스트 계정 안내 */}
      <div className="mb-6 p-3 bg-blue-50 rounded-md">
        <h3 className="font-medium text-blue-800 mb-1">테스트 계정</h3>
        <p className="text-sm text-blue-700 mb-1">관리자: admin / admin123</p>
        <p className="text-sm text-blue-700">일반 사용자: user / user123</p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">또는</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => handleSocialLogin("kakao")}
          className="w-full flex items-center justify-center space-x-2 py-2.5 border border-yellow-400 bg-yellow-400 rounded-md hover:bg-yellow-500 transition-colors"
        >
          <img src="/images/kakao-friends-group.png" alt="Kakao" width={20} height={20} />
          <span className="font-medium text-gray-800">카카오로 로그인</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          className="w-full flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <img src="/images/colorful-search-bar.png" alt="Google" width={20} height={20} />
          <span className="font-medium text-gray-800">구글로 로그인</span>
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          아직 계정이 없으신가요?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
