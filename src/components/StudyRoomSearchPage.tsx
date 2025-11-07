import React, { useMemo, useState } from "react";

// —— 샘플 데이터 (백엔드 붙이기 전에 임시로 사용) ——
type Room = {
  id: string;
  title: string;
  district: string; // 서초구, 강남구 등
  tags: string[];   // 배달가능, 주차, 흡연불가 등
  price: number;    // 최저가 (원)
  unit: "시간" | "일" | "패키지";
  images: string[]; // 대표 이미지 1장 이상
  likes: number;
  views: number;
};

const SAMPLE_ROOMS: Room[] = [
  {
    id: "1",
    title: "강남역_스테디룸A(화이트톤)",
    district: "서초구",
    tags: ["냉난방", "배달가능"],
    price: 1000,
    unit: "시간",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"],
    likes: 912,
    views: 606,
  },
  {
    id: "2",
    title: "[무료 이벤트] 모던톤 회의실 6인", 
    district: "관악구",
    tags: ["TV", "화이트보드"],
    price: 2500,
    unit: "시간",
    images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop"],
    likes: 440,
    views: 1203,
  },
  {
    id: "3",
    title: "강남루프탑_스튜디오 겸 라운지",
    district: "강남구",
    tags: ["루프탑", "촬영가능"],
    price: 1000,
    unit: "시간",
    images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop"],
    likes: 131,
    views: 914,
  },
  {
    id: "4",
    title: "모임공간-아담 [단정 2호점]",
    district: "마포구",
    tags: ["주차", "빔프로젝터"],
    price: 5000,
    unit: "시간",
    images: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"],
    likes: 77,
    views: 428,
  },
  {
    id: "5",
    title: "[가을 초특가] 강남 핑크톤 회의실",
    district: "강남구",
    tags: ["주차", "에어컨"],
    price: 1000,
    unit: "시간",
    images: ["https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?q=80&w=1600&auto=format&fit=crop"],
    likes: 66,
    views: 404,
  },
];

// —— 유틸 ——
const currency = (n: number) => n.toLocaleString("ko-KR");

// —— 필터/정렬 상태 타입 ——
type FilterState = {
  region: string; // "전체" | "강남구" ...
  people: string; // "전체" | "1~4" | "5~8" | ...
  date: string;   // yyyy-mm-dd 또는 ""
  tab: "전체" | "시간단위" | "패키지" | "촬영" | "베스트 공간";
  q: string;      // 검색어
};

const initialFilter: FilterState = {
  region: "지역",
  people: "인원",
  date: "날짜",
  tab: "베스트 공간",
  q: "",
};

export default function StudyRoomSearchPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilter);

  // —— 실제로는 API 파라미터로 변환해서 fetch ——
  const filtered = useMemo(() => {
    let list = [...SAMPLE_ROOMS];
    if (filters.region !== "지역") {
      list = list.filter((r) => r.district === filters.region);
    }
    if (filters.tab === "시간단위") {
      list = list.filter((r) => r.unit === "시간");
    }
    if (filters.tab === "패키지") {
      list = list.filter((r) => r.unit === "패키지");
    }
    if (filters.q.trim()) {
      const q = filters.q.trim();
      list = list.filter((r) => r.title.includes(q));
    }
    return list;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-screen-2xl px-4 py-3 flex items-center gap-3">
          <button className="text-2xl">☰</button>
          <div className="font-semibold">SpaceCloud.</div>

          {/* 검색창 */}
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

        {/* 1차 필터바 */}
        <div className="mx-auto max-w-screen-2xl px-4 pb-3 flex items-center gap-3">
          <Dropdown
            label={filters.region}
            items={["지역", "강남구", "서초구", "마포구", "관악구"]}
            onSelect={(v) => setFilters((s) => ({ ...s, region: v }))}
          />
          <Dropdown
            label={filters.people}
            items={["인원", "1~4", "5~8", "9~12", "13+" ]}
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

      {/* 본문 */}
      <main className="mx-auto max-w-screen-2xl px-4 pt-6 pb-16">
        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          프리미엄존 <span className="text-xs text-gray-400">광고</span>
        </h2>

        {/* 카드 그리드 */}
        <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full h-52 grid place-items-center text-gray-500">
              조건에 맞는 공간이 없습니다.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// —— 컴포넌트들 ——
function Dropdown({ label, items, onSelect }: { label: string; items: string[]; onSelect: (v: string) => void }) {
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
              onClick={() => { onSelect(it); setOpen(false); }}
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

function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
      {/* 이미지 */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.title}
          className="h-full w-full object-cover transition group-hover:scale-[1.03]"
        />
        {/* 상단 좌측 뱃지들 */}
        <div className="absolute left-2 top-2 flex gap-1">
          <Badge color="violet">배달가능</Badge>
          <Badge color="orange">주차가능</Badge>
        </div>
        {/* 상단 우측 북마크 */}
        <button className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-gray-700 shadow">♡</button>
      </div>

      {/* 본문 */}
      <div className="p-3">
        <div className="flex items-center gap-1 text-[11px] text-gray-500">
          <span>★ 4.8</span>
          <span className="mx-1">·</span>
          <span>{room.district}</span>
        </div>

        <h3 className="mt-1 line-clamp-1 text-[15px] font-semibold text-gray-900">{room.title}</h3>

        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
          {room.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-md bg-gray-100 px-2 py-0.5">{t}</span>
          ))}
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div className="text-[13px] text-gray-500">
            최저
            <span className="ml-1 text-[15px] font-bold text-gray-900">{currency(room.price)}</span>
            <span className="ml-1">원/{room.unit}</span>
          </div>
          <div className="text-[11px] text-gray-400">
            ❤ {room.likes} · 👁 {room.views}
          </div>
        </div>
      </div>
    </article>
  );
}

function Badge({ color = "gray", children }: { color?: "gray" | "violet" | "orange"; children: React.ReactNode }) {
  const colorMap: Record<string, string> = {
    gray: "bg-gray-800 text-white",
    violet: "bg-violet-600 text-white",
    orange: "bg-orange-500 text-white",
  };
  return (
    <span className={"rounded-md px-2 py-0.5 text-[11px] font-medium " + colorMap[color]}>
      {children}
    </span>
  );
}
