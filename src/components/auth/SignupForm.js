"use client"


import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Check, AlertCircle } from "lucide-react"
import axios from "axios"
import '../../styles/login.css';  // 수정: sign.css로 연결했어


const API_BASE_URL = process.env.REACT_APP_API_URL;

const SignupStep = {
  BasicInfo: 0,
  EmailVerification: 1,
  Password: 2,
  Complete: 3,
}

function SignupForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(SignupStep.BasicInfo)
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [validation, setValidation] = useState({
    userId: true,
    email: true,
    phone: true,
    password: true,
    confirmPassword: true,
  })

  const [verificationCode, setVerificationCode] = useState("")
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSendVerification = async () => {
    try {
      await axios.post("/auth/send-verification", { email: formData.email })
      setIsVerificationSent(true)
      alert("인증 코드가 이메일로 전송되었습니다.")
    } catch (error) {
      console.error("인증 코드 전송 오류:", error)
      alert("인증 코드 전송에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post("/auth/verify-email", {
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

  const handleNextStep = async () => {
    if (currentStep === SignupStep.BasicInfo) {
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
        try {
          const response = await axios.get(`${API_BASE_URL}/auth/check-userid?userId=${formData.userId}`)
          
          console.log(response)
          if (!response.data) {
            setCurrentStep(SignupStep.EmailVerification)
          } else {
            setValidation({ ...validation, userId: false })
            alert("이미 사용 중인 아이디입니다.")
          }
        } catch (error) {
          console.error("아이디 중복 확인 오류:", error)
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.")
        }
      }
    } else if (currentStep === SignupStep.Password) {
      const isPasswordValid = formData.password.length >= 8
      const isConfirmValid = formData.password === formData.confirmPassword

      setValidation({
        ...validation,
        password: isPasswordValid,
        confirmPassword: isConfirmValid,
      })

      if (isPasswordValid && isConfirmValid) {
        try {
          const response = await axios.post("/auth/signup", {
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
      navigate("/login")
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderProgressBar = () => {
    const steps = ["기본 정보", "이메일 인증", "비밀번호 설정", "가입 완료"]

    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col items-center ${index <= currentStep ? "text-blue-500" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${index <= currentStep ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
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

  const renderBasicInfoStep = () => (
    <>
      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="userId">아이디</Label>
          <Input id="userId" name="userId" placeholder="아이디를 입력하세요 (4자 이상)" value={formData.userId} onChange={handleChange} className={!validation.userId ? "border-red-500" : ""} />
          {!validation.userId && (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              아이디는 4자 이상이어야 합니다.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" name="email" type="email" placeholder="이메일을 입력하세요" value={formData.email} onChange={handleChange} className={!validation.email ? "border-red-500" : ""} />
          {!validation.email && (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              유효한 이메일 주소를 입력하세요.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">핸드폰 번호</Label>
          <Input id="phone" name="phone" placeholder="핸드폰 번호를 입력하세요 (예: 010-1234-5678)" value={formData.phone} onChange={handleChange} className={!validation.phone ? "border-red-500" : ""} />
          {!validation.phone && (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              유효한 핸드폰 번호를 입력하세요.
            </p>
          )}
        </div>
      </div>

      <Button onClick={handleNextStep} className="sign-btn w-full">
        다음
      </Button>
    </>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case SignupStep.BasicInfo:
        return renderBasicInfoStep()
      // 나머지 단계는 생략
    }
  }

  return (
    <div className="sign-container bg-white p-6 rounded-lg shadow-sm">
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
