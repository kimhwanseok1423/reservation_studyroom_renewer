import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";


type SideMenuProps = {
  isOpen: boolean;        // 열림 여부
  onClose: () => void;    // 닫기 함수
};


const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  // Esc 키로 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <>
      {/* 배경 오버레이 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.3 : 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 z-40 ${isOpen ? "block" : "pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-gray-400 bg-opacity-40"
          onClick={onClose}
        />
      </motion.div>

      {/* 사이드 메뉴 */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.28 }}
        className="fixed top-0 left-0 w-100 max-w-full h-full bg-white z-50 shadow-lg flex flex-col"
        aria-hidden={!isOpen}
      >
{/* 상단 로그인 영역 */}
<div className="bg-yellow-400 px-7 py-14 relative flex items-center justify-between">
  {/* 아이콘 - 왼쪽 */}
  <div className="flex-shrink-0">
    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow">
      <img
        src="/assets/profile-icon.png"
        alt="profile"
        className="w-7 h-7 object-contain"
      />
    </div>
  </div>

  {/* 텍스트 - 중앙 */}
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-lg leading-tight">
    게스트로 <br /> 로그인 / 회원가입
  </div>

  {/* 닫기 버튼 - 오른쪽 */}
  <button
    onClick={onClose}
    aria-label="닫기"
    className="text-2xl text-gray-700 hover:text-black"
  >
    ✕
  </button>
</div>

        {/* 상단 아이콘 메뉴 (이벤트, 예약, 후기, 찜공간) */}
        <nav className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-2 text-center text-xl px-6 py-4 font-medium   text-gray-700 gap-y-4">
            <Link to="/event" onClick={onClose}>
              🎉 <br /> 이벤트
            </Link>
            <Link to="/reservation" onClick={onClose}>
              📋 <br /> 예약 리스트
            </Link>
            <Link to="/qna" onClick={onClose}>
              💬 <br /> 이용후기 Q&A
            </Link>
            <Link to="/favorite" onClick={onClose}>
              ⭐ <br /> 찜한공간
            </Link>
          </div>
        </nav>

        {/* 내 관심정보 설정 */}
        <div className="bg-purple-700 text-white font-semibold px-6 py-4">
          내 관심정보 설정
        </div>

        {/* 메뉴 리스트 */}
        <nav className="flex-1 overflow-y-auto divide-y divide-gray-200">
          <Link
            to="/"
            className="block px-5 py-4 hover:bg-gray-50"
            onClick={onClose}
          >
            스페이스클라우드 홈
          </Link>
<div className="block px-5 py-4 hover:bg-gray-50">
          <NavLink to="/notice"> 공지사항</NavLink>
         </div>
         
           
            
        

          <Link
            to="/help"
            className="block px-5 py-4 hover:bg-gray-50"
            onClick={onClose}
          >
            도움말
          </Link>

          <Link
            to="/contact"
            className="block px-5 py-4 hover:bg-gray-50"
            onClick={onClose}
          >
            1:1 문의
          </Link>

          <Link
            to="/info"
            className="block px-5 py-4 hover:bg-gray-50"
            onClick={onClose}
          >
            서비스 정보
          </Link>
        </nav>

        <div className="mt-auto text-center text-gray-400 text-sm p-4 border-t">
          Powered by © NSPACE Corp.
        </div>
      </motion.aside>
    </>
  );
};

export default SideMenu;