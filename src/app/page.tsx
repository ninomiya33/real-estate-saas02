"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      title: "無料査定フォーム",
      description: "住所・面積を入れるだけで簡単に査定が可能。",
      icon: "🏠",
    },
    {
      title: "顧客リスト管理",
      description: "見込み客の情報をステータス付きで保存・確認。",
      icon: "📋",
    },
    {
      title: "ダッシュボード分析",
      description: "進捗管理が一目でわかる営業用データ分析。",
      icon: "📊",
    },
    {
      title: "Googleログイン",
      description: "個別の営業アカウントでログイン・管理可能。",
      icon: "🔐",
    },
  ];

  return (
    <div className="space-y-12 px-4 py-10 max-w-7xl mx-auto">
      {/* ヒーロー */}
      <section className="grid md:grid-cols-2 items-center gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
            不動産営業支援SaaS
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            自分の家を簡単査定 → 見込み客リスト作成
          </p>
          <p className="mt-2 text-sm text-gray-500">
            不動産の査定から営業活動までを一元管理。お客様の大切な資産を最大限に活かすサポートをします。
          </p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => router.push("/estimate")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              無料で査定する
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded"
            >
              ダッシュボード
            </button>
          </div>
        </div>
        <div className="w-full">
          <Image
            src="/images/real-estate.jpg"
            alt="住宅街"
            width={600}
            height={400}
            className="rounded shadow object-cover"
            unoptimized
          />
        </div>
      </section>

      {/* 主な機能 */}
      <section className="py-8 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">主な機能</h2>
        <p className="text-center text-gray-500 mb-10">
          不動産営業の効率化に必要な機能を全て揃えました
        </p>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow text-center flex flex-col items-center hover:scale-105 transition duration-300 ease-in-out"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
