import { Header } from "../components/header";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Saham Akhirat</h1>
        <div className="prose max-w-none">
          <p>
            Saham Akhirat is a platform dedicated to showcasing and supporting
            open-source projects that aim to benefit the Muslim community and
            earn rewards in the afterlife (akhirah).
          </p>
          <p>Our mission is to:</p>
          <ul>
            <li>Encourage developers to contribute to meaningful projects</li>
            <li>Provide a space for collaboration on Islamic software</li>
            <li>
              Promote the development of tools that benefit Muslims worldwide
            </li>
            <li>
              Foster a community of developers working towards a common goal
            </li>
          </ul>
          <p>
            By participating in these projects, developers can gain valuable
            experience while also accumulating good deeds that may benefit them
            in the afterlife.
          </p>
          <p>
            Join us in this unique opportunity to combine your technical skills
            with spiritual growth!
          </p>

          {/* Moderation Note */}
          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-100 rounded-md">
            <h2 className="text-lg font-semibold text-yellow-700 p-0 m-0">
              Project Moderation Notice
            </h2>
            <p className="text-sm text-yellow-800 mt-2">
              To ensure the quality and integrity of projects listed on Saham
              Akhirat, all submissions will be moderated. This is to prevent
              unfiltered or inappropriate content from being displayed. Please
              allow some time for your project to be reviewed before it becomes
              publicly visible.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
