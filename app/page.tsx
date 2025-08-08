"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Download, BookOpen, Users, GraduationCap, ArrowLeft, ChevronRight, Heart, Lightbulb, Shield, FileText, Smile, Globe, Church, Wrench, Cpu, Target } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

type ViewType = "categories" | "subjects" | "books"

// Data kelas TANPA semester: langsung berisi subjects
const classData: Record<
  "X" | "XI" | "XII",
  {
    name: string
    subjects: string[]
  }
> = {
  X: {
    name: "Kelas X",
    subjects: [
      "Matematika",
      "Bahasa Indonesia",
      "Bahasa Inggris",
      "Fisika",
      "Kimia",
      "Biologi",
      "Sejarah Indonesia",
      "Geografi",
      "Ekonomi",
      "Sosiologi",
      "Pendidikan Agama",
      "PKn",
    ],
  },
  XI: {
    name: "Kelas XI",
    subjects: [
      "Matematika Wajib",
      "Matematika Peminatan",
      "Bahasa Indonesia",
      "Bahasa Inggris",
      "Fisika",
      "Kimia",
      "Biologi",
      "Sejarah Indonesia",
      "Geografi",
      "Ekonomi",
      "Sosiologi",
      "Pendidikan Agama",
    ],
  },
  XII: {
    name: "Kelas XII",
    subjects: [
      "Matematika Wajib",
      "Matematika Peminatan",
      "Bahasa Indonesia",
      "Bahasa Inggris",
      "Fisika",
      "Kimia",
      "Biologi",
      "Sejarah Indonesia",
      "Geografi",
      "Ekonomi",
      "Sosiologi",
      "Persiapan UTBK",
    ],
  },
}

// Data kategori tambahan (tetap)
const additionalCategories = {
  "cerpen-sastra": {
    name: "Cerpen & Sastra",
    description:
      "Cerita pendek, novel remaja, puisi, dan karya sastra klasik untuk meningkatkan minat baca dan literasi",
    icon: Heart,
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-50 to-rose-100",
    subjects: [
      "Cerpen Indonesia",
      "Novel Remaja",
      "Puisi Modern",
      "Sastra Klasik",
      "Drama & Teater",
      "Antologi Sastra",
      "Biografi Sastrawan",
      "Kritik Sastra",
    ],
  },
  "pengembangan-diri": {
    name: "Pengembangan Diri",
    description:
      "Buku-buku tentang motivasi, manajemen waktu, public speaking, leadership, dan keterampilan sosial",
    icon: Lightbulb,
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-50 to-orange-100",
    subjects: [
      "Motivasi & Inspirasi",
      "Manajemen Waktu",
      "Public Speaking",
      "Leadership",
      "Keterampilan Sosial",
      "Komunikasi Efektif",
      "Goal Setting",
      "Mindfulness",
    ],
  },
  "literasi-digital": {
    name: "Literasi Digital",
    description:
      "Buku yang mengajarkan etika digital, keamanan siber, penggunaan media sosial yang bijak, coding dasar",
    icon: Shield,
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-50 to-blue-100",
    subjects: [
      "Etika Digital",
      "Keamanan Siber",
      "Media Sosial Bijak",
      "Coding Dasar",
      "Digital Citizenship",
      "Privacy Online",
      "Hoax & Misinformasi",
      "AI & Machine Learning",
    ],
  },
  "karya-ilmiah": {
    name: "Karya Ilmiah & Laporan",
    description:
      "Contoh karya tulis ilmiah, skripsi, laporan praktikum, dan panduan membuat makalah",
    icon: FileText,
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-100",
    subjects: [
      "Metodologi Penelitian",
      "Penulisan Ilmiah",
      "Laporan Praktikum",
      "Proposal Penelitian",
      "Skripsi & Thesis",
      "Jurnal Ilmiah",
      "Presentasi Ilmiah",
      "Sitasi & Referensi",
    ],
  },
  "komik-edukasi": {
    name: "Komik Edukasi",
    description:
      "Komik pembelajaran sains, sejarah, atau nilai moral yang disajikan dengan gaya ringan",
    icon: Smile,
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-100",
    subjects: [
      "Komik Sains",
      "Komik Sejarah",
      "Komik Matematika",
      "Komik Moral",
      "Komik Biografi",
      "Komik Lingkungan",
      "Komik Teknologi",
      "Komik Budaya",
    ],
  },
  "bahasa-asing": {
    name: "Bahasa Asing",
    description:
      "Buku untuk belajar bahasa asing selain Inggris (Arab, Jepang, Mandarin, dll.)",
    icon: Globe,
    gradient: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-50 to-cyan-100",
    subjects: [
      "Bahasa Arab",
      "Bahasa Jepang",
      "Bahasa Mandarin",
      "Bahasa Korea",
      "Bahasa Jerman",
      "Bahasa Prancis",
      "Bahasa Spanyol",
      "Bahasa Melayu",
    ],
  },
  keagamaan: {
    name: "Keagamaan",
    description:
      "Buku pelajaran agama, tafsir, fiqih, dan nilai-nilai moral lintas agama",
    icon: Church,
    gradient: "from-amber-500 to-yellow-600",
    bgGradient: "from-amber-50 to-yellow-100",
    subjects: [
      "Pendidikan Agama Islam",
      "Pendidikan Agama Kristen",
      "Pendidikan Agama Katolik",
      "Pendidikan Agama Hindu",
      "Pendidikan Agama Buddha",
      "Pendidikan Agama Konghucu",
      "Akhlak & Moral",
      "Sejarah Agama",
    ],
  },
  "life-skills": {
    name: "Keterampilan Hidup",
    description:
      "Panduan memasak, pertolongan pertama, keuangan pribadi, dan soft skill lainnya",
    icon: Wrench,
    gradient: "from-red-500 to-pink-600",
    bgGradient: "from-red-50 to-pink-100",
    subjects: [
      "Memasak & Nutrisi",
      "Pertolongan Pertama",
      "Keuangan Pribadi",
      "Keterampilan Rumah Tangga",
      "Berkebun & Pertanian",
      "Kerajinan Tangan",
      "Otomotif Dasar",
      "Entrepreneurship",
    ],
  },
  "stem-projects": {
    name: "STEM Projects",
    description:
      "Buku eksperimen sains, coding, robotika, dan teknologi kreatif",
    icon: Cpu,
    gradient: "from-indigo-500 to-purple-600",
    bgGradient: "from-indigo-50 to-purple-100",
    subjects: [
      "Eksperimen Sains",
      "Programming & Coding",
      "Robotika",
      "Arduino & IoT",
      "3D Printing",
      "Elektronika",
      "Matematika Terapan",
      "Engineering Design",
    ],
  },
  "tryout-soal": {
    name: "Tryout & Soal Latihan",
    description:
      "Buku-buku yang berisi kumpulan soal ujian, tryout UTBK, dan pembahasan soal",
    icon: Target,
    gradient: "from-slate-500 to-gray-600",
    bgGradient: "from-slate-50 to-gray-100",
    subjects: [
      "Tryout UTBK",
      "Soal UN/UNBK",
      "Olimpiade Sains",
      "TOEFL & IELTS",
      "Tes Masuk PTN",
      "Tes CPNS",
      "Bank Soal Matematika",
      "Bank Soal IPA",
    ],
  },
} as const

// Tipe buku tanpa field semester
type Book = {
  id: number
  title: string
  author: string
  subject: string
  class: string // "X" | "XI" | "XII" atau key kategori tambahan
  description: string
  cover: string
  downloadUrl: string
  pages: number
  year: number
}

function getDrivePreviewUrl(url: string | undefined): string | null {
  if (!url) return null
  try {
    // Cocokkan pola https://drive.google.com/file/d/{FILE_ID}/...
    const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
    if (match?.[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`
    }
    return url
  } catch {
    return url ?? null
  }
}

// Mock data buku (cover pakai placeholder dengan query)
const books: Book[] = [
  // Kelas X
  {
    id: 1,
    title: "Bahasa Indonesia Kelas X",
    author: "Suherli, Maman Suryaman, Aji Septiaji, Istiqomah.",
    subject: "Bahasa Indonesia",
    class: "X",
    description: "Buku Bahasa Indonesia untuk SMA/MA/SMK/MAK Kelas X",
    cover: "/cov-bindo.png",
    downloadUrl: "https://drive.google.com/file/d/1RtjyDgnjCTyyU7DQ98toeXanggfK9nMA/view?usp=drive_link",
    pages: 296,
    year: 2017,
  },
  {
    id: 2,
    title: "Matematika Kelas X",
    author: "Dicky Susanto, Theja Kurniawan, Savitri K. Sihombing, Eunice Salim, Marianna Magdalena Radjawane, Ummy Salmah, Ambarsari Kusuma Wardani.",
    subject: "Matematika",
    class: "X",
    description: "Buku Matematika SMA/SMK Kelas X",
    cover: "/cov-mat-x.png",
    downloadUrl: "https://drive.google.com/file/d/1GqvmWkp5DywXox4h-pImPEIOVR-lolvC/view?usp=sharing",
    pages: 288,
    year: 2021,
  },
  {
    id: 3,
    title: "Bahasa Inggris Kelas X",
    author: "Budi Hermawan, Dwi Haryanti, dan Nining Suryaningsih.",
    subject: "Bahasa Inggris",
    class: "X",
    description: "Buku Bahasa Inggris untuk SMA/SMK/MA Kelas X",
    cover: "/cov-big-x.png",
    downloadUrl: "https://drive.google.com/file/d/16VGuVX-Y6bvjdm9WOP3YWw7W8QE10AwQ/view?usp=sharing",
    pages: 200,
    year: 2022,
  },

  {
    id: 4,
    title: "Fisika Kelas X",
    author: "Setya Nurachmandani.",
    subject: "Fisika",
    class: "X",
    description: "Buku Fisika untuk SMA/MA Kelas X",
    cover: "/cov-fisika-x.png",
    downloadUrl: "https://drive.google.com/file/d/1PW4gDQEpICp_ReIkNuFy-_CAkY1ptF_A/view?usp=sharing",
    pages: 270,
    year: 2009,
  },
  {
    id: 5,
    title: "Kimia Kelas X",
    author: "Iman Rahayu.",
    subject: "Kimia",
    class: "X",
    description: "Buku Kimia untuk SMA/MA Kelas X",
    cover: "/cov-kimia-x.png",
    downloadUrl: "https://drive.google.com/file/d/15-mtwyoqLvHUPX_DANmLI9lXm_br9DqN/view?usp=sharing",
    pages: 222,
    year: 2009,
  },

  {
    id: 6,
    title: "Biologi Kelas X",
    author: "Moch Anshori dan Djoko Martono",
    subject: "Biologi",
    class: "X",
    description: "Buku Biologi untuk SMA/MA Kelas X",
    cover: "/cov-biologi-x.png",
    downloadUrl: "https://drive.google.com/file/d/1MZO0-tvhY9OtF2UWlT6EXaOj2UWE-10h/view?usp=sharing",
    pages: 280,
    year: 2009,
  },

  {
    id: 7,
    title: "Sejarah Indonesia Kelas X",
    author: "Restu Gunawan, Amurwani Dwi Lestariningsih, Sardiman",
    subject: "Sejarah Indonesia",
    class: "X",
    description: "Buku Sejarah Indonesia untuk SMA/MA Kelas X",
    cover: "/cov-si-x.png",
    downloadUrl: "https://drive.google.com/file/d/1XnhzpS0wMJCG9MpkKER627D7IuXpkeZS/view?usp=sharing",
    pages: 288,
    year: 2019,
  },

  {
    id: 8,
    title: "Geografi Kelas X",
    author: "Eni Anjayani dan Tri Haryanto",
    subject: "Geografi",
    class: "X",
    description: "Buku Geografi untuk SMA/MA Kelas X",
    cover: "/cov-geo-x.png",
    downloadUrl: "https://drive.google.com/file/d/1fFLX37I6eee2yqwjyJo1QMXA5IGaWFGD/view?usp=sharing",
    pages: 244,
    year: 2009,
  },

  {
    id: 9,
    title: "Ekonomi Kelas X",
    author: "Sukardi",
    subject: "Ekonomi",
    class: "X",
    description: "Buku Ekonomi untuk SMA/MA Kelas X",
    cover: "/cov-ekonomi-x.png",
    downloadUrl: "https://drive.google.com/file/d/1ZyHotUFEEiJuRlHMxlPabUwYbVDcPmmL/view?usp=sharing",
    pages: 182,
    year: 2009,
  },

  {
    id: 10,
    title: "Ilmu Pengetahuan Sosial Kelas X",
    author: "Sari Oktafiana, Efvinggo Fasya Jaya, M. Nursa’ban, Supardi, Mohammad Rizky Satria",
    subject: "Sosiologi",
    class: "X",
    description: "Buku Sosiologi untuk SMA/MA Kelas X",
    cover: "/cov-sos-x.png",
    downloadUrl: "https://drive.google.com/file/d/1WpB6pq5MDOF3mh6YjrEbCXqodnned4hi/view?usp=sharing",
    pages: 344,
    year: 2021,
  },

  {
    id: 11,
    title: "Pendidikan Agama Islam Kelas X",
    author: "Nelty Khairiyah dan Endi Suhendi Zen.",
    subject: "Pendidikan Agama",
    class: "X",
    description: "Buku PAI untuk SMA/MA Kelas X",
    cover: "/cov-pai-x.png",
    downloadUrl: "https://drive.google.com/file/d/1dZkO9iyCP3s2ie4yOLD5muY7xqjkr3iS/view?usp=sharing",
    pages: 208,
    year: 2017,
  },

  {
    id: 12,
    title: "PKn Kelas X",
    author: "Nuryadi dan Tolib.",
    subject: "PKn",
    class: "X",
    description: "Buku PKn untuk SMA/MA Kelas X",
    cover: "/cov-pkn-x.png",
    downloadUrl: "https://drive.google.com/file/d/1WApL79iVudsYAlNms4nKcUXbbJfeQGfw/view?usp=sharing",
    pages: 264,
    year: 2017,
  },




  // Kategori Tambahan
  {
    id: 11,
    title: "Kumpulan Cerpen Remaja Terbaik",
    author: "Andrea Hirata",
    subject: "Cerpen Indonesia",
    class: "cerpen-sastra",
    description: "Koleksi cerpen terbaik karya penulis Indonesia untuk remaja",
    cover: "/placeholder.svg?height=200&width=150",
    downloadUrl: "https://drive.google.com/file/d/example11",
    pages: 180,
    year: 2023,
  },
]

export default function PerpustakaanOnline() {
  const [currentView, setCurrentView] = useState<ViewType>("categories")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")

  const [previewBook, setPreviewBook] = useState<Book | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  function openPreview(book: Book) {
    setPreviewBook(book)
    setIsPreviewOpen(true)
  }
  function closePreview() {
    setIsPreviewOpen(false)
    // opsional: setTimeout(() => setPreviewBook(null), 200)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentView, selectedCategory, selectedSubject])

  const isClassCategory = (key: string) => key in classData

  // Ambil daftar mata pelajaran dari kategori/kelas
  const getSubjectsForSelectedCategory = (): string[] => {
    if (!selectedCategory) return []
    const isClass = Object.prototype.hasOwnProperty.call(classData, selectedCategory)
    return isClass
      ? classData[selectedCategory as keyof typeof classData].subjects
      : additionalCategories[selectedCategory as keyof typeof additionalCategories]?.subjects || []
  }

  // Filter buku berdasarkan kategori/kelas + subject + pencarian
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const q = searchTerm.toLowerCase()
      const matchesSearch = book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q)
      const matchesCat = book.class === selectedCategory
      const matchesSubject = book.subject === selectedSubject
      return matchesSearch && matchesCat && matchesSubject
    })
  }, [searchTerm, selectedCategory, selectedSubject])

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey)
    setCurrentView("subjects") // langsung ke subjects (tanpa semester)
  }

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject)
    setCurrentView("books")
  }

  const handleBackToCategories = () => {
    setCurrentView("categories")
    setSelectedCategory("")
    setSelectedSubject("")
    setSearchTerm("")
  }

  const handleBackToSubjects = () => {
    setCurrentView("subjects")
    setSelectedSubject("")
    setSearchTerm("")
  }

  const handleDownload = (url: string, title: string) => {
    alert(`Mengunduh: ${title}\nLink: ${url}`)
  }

  const getBreadcrumb = () => {
    const breadcrumbs = ["Beranda"]
    if (selectedCategory) {
      if (isClassCategory(selectedCategory)) {
        breadcrumbs.push(`Kelas ${selectedCategory}`)
      } else {
        const cat = additionalCategories[selectedCategory as keyof typeof additionalCategories]
        breadcrumbs.push(cat?.name || selectedCategory)
      }
    }
    if (selectedSubject) {
      breadcrumbs.push(selectedSubject)
    }
    return breadcrumbs
  }

  const getCurrentCategoryData = () => {
    if (isClassCategory(selectedCategory)) {
      return classData[selectedCategory as keyof typeof classData]
    }
    return additionalCategories[selectedCategory as keyof typeof additionalCategories]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Perpustakaan Online</h1>
                <p className="text-xs sm:text-sm text-gray-600">SMA 5 Muhammadiyah Makassar</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>Untuk Siswa & Guru</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <GraduationCap className="h-4 w-4" />
                <span>Gratis & Legal</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main key={`${currentView}-${selectedCategory}-${selectedSubject}`} className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          {getBreadcrumb().map((crumb, index) => (
            <div key={`${crumb}-${index}`} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" aria-hidden="true" />}
              <span className={index === getBreadcrumb().length - 1 ? "font-semibold text-gray-900" : ""}>{crumb}</span>
            </div>
          ))}
        </div>

        {/* Categories View */}
        {currentView === "categories" && (
          <div>
            {/* Hero */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" aria-hidden="true" />
                Platform Pembelajaran Digital Terlengkap
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
                Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Koleksi</span> Lengkap
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                Dari buku pelajaran hingga pengembangan diri, dari literasi digital hingga karya sastra. Temukan ribuan buku digital berkualitas untuk mendukung perjalanan belajar Anda.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto px-4">
              <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">Banyak Pilihan</div>
                <div className="text-sm sm:text-base text-gray-600">Buku Digital</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">13</div>
                <div className="text-sm sm:text-base text-gray-600">Kategori</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">Tersedia</div>
                <div className="text-sm sm:text-base text-gray-600">Pilihan Mata Pelajaran</div>
              </div>
            </div>

            {/* Kelas Akademik */}
            <div className="mb-12 lg:mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Kelas Akademik</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">Buku pelajaran sesuai kurikulum nasional untuk setiap jenjang kelas</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
                {Object.entries(classData).map(([classKey, classInfo], index) => {
                  const gradients = ["from-blue-500 to-blue-600", "from-purple-500 to-purple-600", "from-indigo-500 to-indigo-600"]
                  const bgGradients = ["from-blue-50 to-blue-100", "from-purple-50 to-purple-100", "from-indigo-50 to-indigo-100"]
                  return (
                    <Card
                      key={classKey}
                      className="group hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1 sm:hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden relative"
                      onClick={() => handleCategorySelect(classKey)}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <CardHeader className="text-center p-4 sm:p-6 relative z-10">
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${gradients[index]} rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-2xl sm:text-3xl font-bold text-white">{classKey}</span>
                        </div>
                        <CardTitle className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-gray-900 transition-colors">{classInfo.name}</CardTitle>
                        <CardDescription className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors">
                          {classInfo.subjects.length} Mata Pelajaran
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center pb-4 sm:pb-6 px-4 sm:px-6 relative z-10">
                        <Button className={`w-full bg-gradient-to-r ${gradients[index]} hover:shadow-lg transition-all duration-300 text-white border-0 py-2 sm:py-3 text-sm sm:text-base font-semibold group-hover:scale-105`}>
                          Lihat Mata Pelajaran
                          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Kategori Khusus */}
            <div className="mb-12 lg:mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Kategori Khusus</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">Koleksi buku untuk pengembangan diri, literasi digital, dan keterampilan hidup</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4">
                {Object.entries(additionalCategories).map(([categoryKey, categoryInfo]) => {
                  const IconComponent = categoryInfo.icon
                  return (
                    <Card
                      key={categoryKey}
                      className="group hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1 sm:hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden relative"
                      onClick={() => handleCategorySelect(categoryKey)}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${categoryInfo.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <CardHeader className="text-center p-4 sm:p-6 relative z-10">
                        <div className={`w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-r ${categoryInfo.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-8 w-8 sm:h-9 sm:w-9 text-white" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl font-bold mb-2 group-hover:text-gray-900 transition-colors line-clamp-2">{categoryInfo.name}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors line-clamp-3">{categoryInfo.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center pb-4 sm:pb-6 px-4 sm:px-6 relative z-10">
                        <div className="mb-3 text-xs sm:text-sm text-gray-500">{categoryInfo.subjects.length} topik tersedia</div>
                        <Button className={`w-full bg-gradient-to-r ${categoryInfo.gradient} hover:shadow-lg transition-all duration-300 text-white border-0 py-2 text-sm font-semibold group-hover:scale-105`}>
                          Jelajahi
                          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8 sm:mt-12 lg:mt-16 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl text-white max-w-4xl mx-auto">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Siap Mengembangkan Potensi Diri?</h3>
              <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">Dengan 13 kategori lengkap dan koleksi buku berkualitas, wujudkan impian belajar tanpa batas</p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
                <div className="flex items-center space-x-2 text-blue-100 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>100% Gratis</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-100 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Akses Mudah</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-100 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Update Berkala</span>
                </div>
              </div>
            </div>

            {/* Sambutan Kepala Perpustakaan */}
            <section className="bg-gradient-to-r from-slate-50 to-gray-100 py-12 lg:py-16 mt-16 rounded-2xl">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8 lg:mb-12">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Sambutan Kepala Perpustakaan</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
                  </div>
                  <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-blue-100 to-indigo-200 overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=600&width=800"
                          alt="Kepala Perpustakaan SMA 5 Muhammadiyah Makassar"
                          fill
                          className="object-cover object-center"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 rounded-full" />
                        <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/30 rounded-full" />
                        <div className="absolute top-1/2 right-12 w-8 h-8 bg-white/25 rounded-full" />
                      </div>
                      <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                          <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Dr. Musrial Arif Abadi, S.Kom., M.T</h4>
                          <p className="text-blue-600 font-semibold text-sm sm:text-base lg:text-lg mb-4">Kepala Perpustakaan SMA 5 Muhammadiyah Makassar</p>
                          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mb-6" />
                        </div>
                        <blockquote className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 italic">
                          {'"Selamat datang di Perpustakaan Digital SMA 5 Muhammadiyah Makassar. Kami berkomitmen untuk menyediakan akses literasi yang mudah dan berkualitas bagi seluruh siswa dan guru. Dengan koleksi digital yang terus berkembang, mari kita wujudkan generasi yang cerdas, berkarakter, dan siap menghadapi tantangan masa depan."'}
                        </blockquote>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-8 lg:mt-12">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white shadow-lg">
                      <BookOpen className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span className="font-semibold text-sm sm:text-base">{'"Membaca adalah Jendela Dunia, Digital adalah Masa Depan"'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Subjects View */}
        {currentView === "subjects" && selectedCategory && (
          <div>
            <div className="flex items-center mb-4 sm:mb-6 px-4">
              <Button variant="ghost" onClick={handleBackToCategories} className="text-sm sm:text-base">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Kategori
              </Button>
            </div>

            <div className="text-center mb-6 sm:mb-8 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                {isClassCategory(selectedCategory) ? `Mata Pelajaran Kelas ${selectedCategory}` : getCurrentCategoryData()?.name}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                {getCurrentCategoryData()?.description || "Pilih mata pelajaran untuk melihat koleksi buku yang tersedia"}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 px-4">
              {getSubjectsForSelectedCategory().map((subject) => {
                const bookCount = books.filter((book) => book.class === selectedCategory && book.subject === subject).length

                return (
                  <Card
                    key={subject}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                    onClick={() => handleSubjectSelect(subject)}
                  >
                    <CardHeader className="text-center p-3 sm:p-4 lg:p-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                        <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-sm sm:text-base lg:text-lg leading-tight">{subject}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">{bookCount} buku tersedia</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center pb-3 sm:pb-4 lg:pb-6 px-3 sm:px-4 lg:px-6">
                      <Button size="sm" className="w-full text-xs sm:text-sm">
                        Lihat Buku
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Books View */}
        {currentView === "books" && selectedCategory && selectedSubject && (
          <div>
            <div className="flex items-center mb-4 sm:mb-6 px-4">
              <Button variant="ghost" onClick={handleBackToSubjects} className="text-sm sm:text-base">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Mata Pelajaran
              </Button>
            </div>

            <div className="text-center mb-6 sm:mb-8 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                {selectedSubject}
                {isClassCategory(selectedCategory) && <span className="text-lg sm:text-xl text-gray-600 block mt-2">Kelas {selectedCategory}</span>}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Koleksi buku digital untuk mata pelajaran {selectedSubject}</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 mx-4">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                <Input
                  placeholder="Cari judul buku atau penulis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Results info */}
            <div className="mb-4 sm:mb-6 px-4">
              <p className="text-sm sm:text-base text-gray-600">Menampilkan {filteredBooks.length} buku untuk {selectedSubject}</p>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="p-3 sm:p-4">
                    <div className="aspect-[3/4] relative mb-3 sm:mb-4">
                      <Image
                        src={book.cover || "/placeholder.svg?height=200&width=150&query=book%20cover"}
                        alt={book.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <CardTitle className="text-base sm:text-lg line-clamp-2">{book.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">oleh {book.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {isClassCategory(selectedCategory) ? (
                          <Badge variant="secondary" className="text-xs">Kelas {book.class}</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">{getCurrentCategoryData()?.name}</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">{book.subject}</Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{book.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{book.pages} halaman</span>
                        <span>Tahun {book.year}</span>
                      </div>
                      <Button
                        onClick={() => openPreview(book)}
                        className="w-full text-xs sm:text-sm"
                        size="sm"
                      >
                        Mulai Membaca
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredBooks.length === 0 && (
              <div className="text-center py-8 sm:py-12 px-4">
                <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" aria-hidden="true" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Tidak ada buku ditemukan</h3>
                <p className="text-sm sm:text-base text-gray-600">Belum ada buku untuk {selectedSubject} atau coba ubah kata kunci pencarian</p>
              </div>
            )}
          </div>
        )}
        <Dialog open={isPreviewOpen} onOpenChange={(o) => (o ? setIsPreviewOpen(true) : closePreview())}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{previewBook?.title ?? "Pratinjau Buku"}</DialogTitle>
              <DialogDescription>
                {previewBook ? `oleh ${previewBook.author}` : "Membuka pratinjau..."}
              </DialogDescription>
            </DialogHeader>

            {previewBook && (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-48">
                    <div className="relative aspect-[3/4] w-full rounded-md overflow-hidden border">
                      <Image
                        src={previewBook.cover || "/placeholder.svg?height=200&width=150&query=book-cover"}
                        alt={`Sampul ${previewBook.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {Object.prototype.hasOwnProperty.call(classData, selectedCategory) ? `Kelas ${previewBook.class}` : getCurrentCategoryData()?.name}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{previewBook.subject}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{previewBook.description}</p>
                    <p className="text-xs text-gray-500">
                      {previewBook.pages} halaman • Tahun {previewBook.year}
                    </p>
                  </div>
                </div>

                <div className="w-full h-[420px] rounded-md overflow-hidden border">
                  {(() => {
                    const p = getDrivePreviewUrl(previewBook.downloadUrl)
                    return (
                      <iframe
                        title="Pratinjau Buku"
                        src={p ?? ""}
                        className="w-full h-full"
                        allow="autoplay"
                      />
                    )
                  })()}
                </div>
              </div>
            )}

            <DialogFooter className="flex gap-2">
              {previewBook?.downloadUrl && (
                <>
                  <a
                    href={getDrivePreviewUrl(previewBook.downloadUrl) ?? previewBook.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-9 rounded-md px-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Buka di Tab Baru
                  </a>
                  <a
                    href={previewBook.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-9 rounded-md px-3 text-sm font-medium border"
                  >
                    Download
                  </a>
                </>
              )}
              <Button variant="ghost" onClick={closePreview}>Tutup</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" aria-hidden="true" />
                <span className="font-bold text-lg">Perpustakaan Online</span>
              </div>
              <p className="text-gray-600 text-sm">Platform Perpustakaan digital untuk mengakses koleksi buku berkualitas secara gratis dan legal.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kelas Akademik</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Kelas X</li>
                <li>Kelas XI</li>
                <li>Kelas XII</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kategori Populer</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Cerpen & Sastra</li>
                <li>Pengembangan Diri</li>
                <li>Literasi Digital</li>
                <li>STEM Projects</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Fitur Khusus</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Komik Edukasi</li>
                <li>Tryout & Soal Latihan</li>
                <li>Keterampilan Hidup</li>
                <li>Bahasa Asing</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 mt-8 text-center text-sm text-gray-600">
            <p>{'© 2025 Perpustakaan Online Sekolah. KKP Plus Universitas Muhammadiyah Makassar.'}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
