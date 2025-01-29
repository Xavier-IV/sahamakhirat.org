export const projects = [
  {
    id: "1",
    title: "Islamic Prayer Times API",
    description: "An open-source API for accurate prayer times worldwide",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Prayer+Times+API",
    maintainers: Array(3)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(20)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/prayer-times-api",
    readme: `# Islamic Prayer Times API\n\nThis project aims to provide accurate prayer times for Muslims around the world...`,
  },
  {
    id: "2",
    title: "Quran Memorization App",
    description: "A mobile app to help Muslims memorize the Quran with spaced repetition",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Quran+Memorization",
    maintainers: Array(2)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(15)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/quran-memorization",
    readme: `# Quran Memorization App\n\nOur app uses spaced repetition techniques to help Muslims memorize the Quran efficiently...`,
  },
  {
    id: "3",
    title: "Halal Food Finder",
    description: "A web app to locate halal restaurants and food products nearby",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Halal+Food+Finder",
    maintainers: Array(4)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(10)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/halal-food-finder",
    readme: `# Halal Food Finder\n\nFind halal restaurants and food products near you...`,
  },
  {
    id: "4",
    title: "Islamic Finance Calculator",
    description: "A tool for calculating zakat, inheritance, and Islamic financing options",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Finance+Calculator",
    maintainers: Array(2)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(8)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/islamic-finance-calculator",
    readme: `# Islamic Finance Calculator\n\nCalculate zakat, inheritance, and more...`,
  },
  {
    id: "5",
    title: "Hadith Database",
    description: "A comprehensive, searchable database of authenticated hadiths",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Hadith+Database",
    maintainers: Array(5)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(25)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/hadith-database",
    readme: `# Hadith Database\n\nA searchable database of authenticated hadiths...`,
  },
  {
    id: "6",
    title: "Muslim Community Forum",
    description: "An open-source forum software tailored for Muslim communities",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Community+Forum",
    maintainers: Array(3)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(12)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/muslim-community-forum",
    readme: `# Muslim Community Forum\n\nAn open-source forum for Muslim communities...`,
  },
  {
    id: "7",
    title: "Islamic Calendar Converter",
    description: "A library to convert between Gregorian and Hijri calendars",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Calendar+Converter",
    maintainers: Array(2)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(6)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/islamic-calendar-converter",
    readme: `# Islamic Calendar Converter\n\nConvert between Gregorian and Hijri calendars...`,
  },
  {
    id: "8",
    title: "Charity Donation Platform",
    description: "A secure platform for managing and distributing charitable donations",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Charity+Platform",
    maintainers: Array(4)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(18)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/charity-donation-platform",
    readme: `# Charity Donation Platform\n\nA secure platform for managing and distributing charitable donations...`,
  },
  {
    id: "9",
    title: "Islamic Art Generator",
    description: "An AI-powered tool for generating Islamic geometric patterns",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Art+Generator",
    maintainers: Array(2)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(9)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/islamic-art-generator",
    readme: `# Islamic Art Generator\n\nGenerate Islamic geometric patterns using AI...`,
  },
  {
    id: "10",
    title: "Muslim Travel Companion",
    description: "A mobile app for Muslim travelers with prayer times, qibla direction, and halal food recommendations",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Travel+Companion",
    maintainers: Array(3)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(14)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/muslim-travel-companion",
    readme: `# Muslim Travel Companion\n\nA comprehensive app for Muslim travelers...`,
  },
  {
    id: "11",
    title: "Islamic Education Platform",
    description: "An online learning platform for Islamic studies and Arabic language",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Education+Platform",
    maintainers: Array(5)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(30)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/islamic-education-platform",
    readme: `# Islamic Education Platform\n\nLearn Islamic studies and Arabic language online...`,
  },
  {
    id: "12",
    title: "Mosque Finder",
    description: "A web and mobile app to locate nearby mosques and prayer spaces",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Mosque+Finder",
    maintainers: Array(2)
      .fill(null)
      .map((_, i) => ({
        name: `Maintainer ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
      })),
    contributors: Array(11)
      .fill(null)
      .map((_, i) => ({
        name: `Contributor ${i + 1}`,
        avatarUrl: `/placeholder.svg?height=32&width=32&text=C${i + 1}`,
      })),
    website: "https://example.com/mosque-finder",
    readme: `# Mosque Finder\n\nLocate nearby mosques and prayer spaces...`,
  },
]

// TODO: Implement Supabase pagination
export async function getProjects(page: number, limit: number) {
  const start = (page - 1) * limit
  const end = start + limit
  return {
    data: projects.slice(start, end),
    count: projects.length,
    page,
    limit,
  }
}

// TODO: Replace with Supabase query
export async function getUserProjects(userId: string) {
  // For now, return a subset of projects as if they belong to the user
  return projects.slice(0, 5)
}

