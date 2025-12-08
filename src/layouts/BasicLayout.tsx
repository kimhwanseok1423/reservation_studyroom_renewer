// src/layouts/BasicLayout.tsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideMenu from "../components/SideMenu";

export type FilterState = {
  q: string;
  region: string;
  people: string;
  date: string;
  tab: "전체" | "시간단위" | "패키지" | "촬영" | "베스트 공간";
};

export type LayoutOutletContext = {
  filters: FilterState; // 페이지는 읽기만 하면 됨
  // 필요하면 setFilters도 내려줄 수 있음:
  // setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};

const initialFilters: FilterState = {
  q: "",
  region: "지역",
  people: "인원",
  date: "날짜",
  tab: "베스트 공간",
};

export default function BasicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-screen-2xl px-4 py-3 flex items-center gap-3">
          <button className="text-2xl" onClick={() => setMenuOpen(true)}>☰</button>
          <div className="font-semibold">studyroom</div>

          {/* 공통 검색창 */}
          <div className="ml-auto w-full sm:w-[380px] md:w-[480px]">
            <div className="relative">
              <input
                value={filters.q}
                onChange={(e) => setFilters((s) => ({ ...s, q: e.target.value }))}
                placeholder="촬영·스터디룸"
                className="w-full rounded-full border border-gray-200 pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">🔍</span>
            </div>
          </div>
        </div>

        {/* 1차 필터바 (지역/인원/날짜) */}
        <div className="mx-auto max-w-screen-2xl px-4 pb-3 flex items-center gap-3">
          <Dropdown
            label={filters.region}
            items={["지역", "강남구", "서초구", "마포구", "관악구"]}
            onSelect={(v) => setFilters((s) => ({ ...s, region: v }))}
          />
          <Dropdown
            label={filters.people}
            items={["인원", "1~4", "5~8", "9~12", "13+"]}
            onSelect={(v) => setFilters((s) => ({ ...s, people: v }))}
          />
          <Dropdown
            label={filters.date}
            items={["날짜", "오늘", "내일", "이번 주", "다음 주"]}
            onSelect={(v) => setFilters((s) => ({ ...s, date: v }))}
          />

          <div className="ml-auto flex items-center gap-2">
            <button className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50">🎛️ 필터</button>
            <button className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50">🗺️ 지도</button>
          </div>
        </div>

        {/* 탭바 */}
        <nav className="mx-auto max-w-screen-2xl px-4 pb-2 text-sm text-gray-600">
          <ul className="flex items-center gap-3">
            {(["전체", "시간단위", "패키지", "촬영", "베스트 공간"] as const).map((t) => (
              <li key={t}>
                <button
                  onClick={() => setFilters((s) => ({ ...s, tab: t }))}
                  className={
                    "px-2 py-1 rounded-md transition " +
                    (filters.tab === t
                      ? "text-violet-700 font-semibold bg-violet-50"
                      : "hover:text-gray-900 hover:bg-gray-100")
                  }
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* 사이드 메뉴 */}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Outlet: 페이지 본문만 렌더 + 필터 읽기전용으로 제공 */}
      <main className="mx-auto max-w-screen-2xl px-4 pt-6 pb-16">
        <Outlet context={{ filters } satisfies LayoutOutletContext} />
      </main>
    </div>
  );
}

/** — 내부 전용 드롭다운 — */
function Dropdown({
  label,
  items,
  onSelect,
}: {
  label: string;
  items: string[];
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="min-w-[112px] justify-between flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50"
      >
        <span className={label === items[0] ? "text-gray-400" : "text-gray-800"}>{label}</span>
        <span className="text-gray-400">▾</span>
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-[200px] rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden">
          {items.map((it) => (
            <button
              key={it}
              onClick={() => {
                onSelect(it);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
            >
              {it}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
