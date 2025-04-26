"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"
import { Select } from "../components/ui/Select"
import Checkbox from "../components/ui/Checkbox"
import { Label } from "../components/ui/Label"
import "../styles/AdminFacilitiesNewPage.css"

const AdminFacilitiesNewPage = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    detailAddress: "",
    zipCode: "",
    phone: "",
    website: "",
    description: "",
    capacity: "",
    staffCount: "",
    establishedYear: "",
    operatingHours: "",
    facilities: {
      parking: false,
      cafeteria: false,
      garden: false,
      rehabilitation: false,
      medicalStaff: false,
      privateRooms: false,
      sharedRooms: false,
      elevator: false,
      wheelchairAccess: false,
    },
    images: [],
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // 에러 상태 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      facilities: {
        ...formData.facilities,
        [name]: checked,
      },
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    // 미리보기 URL 생성
    const imageFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    setFormData({
      ...formData,
      images: [...formData.images, ...imageFiles],
    })
  }

  const removeImage = (index) => {
    const newImages = [...formData.images]

    // 미리보기 URL 해제
    URL.revokeObjectURL(newImages[index].preview)

    newImages.splice(index, 1)
    setFormData({
      ...formData,
      images: newImages,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "시설명을 입력해주세요"
    if (!formData.type) newErrors.type = "시설 유형을 선택해주세요"
    if (!formData.address.trim()) newErrors.address = "주소를 입력해주세요"
    if (!formData.phone.trim()) newErrors.phone = "전화번호를 입력해주세요"
    if (!formData.description.trim()) newErrors.description = "시설 설명을 입력해주세요"
    if (!formData.capacity.trim()) newErrors.capacity = "수용 인원을 입력해주세요"
    if (formData.images.length === 0) newErrors.images = "최소 1개 이상의 이미지를 업로드해주세요"

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: 백엔드 API 연동 - 시설 등록 API 호출
      // FormData 객체를 사용하여 이미지 파일과 함께 전송
      const facilityFormData = new FormData()

      // 텍스트 데이터 추가
      Object.keys(formData).forEach((key) => {
        if (key !== "images" && key !== "facilities") {
          facilityFormData.append(key, formData[key])
        }
      })

      // 시설 정보 추가
      Object.keys(formData.facilities).forEach((key) => {
        facilityFormData.append(`facilities[${key}]`, formData.facilities[key])
      })

      // 이미지 파일 추가
      formData.images.forEach((image, index) => {
        facilityFormData.append(`image${index}`, image.file)
      })

      // API 호출 (실제 구현 시 대체)
      console.log("시설 등록 요청:", Object.fromEntries(facilityFormData))

      // 성공 시 시설 목록 페이지로 이동
      alert("시설이 성공적으로 등록되었습니다.")
      navigate("/admin/facilities")
    } catch (error) {
      console.error("시설 등록 오류:", error)
      alert("시설 등록 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="admin-facilities-new-page">
      <div className="admin-header">
        <h1>새 시설 등록</h1>
        <Button onClick={() => navigate("/admin/facilities")} variant="outline">
          목록으로 돌아가기
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="facility-form">
        <div className="form-section">
          <h2>기본 정보</h2>

          <div className="form-group">
            <Label htmlFor="name">시설명 *</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <Label htmlFor="type">시설 유형 *</Label>
            <Select id="type" name="type" value={formData.type} onChange={handleChange} error={errors.type}>
              <option value="">시설 유형 선택</option>
              <option value="nursingHome">요양원</option>
              <option value="nursingHospital">요양병원</option>
              <option value="seniorCenter">노인복지관</option>
              <option value="daycare">주야간보호센터</option>
              <option value="homeVisit">방문요양</option>
              <option value="silverTown">실버타운</option>
            </Select>
            {errors.type && <p className="error-text">{errors.type}</p>}
          </div>
        </div>

        <div className="form-section">
          <h2>위치 정보</h2>

          <div className="form-group">
            <Label htmlFor="zipCode">우편번호</Label>
            <div className="zipcode-input">
              <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} readOnly />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // TODO: 우편번호 검색 API 연동
                  alert("우편번호 검색 기능은 실제 구현 시 Daum 우편번호 API를 연동해주세요.")
                }}
              >
                우편번호 검색
              </Button>
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="address">주소 *</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>

          <div className="form-group">
            <Label htmlFor="detailAddress">상세 주소</Label>
            <Input id="detailAddress" name="detailAddress" value={formData.detailAddress} onChange={handleChange} />
          </div>
        </div>

        <div className="form-section">
          <h2>연락처 정보</h2>

          <div className="form-group">
            <Label htmlFor="phone">전화번호 *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="예: 02-1234-5678"
              error={errors.phone}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <Label htmlFor="website">웹사이트</Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="예: https://www.example.com"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>시설 상세 정보</h2>

          <div className="form-group">
            <Label htmlFor="description">시설 설명 *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              error={errors.description}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="capacity">수용 인원 *</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="0"
                value={formData.capacity}
                onChange={handleChange}
                error={errors.capacity}
              />
              {errors.capacity && <p className="error-text">{errors.capacity}</p>}
            </div>

            <div className="form-group">
              <Label htmlFor="staffCount">직원 수</Label>
              <Input
                id="staffCount"
                name="staffCount"
                type="number"
                min="0"
                value={formData.staffCount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="establishedYear">설립 연도</Label>
              <Input
                id="establishedYear"
                name="establishedYear"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.establishedYear}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <Label htmlFor="operatingHours">운영 시간</Label>
              <Input
                id="operatingHours"
                name="operatingHours"
                placeholder="예: 09:00 - 18:00"
                value={formData.operatingHours}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>시설 편의 사항</h2>

          <div className="facilities-grid">
            {Object.entries({
              parking: "주차장",
              cafeteria: "식당",
              garden: "정원",
              rehabilitation: "재활 시설",
              medicalStaff: "의료 인력",
              privateRooms: "1인실",
              sharedRooms: "다인실",
              elevator: "엘리베이터",
              wheelchairAccess: "휠체어 접근성",
            }).map(([key, label]) => (
              <div key={key} className="facility-checkbox">
                <Checkbox
                  id={key}
                  name={key}
                  checked={formData.facilities[key]}
                  onChange={handleCheckboxChange}
                  label={label}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2>시설 이미지</h2>

          <div className="form-group">
            <Label htmlFor="images">이미지 업로드 *</Label>
            <div className="image-upload-container">
              <label className="image-upload-button">
                <Input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden-input"
                />
                이미지 선택
              </label>
              <span className="help-text">최대 10개까지 업로드 가능합니다.</span>
            </div>
            {errors.images && <p className="error-text">{errors.images}</p>}

            {formData.images.length > 0 && (
              <div className="image-preview-container">
                {formData.images.map((image, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={image.preview || "/placeholder.svg"} alt={`미리보기 ${index + 1}`} />
                    <button type="button" onClick={() => removeImage(index)} className="remove-image-button">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/facilities")}>
            취소
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "등록 중..." : "시설 등록"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AdminFacilitiesNewPage
