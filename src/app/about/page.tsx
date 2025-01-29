import { Header } from "../components/header"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Saham Akhirat</h1>
        <div className="prose max-w-none">
          <p>
            Saham Akhirat is a platform dedicated to showcasing and supporting open-source projects that aim to benefit
            the Muslim community and earn rewards in the afterlife (akhirah).
          </p>
          <p>Our mission is to:</p>
          <ul>
            <li>Encourage developers to contribute to meaningful projects</li>
            <li>Provide a space for collaboration on Islamic software</li>
            <li>Promote the development of tools that benefit Muslims worldwide</li>
            <li>Foster a community of developers working towards a common goal</li>
          </ul>
          <p>
            By participating in these projects, developers can gain valuable experience while also accumulating good
            deeds that may benefit them in the afterlife.
          </p>
          <p>Join us in this unique opportunity to combine your technical skills with spiritual growth!</p>
        </div>
      </main>
    </>
  )
}

