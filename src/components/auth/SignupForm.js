"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Check, AlertCircle } from "lucide-react"
import axios from "axios"

// 회원가입 단계 정의
const SignupStep = {
  BasicInfo: 0,
  EmailVerification: 1,
  Password: 2,
  Complete: 3,
}

function SignupForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(SignupStep.BasicInfo)

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  // 유효성 검사 상태
  const [validation, setValidation] = useState({
    userId: true,
    email: true,
    phone: true,
    password: true,
    confirmPassword: true,
  })

  // 이메일 인증 관련 상태
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // 이메일 인증 코드 전송
  const handleSendVerification = async () => {
    try {
      /* 
      백엔드 개발자 참고:
      POST /api/auth/send-verification
      요청 본문: { email: string }
      응답: { success: boolean, message: string }
      */
      await axios.post("/api/auth/send-verification", {
        email: formData.email,
      })

      setIsVerificationSent(true)
      alert("인증 코드가 이메일로 전송되었습니다.")
    } catch (error) {
      console.error("인증 코드 전송 오류:", error)
      alert("인증 코드 전송에 실패했습니다. 다시 시도해주세요.")
    }
  }

  // 이메일 인증 코드 확인
  const handleVerifyEmail = async () => {
    try {
      /* 
      백엔드 개발자 참고:
      POST /api/auth/verify-email
      요청 본문: { email: string, code: string }
      응답: { success: boolean, verified: boolean }
      */
      const response = await axios.post("/api/auth/verify-email", {
        email: formData.email,
        code: verificationCode,
      })

      if (response.data.verified) {
        setIsVerified(true)
        setCurrentStep(SignupStep.Password)
      } else {
        alert("인증 코드가 일치하지 않습니다.")
      }
    } catch (error) {
      console.error("이메일 인증 오류:", error)
      alert("인증에 실패했습니다. 다시 시도해주세요.")
    }
  }

  // 다음 단계로 이동
  const handleNextStep = async () => {
    if (currentStep === SignupStep.BasicInfo) {
      // 기본 정보 유효성 검사
      const isUserIdValid = formData.userId.length >= 4
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      const isPhoneValid = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(formData.phone)

      setValidation({
        ...validation,
        userId: isUserIdValid,
        email: isEmailValid,
        phone: isPhoneValid,
      })

      if (isUserIdValid && isEmailValid && isPhoneValid) {
        // 아이디 중복 확인
        try {
          /* 
          백엔드 개발자 참고:
          GET /api/auth/check-userid?userId={userId}
          응답: { available: boolean }
          */
          const response = await axios.get(`/api/auth/check-userid?userId=${formData.userId}`)

          if (response.data.available) {
            setCurrentStep(SignupStep.EmailVerification)
          } else {
            setValidation({
              ...validation,
              userId: false,
            })
            alert("이미 사용 중인 아이디입니다.")
          }
        } catch (error) {
          console.error("아이디 중복 확인 오류:", error)
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.")
        }
      }
    } else if (currentStep === SignupStep.Password) {
      // 비밀번호 유효성 검사
      const isPasswordValid = formData.password.length >= 8
      const isConfirmValid = formData.password === formData.confirmPassword

      setValidation({
        ...validation,
        password: isPasswordValid,
        confirmPassword: isConfirmValid,
      })

      if (isPasswordValid && isConfirmValid) {
        try {
          /* 
          백엔드 개발자 참고:
          POST /api/auth/signup
          요청 본문: { userId: string, email: string, phone: string, password: string }
          응답: { success: boolean, user: { id: string, name: string } }
          */
          const response = await axios.post("/api/auth/signup", {
            userId: formData.userId,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          })

          if (response.data.success) {
            setCurrentStep(SignupStep.Complete)
          }
        } catch (error) {
          console.error("회원가입 오류:", error)
          alert("회원가입에 실패했습니다. 다시 시도해주세요.")
        }
      }
    } else if (currentStep === SignupStep.Complete) {
      // 회원가입 완료 후 로그인 페이지로 이동
      navigate("/login")
    }
  }

  // 이전 단계로 이동
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // 진행 상태 표시
  const renderProgressBar = () => {
    const steps = ["기본 정보", "이메일 인증", "비밀번호 설정", "가입 완료"]

    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${index <= currentStep ? "text-blue-500" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  index <= currentStep ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <span className="text-xs">{step}</span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    )
  }

  // 기본 정보 입력 단계
  const renderBasicInfoStep = () => {
    return (
      <>
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="userId">아이디</Label>
            <Input
              id="userId"
              name="userId"
              placeholder="아이디를 입력하세요 (4자 이상)"
              value={formData.userId}
              onChange={handleChange}
              className={!validation.userId ? "border-red-500" : ""}
            />
            {!validation.userId && (
              <p className="text-sm text-red-500 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                아이디는 4자 이상이어야 합니다.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
              className={!validation.email ? "border-red-500" : ""}
            />
            {!validation.email && (
              <p className="text-sm text-red-500 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                유효한 이메일 주소를 입력하세요.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">핸드폰 번호</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="핸드폰 번호를 입력하세요 (예: 010-1234-5678)"
              value={formData.phone}
              onChange={handleChange}
              className={!validation.phone ? "border-red-500" : ""}
            />
            {!validation.phone && (
              <p className="text-sm text-red-500 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                유효한 핸드폰 번호를 입력하세요.
              </p>
            )}
          </div>
        </div>

        <Button onClick={handleNextStep} className="w-full bg-blue-500 hover:bg-blue-600">
          다음
        </Button>
      </>
    )
  }

  // 이메일 인증 단계
  const renderEmailVerificationStep = () => {
    return (
      <>
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              <span className="font-medium">{formData.email}</span>로 인증 코드를 전송합니다.
            </p>
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="인증 코드 6자리"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              className="flex-1"
              disabled={isVerified}
            />
            <Button
              onClick={isVerificationSent ? handleVerifyEmail : handleSendVerification}
              variant="outline"
              disabled={isVerified}
            >
              {isVerificationSent ? "확인" : "인증코드 전송"}
            </Button>
          </div>

          {isVerified && (
            <p className="text-sm text-green-500 flex items-center mt-1">
              <Check className="h-4 w-4 mr-1" />
              이메일이 성공적으로 인증되었습니다.
            </p>
          )}

          <div className="text-sm text-gray-500 mt-2">
            <p>
              인증 코드가 오지 않았나요? <button className="text-blue-500 hover:underline">재전송</button>
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={handlePrevStep} variant="outline" className="flex-1">
            이전
          </Button>
          <Button onClick={handleNextStep} className="flex-1 bg-blue-500 hover:bg-blue-600" disabled={!isVerified}>
            다음
          </Button>
        </div>
      </>
    )
  }

  // 비밀번호 설정 단계
  const renderPasswordStep = () => {
    return (
      <>
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요 (8자 이상)"
              value={formData.password}
              onChange={handleChange}
              className={!validation.password ? "border-red-500" : ""}
            />
            {!validation.password && (
              <p className="text-sm text-red-500 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                비밀번호는 8자 이상이어야 합니다.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={!validation.confirmPassword ? "border-red-500" : ""}
            />
            {!validation.confirmPassword && (
              <p className="text-sm text-red-500 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">안전한 비밀번호 작성 팁</span>
            </p>
            <ul className="text-xs text-yellow-700 mt-2 list-disc pl-4 space-y-1">
              <li>대문자와 소문자를 모두 포함하세요.</li>
              <li>숫자를 포함하세요.</li>
              <li>특수문자(!@#$%^&*)를 포함하세요.</li>
              <li>최소 8자 이상으로 작성하세요.</li>
            </ul>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={handlePrevStep} variant="outline" className="flex-1">
            이전
          </Button>
          <Button onClick={handleNextStep} className="flex-1 bg-blue-500 hover:bg-blue-600">
            가입 완료
          </Button>
        </div>
      </>
    )
  }

  // 가입 완료 단계
  const renderCompleteStep = () => {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">회원가입 완료!</h2>
        <p className="text-gray-600 mb-6">
          {formData.userId}님, 회원가입이 성공적으로 완료되었습니다.
          <br />
          이제 로그인하여 서비스를 이용하실 수 있습니다.
        </p>
        <Button onClick={() => navigate("/login")} className="w-full bg-blue-500 hover:bg-blue-600">
          로그인하기
        </Button>
      </div>
    )
  }

  // 현재 단계에 따라 다른 컨텐츠 렌더링
  const renderStepContent = () => {
    switch (currentStep) {
      case SignupStep.BasicInfo:
        return renderBasicInfoStep()
      case SignupStep.EmailVerification:
        return renderEmailVerificationStep()
      case SignupStep.Password:
        return renderPasswordStep()
      case SignupStep.Complete:
        return renderCompleteStep()
      default:
        return null
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {renderProgressBar()}
      {renderStepContent()}

      {currentStep !== SignupStep.Complete && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              로그인
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default SignupForm
