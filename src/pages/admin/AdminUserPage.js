"use client";

import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Button } from "../../components/ui/Button";
import { FaSearch } from "react-icons/fa";

const AdminUserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const dummyMembers = [
        { id: 1, name: "김철수", email: "kim@example.com", phone: "010-1234-5678", joinDate: "2023-01-15" },
        { id: 2, name: "이영희", email: "lee@example.com", phone: "010-2345-6789", joinDate: "2023-02-20" },
        { id: 3, name: "박지민", email: "park@example.com", phone: "010-3456-7890", joinDate: "2023-03-10" },
        { id: 4, name: "최동욱", email: "choi@example.com", phone: "010-4567-8901", joinDate: "2023-04-05" },
        { id: 5, name: "정수민", email: "jung@example.com", phone: "010-5678-9012", joinDate: "2023-05-12" },
      ];
      setMembers(dummyMembers);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="admin-facilities-list max-w-6xl mx-auto px-4">
        <div className="admin-header">
          <h1>회원 관리</h1>
        </div>

        {/* 검색창 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-4 mb-6">
          <div className="relative w-full sm:w-1/2">
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="회원 이름 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 bg-white outline-none"
            />
          </div>
        </div>

        {/* 테이블 */}
        {filteredMembers.length === 0 ? (
          <div className="admin-empty-state py-10 text-center text-gray-500 text-sm">
            검색 조건에 맞는 회원이 없습니다.
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">이름</th>
                  <th className="px-6 py-4">이메일</th>
                  <th className="px-6 py-4">연락처</th>
                  <th className="px-6 py-4">가입일</th>
                  <th className="px-6 py-4">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="h-14">
                    <td className="px-6 py-2">{member.id}</td>
                    <td className="px-6 py-2 font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-2 text-gray-700">{member.email}</td>
                    <td className="px-6 py-2 text-gray-700">{member.phone}</td>
                    <td className="px-6 py-2 text-gray-700">{member.joinDate}</td>
                    <td className="px-6 py-2 flex gap-3">
                      <Button size="sm" variant="outline">정보 보기</Button>
                      <Button size="sm" variant="destructive">탈퇴 처리</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminUserManagementPage;
