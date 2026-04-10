import CompanionCard from "@/components/CompanionCard"
import CTA from "@/components/CTA"
import CompanionList from "@/components/CompanionList"
import { recentSessions } from "@/constants"

const Page = () => {
  return (
    <main>
          <h1>Popular Companions</h1>
  <section className="home-section">
    <CompanionCard 
      id='123'
      name='Neura the Brainy Explorer'
      topic='Neural Network of the Brain'
      subject="Science"
      duration={45}
      color='#ffda6e'
    />
    <CompanionCard 
      id='456'
      name='Countsy the number wizard'
      topic='Derivativs an integrats'
      subject="Maths"
      duration={30}
      color='#e5d0ff'
    />
    <CompanionCard 
      id='789'
      name='Verba the vocabulary Builder'
      topic='Language'
      subject="English Litrature"
      duration={30}
      color='#BDE744'
    />
    </section>

    <section className="home-section">
      <CompanionList 
      title="Recent Sessions"
      companions={recentSessions}
      className='w-2/3 max-lg:w-full'
      />
      <CTA />
    </section>
    </main>

  )
}

export default Page