"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"
import { Select } from "../components/ui/Select"
import Checkbox from "../components/ui/Checkbox"
import { Label } from "../components/ui/Label"
import "../styles/AdminFacilitiesEditPage.css"

const AdminFacilitiesEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
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
    roomTypes: [],
    amenities: [],
    programs: [],
    images: [],
  })
  const [imageFiles, setImageFiles] = useState([])
  const [previewImages, setPreviewImages] = useState([])

  useEffect(() => {
    // TODO: 백엔드 API 연동 - 시설 상세 정보 가져오기
    const fetchFacilityData = async () => {
      try {
        setIsLoading(true)
        // 실제 구현 시 아래 코드를 API 호출로 대체
        const response = await fetch(`/api/facilities/${id}`)
        if (!response.ok) {
          throw new Error("시설 정보를 불러오는데 실패했습니다.")
        }
        const data = await response.json()

        setFormData({
          name: data.name,
          type: data.type,
          address: data.address,
          detailAddress: data.detailAddress || "",
          zipCode: data.zipCode,
          phone: data.phone,
          website: data.website || "",
          description: data.description,
          capacity: data.capacity,
          staffCount: data.staffCount,
          roomTypes: data.roomTypes || [],
          amenities: data.amenities || [],
          programs: data.programs || [],
          images: data.images || [],
        })

        // 기존 이미지 미리보기 설정
        setPreviewImages(data.images || [])

        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchFacilityData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target

    if (checked) {
      setFormData({
        ...formData,
        [category]: [...formData[category], value],
      })
    } else {
      setFormData({
        ...formData,
        [category]: formData[category].filter((item) => item !== value),
      })
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles([...imageFiles, ...files])

    // 이미지 미리보기 생성
    const newPreviewImages = files.map((file) => URL.createObjectURL(file))
    setPreviewImages([...previewImages, ...newPreviewImages])
  }

  const removeImage = (index) => {
    // 기존 이미지인지 새로 추가된 이미지인지 확인
    const isExistingImage = index < formData.images.length

    if (isExistingImage) {
      // 기존 이미지 제거
      const updatedImages = [...formData.images]
      updatedImages.splice(index, 1)
      setFormData({
        ...formData,
        images: updatedImages,
      })
    } else {
      // 새로 추가된 이미지 제거
      const newIndex = index - formData.images.length
      const updatedImageFiles = [...imageFiles]
      updatedImageFiles.splice(newIndex, 1)
      setImageFiles(updatedImageFiles)
    }

    // 미리보기 이미지 제거
    const updatedPreviews = [...previewImages]
    updatedPreviews.splice(index, 1)
    setPreviewImages(updatedPreviews)
  }

  const searchAddress = () => {
    // TODO: 백엔드 API 연동 - 다음(카카오) 우편번호 검색 API 연동
    // 실제 구현 시 다음 우편번호 검색 API를 사용하여 주소 검색 기능 구현
    alert("우편번호 검색 기능은 실제 구현 시 다음(카카오) 우편번호 검색 API를 연동해야 합니다.")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      // TODO: 백엔드 API 연동 - 시설 정보 업데이트
      // 이미지 파일 업로드 처리
      const formDataToSend = new FormData()
      imageFiles.forEach((file) => {
        formDataToSend.append("images", file)
      })

      // 기존 이미지 정보 추가
      formDataToSend.append("existingImages", JSON.stringify(formData.images))

      // 시설 정보 추가
      Object.keys(formData).forEach((key) => {
        if (key !== "images") {
          if (Array.isArray(formData[key])) {
            formDataToSend.append(key, JSON.stringify(formData[key]))
          } else {
            formDataToSend.append(key, formData[key])
          }
        }
      })

      // 실제 구현 시 아래 코드를 API 호출로 대체
      const response = await fetch(`/api/facilities/${id}`, {
        method: "PUT",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("시설 정보 업데이트에 실패했습니다.")
      }

      alert("시설 정보가 성공적으로 업데이트되었습니다.")
      navigate("/admin/facilities")
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 시설을 삭제하시겠습니까?")) {
      return
    }

    try {
      setIsLoading(true)

      // TODO: 백엔드 API 연동 - 시설 삭제
      // 실제 구현 시 아래 코드를 API 호출로 대체
      const response = await fetch(`/api/facilities/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("시설 삭제에 실패했습니다.")
      }

      alert("시설이 성공적으로 삭제되었습니다.")
      navigate("/admin/facilities")
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="admin-facilities-edit-loading">로딩 중...</div>
  }

  if (error) {
    return <div className="admin-facilities-edit-error">오류: {error}</div>
  }

  return (
    <div className="admin-facilities-edit-container">
      <h1 className="admin-facilities-edit-title">시설 정보 수정</h1>

      <form onSubmit={handleSubmit} className="admin-facilities-edit-form">
        <div className="form-section">
          <h2 className="section-title">기본 정보</h2>

          <div className="form-group">
            <Label htmlFor="name">시설명</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <Label htmlFor="type">시설 유형</Label>
            <Select id="type" name="type" value={formData.type} onChange={handleChange} required>
              <option value="">시설 유형 선택</option>
              <option value="요양원">요양원</option>
              <option value="요양병원">요양병원</option>
              <option value="주야간보호">주야간보호</option>
              <option value="방문요양">방문요양</option>
              <option value="방문간호">방문간호</option>
              <option value="방문목욕">방문목욕</option>
              <option value="단기보호">단기보호</option>
              <option value="실버타운">실버타운</option>
              <option value="양로원">양로원</option>
            </Select>
          </div>

          <div className="form-group">
            <Label htmlFor="zipCode">우편번호</Label>
            <div className="zipcode-input-group">
              <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required readOnly />
              <Button type="button" onClick={searchAddress}>
                우편번호 검색
              </Button>
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="address">주소</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} required readOnly />
          </div>

          <div className="form-group">
            <Label htmlFor="detailAddress">상세 주소</Label>
            <Input id="detailAddress" name="detailAddress" value={formData.detailAddress} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="phone">전화번호</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <Label htmlFor="website">웹사이트 (선택사항)</Label>
              <Input id="website" name="website" value={formData.website} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">시설 상세 정보</h2>

          <div className="form-group">
            <Label htmlFor="description">시설 설명</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="capacity">정원</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="staffCount">직원 수</Label>
              <Input
                id="staffCount"
                name="staffCount"
                type="number"
                value={formData.staffCount}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">객실 유형</h2>

          <div className="checkbox-group">
            {["1인실", "2인실", "3인실", "4인실", "다인실"].map((room) => (
              <div key={room} className="checkbox-item">
                <Checkbox
                  id={`room-${room}`}
                  checked={formData.roomTypes.includes(room)}
                  onChange={(e) => handleCheckboxChange(e, "roomTypes")}
                  value={room}
                />
                <Label htmlFor={`room-${room}`}>{room}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">편의 시설</h2>

          <div className="checkbox-group">
            {["식당", "카페", "정원", "물리치료실", "작업치료실", "도서관", "헬스장", "사우나", "미용실", "매점"].map(
              (amenity) => (
                <div key={amenity} className="checkbox-item">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={formData.amenities.includes(amenity)}
                    onChange={(e) => handleCheckboxChange(e, "amenities")}
                    value={amenity}
                  />
                  <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">프로그램</h2>

          <div className="checkbox-group">
            {["음악치료", "미술치료", "원예치료", "운동치료", "인지치료", "작업치료", "레크리에이션", "종교활동"].map(
              (program) => (
                <div key={program} className="checkbox-item">
                  <Checkbox
                    id={`program-${program}`}
                    checked={formData.programs.includes(program)}
                    onChange={(e) => handleCheckboxChange(e, "programs")}
                    value={program}
                  />
                  <Label htmlFor={`program-${program}`}>{program}</Label>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">시설 이미지</h2>

          <div className="form-group">
            <Label htmlFor="images">이미지 업로드</Label>
            <Input id="images" name="images" type="file" accept="image/*" multiple onChange={handleImageChange} />
            <p className="image-help-text">이미지는 최대 10개까지 업로드 가능합니다.</p>

            <div className="image-preview-container">
              {previewImages.map((src, index) => (
                <div key={index} className="image-preview-item">
                  <img src={src || "/placeholder.svg"} alt={`시설 이미지 ${index + 1}`} />
                  <button type="button" className="remove-image-btn" onClick={() => removeImage(index)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "저장 중..." : "저장하기"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/facilities")}>
            취소
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            시설 삭제
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AdminFacilitiesEditPage
