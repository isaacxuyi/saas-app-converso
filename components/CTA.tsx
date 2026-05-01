import Link from "next/link"
import Image from "next/image"

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start Learning Your way</div>
      <h2 className="text-3xl font-bold">
        Build and Personalize Your Learning Companion
      </h2>
      <p>pick a name, subject, voice & personality - and start learning through voice conversations that feel natural, interactive and fun</p>
      <Image src="images/cta.svg" alt="cta" height={362} width={232} />
      <button className="btn-primary">
        <Image src="/icons/plus.svg" alt="plus" height={12} width={12} />
        <Link href="/companions/new">
        <p>Build a new companion</p>
        </Link>
      </button>
    </section>
  )
}

export default CTA
 