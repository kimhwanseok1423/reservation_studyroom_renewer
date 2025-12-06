// src/pages/StudyRoomSearchPage.tsx
import React, { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import type { LayoutOutletContext } from "../layouts/BasicLayout";

/** — 데이터 타입/샘플 — */
type Room = {
  id: string;
  title: string;
  district: string;
  tags: string[];
  price: number;
  unit: "시간" | "일" | "패키지";
  images: string[];
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

const currency = (n: number) => n.toLocaleString("ko-KR");

export default function mainPage() {
  // ✅ 레이아웃에서 내려준 필터 읽기
  const { filters } = useOutletContext<LayoutOutletContext>();
  const { q, region, tab } = filters;

  // ✅ 필터링 로직: (페이지는 본문만 렌더)
  const filtered = useMemo(() => {
    let list = [...SAMPLE_ROOMS];

    if (region !== "지역") list = list.filter((r) => r.district === region);
    if (tab === "시간단위") list = list.filter((r) => r.unit === "시간");
    if (tab === "패키지") list = list.filter((r) => r.unit === "패키지");

    const keyword = q.trim();
    if (keyword) list = list.filter((r) => r.title.includes(keyword));

    return list;
  }, [region, tab, q]);

  return (
    <>
      <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
        프리미엄존 <span className="text-xs text-gray-400">광고</span>
      </h2>

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
    </>
  );
}

/** — 카드/뱃지 — */
function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.title}
          className="h-full w-full object-cover transition group-hover:scale-[1.03]"
        />
        <div className="absolute left-2 top-2 flex gap-1">
          <Badge color="violet">배달가능</Badge>
          <Badge color="orange">주차가능.</Badge>
        </div>
        <button className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-gray-700 shadow">♡</button>
      </div>

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
