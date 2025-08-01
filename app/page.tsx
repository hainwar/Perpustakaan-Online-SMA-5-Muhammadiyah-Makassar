"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Download,
  BookOpen,
  Users,
  GraduationCap,
  ArrowLeft,
  ChevronRight,
  Heart,
  Lightbulb,
  Shield,
  FileText,
  Smile,
  Globe,
  Church,
  Wrench,
  Cpu,
  Target,
  Calendar,
} from "lucide-react"
import Image from "next/image"

// Data struktur kelas dan mata pelajaran dengan semester
const classData = {
  X: {
    name: "Kelas X",
    semesters: {
      ganjil: {
        name: "Semester Ganjil",
        subjects: [
          "Matematika Wajib",
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
      genap: {
        name: "Semester Genap",
        subjects: [
          "Matematika Wajib",
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
    },
  },
  XI: {
    name: "Kelas XI",
    semesters: {
      ganjil: {
        name: "Semester Ganjil",
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
      genap: {
        name: "Semester Genap",
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
    },
  },
  XII: {
    name: "Kelas XII",
    semesters: {
      ganjil: {
        name: "Semester Ganjil",
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
      genap: {
        name: "Semester Genap",
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
    },
  },
}

// Data kategori tambahan (tetap sama)
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
    description: "Buku-buku tentang motivasi, manajemen waktu, public speaking, leadership, dan keterampilan sosial",
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
    description: "Contoh karya tulis ilmiah, skripsi, laporan praktikum, dan panduan membuat makalah",
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
    description: "Komik pembelajaran sains, sejarah, atau nilai moral yang disajikan dengan gaya ringan",
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
    description: "Buku untuk belajar bahasa asing selain Inggris (Arab, Jepang, Mandarin, dll.)",
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
    description: "Buku pelajaran agama, tafsir, fiqih, dan nilai-nilai moral lintas agama",
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
    description: "Panduan memasak, pertolongan pertama, keuangan pribadi, dan soft skill lainnya",
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
    description: "Buku eksperimen sains, coding, robotika, dan teknologi kreatif",
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
    description: "Buku-buku yang berisi kumpulan soal ujian, tryout UTBK, dan pembahasan soal",
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
}

// Mock data untuk buku-buku dengan semester
const books = [
  // Buku Kelas X Semester Ganjil
  {
    id: 1,
    title: "Matematika Wajib Kelas X Semester 1",
    author: "Tim Penulis Kemendikbud",
    subject: "Matematika Wajib",
    class: "X",
    semester: "ganjil",
    description: "Buku teks matematika wajib untuk siswa SMA kelas X semester ganjil",
    cover: "/placeholder.svg?height=200&width=150",
    downloadUrl: "https://drive.google.com/file/d/example1",
    pages: 248,
    year: 2023,
  },
  {
    id: 2,
    title: "Matematika Wajib Kelas X Semester 2",
    author: "Tim Penulis Kemendikbud",
    subject: "Matematika Wajib",
    class: "X",
    semester: "genap",
    description: "Buku teks matematika wajib untuk siswa SMA kelas X semester genap",
    cover: "/placeholder.svg?height=200&width=150",
    downloadUrl: "https://drive.google.com/file/d/example2",
    pages: 264,
    year: 2023,
  },
  {
    id: 3,
    title: "Fisika Kelas X Semester 1",
    author: "Dr. Budi Fisika",
    subject: "Fisika",
    class: "X",
    semester: "ganjil",
    description: "Konsep dasar fisika untuk siswa SMA kelas X semester ganjil",
    cover: "/placeholder.svg?height=200&width=150",
    downloadUrl: "https://drive.google.com/file/d/example3",
    pages: 456,
    year: 2023,
  },
  {
    id: 4,
    title: "Fisika Kelas X Semester 2",
    author: "Dr. Budi Fisika",
    subject: "Fisika",
    class: "X",
    semester: "genap",
    description: "Lanjutan konsep fisika untuk siswa SMA kelas X semester genap",
    cover: "/placeholder.svg?height=200&width=150",
    downloadUrl: "https://drive.google.com/file/d/example4",
    pages: 432,
    year: 2023,
  },
  // Buku Kelas XI
  {
    id: 5,
    title: "Matematika Peminatan Kelas XI Semester 1",
    author: "Prof. Ahmad Matematika",
    subject: "Matematika Peminatan",
    class: "XI",
    semester: "ganjil",
    description: "Matematika peminatan untuk siswa SMA kelas XI semester ganjil",
    cover: "/placeholder.svg?height=200&width=150",
    downloadUrl: "https://drive.google.com/file/d/example5",
    pages: 384,
    year: 2023,
  },
  {
    id: 6,
    title: "Kimia Kelas XI Semester 2",
    author: "Dr. Maria Kimia",
    subject: "Kimia",
    class: "XI",
    semester: "genap",
    description: "Studi mendalam tentang kimia untuk kelas XI semester genap",
    cover: "/placeholder.svg?height=200&width=150",
    downloadUrl: "https://drive.google.com/file/d/example6",
    pages: 420,
    year: 2023,
  },
  // Buku Kelas XII
  {
    id: 7,
    title: "Persiapan UTBK Matematika Saintek",
    author: "Tim UTBK Indonesia",
    subject: "Persiapan UTBK",
    class: "XII",
    semester: "ganjil",
    description: "Persiapan lengkap UTBK Matematika Saintek untuk kelas XII",
    cover: "/placeholder.svg?height=200&width=150",
    downloadUrl: "https://drive.google.com/file/d/example7",
    pages: 512,
    year: 2023,
  },
  // Buku Kategori Tambahan (tetap sama)
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

type ViewType = "categories" | "semesters" | "subjects" | "books"

export default function PerpustakaanOnline() {
  const [currentView, setCurrentView] = useState<ViewType>("categories")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")

  // Auto scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentView, selectedCategory, selectedSemester, selectedSubject])

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())

      // Untuk kategori kelas (X, XI, XII)
      if (classData[selectedCategory as keyof typeof classData]) {
        const matchesClass = book.class === selectedCategory
        const matchesSemester = book.semester === selectedSemester
        const matchesSubject = book.subject === selectedSubject
        return matchesSearch && matchesClass && matchesSemester && matchesSubject
      }

      // Untuk kategori tambahan
      const matchesCategory = book.class === selectedCategory
      const matchesSubject = book.subject === selectedSubject
      return matchesSearch && matchesCategory && matchesSubject
    })
  }, [searchTerm, selectedCategory, selectedSemester, selectedSubject])

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey)
    // Jika kategori adalah kelas (X, XI, XII), tampilkan semester
    if (classData[categoryKey as keyof typeof classData]) {
      setCurrentView("semesters")
    } else {
      // Jika kategori tambahan, langsung ke subjects
      setCurrentView("subjects")
    }
  }

  const handleSemesterSelect = (semesterKey: string) => {
    setSelectedSemester(semesterKey)
    setCurrentView("subjects")
  }

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject)
    setCurrentView("books")
  }

  const handleBackToCategories = () => {
    setCurrentView("categories")
    setSelectedCategory("")
    setSelectedSemester("")
    setSelectedSubject("")
    setSearchTerm("")
  }

  const handleBackToSemesters = () => {
    setCurrentView("semesters")
    setSelectedSemester("")
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
      if (classData[selectedCategory as keyof typeof classData]) {
        breadcrumbs.push(`Kelas ${selectedCategory}`)
      } else {
        breadcrumbs.push(
          additionalCategories[selectedCategory as keyof typeof additionalCategories]?.name || selectedCategory,
        )
      }
    }
    if (selectedSemester) {
      const semesterName = selectedSemester === "ganjil" ? "Semester Ganjil" : "Semester Genap"
      breadcrumbs.push(semesterName)
    }
    if (selectedSubject) {
      breadcrumbs.push(selectedSubject)
    }
    return breadcrumbs
  }

  const getCurrentCategoryData = () => {
    if (classData[selectedCategory as keyof typeof classData]) {
      return classData[selectedCategory as keyof typeof classData]
    }
    return additionalCategories[selectedCategory as keyof typeof additionalCategories]
  }

  const getCurrentSemesterData = () => {
    if (classData[selectedCategory as keyof typeof classData] && selectedSemester) {
      return classData[selectedCategory as keyof typeof classData].semesters[
        selectedSemester as keyof typeof classData.X.semesters
      ]
    }
    return null
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

      <main
        key={`${currentView}-${selectedCategory}-${selectedSemester}-${selectedSubject}`}
        className="container mx-auto px-4 py-4 sm:py-6 lg:py-8"
      >
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          {getBreadcrumb().map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
              <span className={index === getBreadcrumb().length - 1 ? "font-semibold text-gray-900" : ""}>{crumb}</span>
            </div>
          ))}
        </div>

        {/* Categories View */}
        {currentView === "categories" && (
          <div>
            {/* Modern Hero Section */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Platform Pembelajaran Digital Terlengkap
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
                Jelajahi{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Koleksi
                </span>{" "}
                Lengkap
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                Dari buku pelajaran hingga pengembangan diri, dari literasi digital hingga karya sastra. Temukan ribuan
                buku digital berkualitas untuk mendukung perjalanan belajar Anda.
              </p>
            </div>

            {/* Modern Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto px-4">
              <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">200+</div>
                <div className="text-sm sm:text-base text-gray-600">Buku Digital</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">13</div>
                <div className="text-sm sm:text-base text-gray-600">Kategori</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">Tersedia</div>
                <div className="text-sm sm:text-base text-gray-600">Pilihan Mata Pelajaran</div>
              </div>
            </div>

            {/* Section: Kelas Akademik */}
            <div className="mb-12 lg:mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Kelas Akademik</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Buku pelajaran sesuai kurikulum nasional untuk setiap jenjang kelas dengan pembagian semester
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
                {Object.entries(classData).map(([classKey, classInfo], index) => {
                  const gradients = [
                    "from-blue-500 to-blue-600",
                    "from-purple-500 to-purple-600",
                    "from-indigo-500 to-indigo-600",
                  ]
                  const bgGradients = [
                    "from-blue-50 to-blue-100",
                    "from-purple-50 to-purple-100",
                    "from-indigo-50 to-indigo-100",
                  ]

                  return (
                    <Card
                      key={classKey}
                      className="group hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1 sm:hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden relative"
                      onClick={() => handleCategorySelect(classKey)}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${bgGradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      <CardHeader className="text-center p-4 sm:p-6 relative z-10">
                        <div
                          className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${gradients[index]} rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <span className="text-2xl sm:text-3xl font-bold text-white">{classKey}</span>
                        </div>
                        <CardTitle className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-gray-900 transition-colors">
                          {classInfo.name}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors">
                          2 Semester • {classInfo.semesters.ganjil.subjects.length} Mata Pelajaran
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="text-center pb-4 sm:pb-6 px-4 sm:px-6 relative z-10">
                        <Button
                          className={`w-full bg-gradient-to-r ${gradients[index]} hover:shadow-lg transition-all duration-300 text-white border-0 py-2 sm:py-3 text-sm sm:text-base font-semibold group-hover:scale-105`}
                        >
                          Pilih Semester
                          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Section: Kategori Khusus */}
            <div className="mb-12 lg:mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Kategori Khusus</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Koleksi buku untuk pengembangan diri, literasi digital, dan keterampilan hidup
                </p>
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
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${categoryInfo.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      <CardHeader className="text-center p-4 sm:p-6 relative z-10">
                        <div
                          className={`w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-r ${categoryInfo.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="h-8 w-8 sm:h-9 sm:w-9 text-white" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl font-bold mb-2 group-hover:text-gray-900 transition-colors line-clamp-2">
                          {categoryInfo.name}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors line-clamp-3">
                          {categoryInfo.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="text-center pb-4 sm:pb-6 px-4 sm:px-6 relative z-10">
                        <div className="mb-3 text-xs sm:text-sm text-gray-500">
                          {categoryInfo.subjects.length} topik tersedia
                        </div>
                        <Button
                          className={`w-full bg-gradient-to-r ${categoryInfo.gradient} hover:shadow-lg transition-all duration-300 text-white border-0 py-2 text-sm font-semibold group-hover:scale-105`}
                        >
                          Jelajahi
                          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Modern CTA Section */}
            <div className="text-center mt-8 sm:mt-12 lg:mt-16 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl text-white max-w-4xl mx-auto">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">
                Siap Mengembangkan Potensi Diri?
              </h3>
              <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
                Dengan 13 kategori lengkap dan koleksi buku berkualitas, wujudkan impian belajar tanpa batas
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
                <div className="flex items-center space-x-2 text-blue-100 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>100% Gratis</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-100 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Akses Mudah</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-100 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Update Berkala</span>
                </div>
              </div>
            </div>

            {/* Kepala Perpustakaan Section - Hanya di halaman utama */}
            <section className="bg-gradient-to-r from-slate-50 to-gray-100 py-12 lg:py-16 mt-16 rounded-2xl">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8 lg:mb-12">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      Sambutan Kepala Perpustakaan
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                  </div>

                  <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Foto Kepala Perpustakaan */}
                      <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-blue-100 to-indigo-200 overflow-hidden">
                        <Image
                          src="/kepala-perpus.jpeg"
                          alt="Kepala Perpustakaan SMA 5 Muhammadiyah Makassar"
                          fill
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        {/* Decorative elements */}
                        <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 rounded-full"></div>
                        <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/30 rounded-full"></div>
                        <div className="absolute top-1/2 right-12 w-8 h-8 bg-white/25 rounded-full"></div>
                      </div>

                      {/* Teks Sambutan */}
                      <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                          <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                            Dr. Musrial Arif Abadi, S.Kom., M.T
                          </h4>
                          <p className="text-blue-600 font-semibold text-sm sm:text-base lg:text-lg mb-4">
                            Kepala Perpustakaan SMA 5 Muhammadiyah Makassar
                          </p>
                          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mb-6"></div>
                        </div>

                        <blockquote className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 italic">
                          "Selamat datang di Perpustakaan Digital SMA 5 Muhammadiyah Makassar. Kami berkomitmen untuk
                          menyediakan akses literasi yang mudah dan berkualitas bagi seluruh siswa dan guru. Dengan
                          koleksi digital yang terus berkembang, mari kita wujudkan generasi yang cerdas, berkarakter,
                          dan siap menghadapi tantangan masa depan."
                        </blockquote>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center space-x-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quote highlight */}
                  <div className="text-center mt-8 lg:mt-12">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white shadow-lg">
                      <BookOpen className="h-5 w-5 mr-2" />
                      <span className="font-semibold text-sm sm:text-base">
                        "Membaca adalah Jendela Dunia, Digital adalah Masa Depan"
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Semesters View */}
        {currentView === "semesters" && selectedCategory && classData[selectedCategory as keyof typeof classData] && (
          <div>
            <div className="flex items-center mb-4 sm:mb-6 px-4">
              <Button variant="ghost" onClick={handleBackToCategories} className="text-sm sm:text-base">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Kategori
              </Button>
            </div>

            <div className="text-center mb-6 sm:mb-8 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Pilih Semester - Kelas {selectedCategory}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Pilih semester untuk mengakses buku pelajaran yang sesuai dengan periode pembelajaran
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
              {Object.entries(classData[selectedCategory as keyof typeof classData].semesters).map(
                ([semesterKey, semesterInfo], index) => {
                  const gradients = ["from-emerald-500 to-green-600", "from-orange-500 to-red-600"]
                  const bgGradients = ["from-emerald-50 to-green-100", "from-orange-50 to-red-100"]
                  const icons = [Calendar, Calendar]
                  const IconComponent = icons[index]

                  return (
                    <Card
                      key={semesterKey}
                      className="group hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1 sm:hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden relative"
                      onClick={() => handleSemesterSelect(semesterKey)}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${bgGradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      <CardHeader className="text-center p-6 sm:p-8 relative z-10">
                        <div
                          className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r ${gradients[index]} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-gray-900 transition-colors">
                          {semesterInfo.name}
                        </CardTitle>
                        <CardDescription className="text-base sm:text-lg text-gray-600 group-hover:text-gray-700 transition-colors">
                          {semesterInfo.subjects.length} Mata Pelajaran
                        </CardDescription>

                        {/* Subject Preview */}
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {semesterInfo.subjects.slice(0, 4).map((subject) => (
                            <span
                              key={subject}
                              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                            >
                              {subject}
                            </span>
                          ))}
                          {semesterInfo.subjects.length > 4 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                              +{semesterInfo.subjects.length - 4} lainnya
                            </span>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="text-center pb-6 sm:pb-8 px-6 sm:px-8 relative z-10">
                        <Button
                          className={`w-full bg-gradient-to-r ${gradients[index]} hover:shadow-lg transition-all duration-300 text-white border-0 py-3 text-base sm:text-lg font-semibold group-hover:scale-105`}
                          size="lg"
                        >
                          Lihat Mata Pelajaran
                          <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        {/* Book Count */}
                        <div className="mt-4 text-sm text-gray-500">
                          {
                            books.filter((book) => book.class === selectedCategory && book.semester === semesterKey)
                              .length
                          }{" "}
                          buku tersedia
                        </div>
                      </CardContent>
                    </Card>
                  )
                },
              )}
            </div>
          </div>
        )}

        {/* Subjects View */}
        {currentView === "subjects" && selectedCategory && (
          <div>
            <div className="flex items-center mb-4 sm:mb-6 px-4">
              <Button
                variant="ghost"
                onClick={
                  classData[selectedCategory as keyof typeof classData] ? handleBackToSemesters : handleBackToCategories
                }
                className="text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {classData[selectedCategory as keyof typeof classData] ? "Kembali ke Semester" : "Kembali ke Kategori"}
              </Button>
            </div>

            <div className="text-center mb-6 sm:mb-8 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                {classData[selectedCategory as keyof typeof classData]
                  ? `Mata Pelajaran Kelas ${selectedCategory} - ${getCurrentSemesterData()?.name}`
                  : getCurrentCategoryData()?.name}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                {getCurrentCategoryData()?.description ||
                  "Pilih mata pelajaran untuk melihat koleksi buku yang tersedia"}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 px-4">
              {(getCurrentSemesterData()?.subjects || getCurrentCategoryData()?.subjects || []).map(
                (subject: string) => {
                  const bookCount = books.filter((book) => {
                    if (classData[selectedCategory as keyof typeof classData]) {
                      return (
                        book.class === selectedCategory &&
                        book.semester === selectedSemester &&
                        book.subject === subject
                      )
                    }
                    return book.class === selectedCategory && book.subject === subject
                  }).length

                  return (
                    <Card
                      key={subject}
                      className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                      onClick={() => handleSubjectSelect(subject)}
                    >
                      <CardHeader className="text-center p-3 sm:p-4 lg:p-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                          <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600" />
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
                },
              )}
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
                {classData[selectedCategory as keyof typeof classData] && selectedSemester && (
                  <span className="text-lg sm:text-xl text-gray-600 block mt-2">
                    Kelas {selectedCategory} - {selectedSemester === "ganjil" ? "Semester Ganjil" : "Semester Genap"}
                  </span>
                )}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Koleksi buku digital untuk mata pelajaran {selectedSubject}
              </p>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 mx-4">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari judul buku atau penulis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-4 sm:mb-6 px-4">
              <p className="text-sm sm:text-base text-gray-600">
                Menampilkan {filteredBooks.length} buku untuk {selectedSubject}
                {classData[selectedCategory as keyof typeof classData] && selectedSemester && (
                  <span> - {selectedSemester === "ganjil" ? "Semester Ganjil" : "Semester Genap"}</span>
                )}
              </p>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="p-3 sm:p-4">
                    <div className="aspect-[3/4] relative mb-3 sm:mb-4">
                      <Image
                        src={book.cover || "/placeholder.svg"}
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
                        {classData[selectedCategory as keyof typeof classData] ? (
                          <>
                            <Badge variant="secondary" className="text-xs">
                              Kelas {book.class}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {book.semester === "ganjil" ? "Sem. Ganjil" : "Sem. Genap"}
                            </Badge>
                          </>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            {getCurrentCategoryData()?.name}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {book.subject}
                        </Badge>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{book.description}</p>

                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{book.pages} halaman</span>
                        <span>Tahun {book.year}</span>
                      </div>

                      <Button
                        onClick={() => handleDownload(book.downloadUrl, book.title)}
                        className="w-full text-xs sm:text-sm"
                        size="sm"
                      >
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Unduh Buku
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredBooks.length === 0 && (
              <div className="text-center py-8 sm:py-12 px-4">
                <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Tidak ada buku ditemukan</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Belum ada buku untuk {selectedSubject} atau coba ubah kata kunci pencarian
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-lg">Perpustakaan Online</span>
              </div>
              <p className="text-gray-600 text-sm">
                Platform Perpustakaan digital untuk mengakses koleksi buku berkualitas secara gratis dan legal.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kelas Akademik</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Kelas X (2 Semester)</li>
                <li>Kelas XI (2 Semester)</li>
                <li>Kelas XII (2 Semester)</li>
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
            <p>&copy; 2025 Perpustakaan Online Sekolah. KKP Plus Universitas Muhammadiyah Makassar.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
