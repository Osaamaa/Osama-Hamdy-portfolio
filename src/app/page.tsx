import type { Metadata } from "next";
import { ActionLink, ConfiguredLinks, Icon, JsonLd, Screenshot, SectionHeading } from "@/components/ui";
import { TransitArt } from "@/components/transit-art";
import { Contact } from "@/components/contact";
import { books, journey, metro, person, principles, site, skills } from "@/content/portfolio";

export const metadata: Metadata = { ...(site.url ? { alternates: { canonical: site.url } } : {}) };

export default function HomePage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: person.name, jobTitle: person.role, description: site.description, homeLocation: { "@type": "Country", name: "Egypt" }, alumniOf: { "@type": "CollegeOrUniversity", name: "Cairo University" }, ...(site.url ? { url: site.url } : {}) }} />
    <main id="main">
      <section id="home" className="container hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="blue-dot" /> SOFTWARE ENGINEER & PRODUCT BUILDER</p><h1 id="hero-title">I build products<br />people <span>actually<br className="hero-break" /> use.</span></h1><p className="hero-description">{person.introduction}</p><div className="hero-actions"><ActionLink href="#work">View my work</ActionLink><ActionLink href="#contact" variant="text" icon="northeast">Let’s connect</ActionLink></div><ConfiguredLinks links={person.links} /><div className="hero-location"><Icon name="globe" /><span>Based in Egypt. Building for real life.</span></div></div>
        <TransitArt />
      </section>
      <section className="container proof-strip" aria-label="Evidence from Egy Metro Guide">
        <div className="proof-primary"><strong>{metro.downloads}</strong><div><span>Downloads</span><span>of Egy Metro Guide</span></div></div>
        <div className="proof-platforms"><span className="platform-symbols" aria-hidden="true"><Icon name="phone" /><Icon name="globe" /></span><div><strong>Android & iOS</strong><span>Published on Google Play & the App Store</span></div></div>
        <div className="proof-note"><span className="blue-dot" /><p>Built from an idea.<br /><strong>Made for everyday journeys.</strong></p></div>
      </section>

      <section id="work" className="container section work-section">
        <SectionHeading number="01" label="SELECTED WORK" title={<>Real problem.<br />Real product. Real people.</>} description="The best introduction to my work is something you can actually use." />
        <article className="featured-project" data-reveal>
          <div className="featured-main"><div className="featured-copy"><span className="project-status"><span className="blue-dot" /> SHIPPED & MAINTAINED</span><h3>Egy Metro<br /> Guide<span className="cobalt">.</span></h3><p>{metro.summary}</p><ul className="tags" aria-label="Core technology">{metro.stack.map(item => <li key={item}>{item}</li>)}</ul><ActionLink href={metro.route}>Explore the case study</ActionLink></div><div className="featured-visual"><span className="cairo-word" aria-hidden="true">Cairo.</span><div className="feature-orbit orbit-one" /><div className="feature-orbit orbit-two" /><Screenshot asset={metro.screenshots[0]} featured /><span className="featured-visual-label">EVERYDAY JOURNEYS. A LITTLE SIMPLER.</span></div></div>
          <div className="featured-meta"><div><span>MY ROLE</span><strong>Independent product builder</strong></div><div><span>THE WORK</span><strong>Mobile · Backend · Product</strong></div><div><span>THE REACH</span><strong>{metro.downloads} downloads<Icon name="northeast" /></strong></div></div>
        </article>
      </section>

      <section id="about" className="container section about-section">
        <SectionHeading number="02" label="A LITTLE ABOUT ME" title={<>An engineer’s mind.<br />A builder’s instinct.</>} />
        <div className="about-grid" data-reveal><div className="about-aside"><div className="about-mark" aria-hidden="true"><span>o</span><span>h</span><span className="cobalt">.</span></div><p>Curiosity is the starting point.<br />Building is how I follow it.</p></div><div className="about-body"><p className="large-copy">I’m Osama, a software engineer who cares about <span className="ink">what happens on the other side of the screen.</span></p><p>My strongest experience comes from building and maintaining Egy Metro Guide—a consumer app that grew from an idea into a product with more than 250,000 downloads. It brought mobile development, backend systems, user experience, and the responsibility of shipping together.</p><p>That experience also pulled me toward product management. I want to understand which problems deserve attention, what makes an experience useful, and how technical decisions connect to the bigger picture.</p><div className="about-facts"><div><span className="eyebrow">EXPERIENCE</span><strong>Independent Product Builder</strong><span>From idea through implementation and launch</span></div><div><span className="eyebrow">EDUCATION · {person.education.year}</span><strong>{person.education.university}</strong><span>{person.education.faculty}</span></div></div></div></div>
      </section>

      <section className="thinking-section" aria-labelledby="thinking-title"><div className="container">
        <div className="thinking-grid" data-reveal><div><p className="eyebrow"><span className="section-number">03</span> THE PRODUCT SIDE</p><h2 id="thinking-title">I don’t just<br />build features.<br /><span>I think about<br />the product.</span></h2><p className="thinking-intro">Shipping made me curious about what comes before a feature—and what happens after it reaches someone’s phone.</p></div><div className="product-questions"><article><span>01 / UNDERSTAND</span><h3>What problem is worth solving?</h3><p>Product discovery, user research, and UX help me think beyond a feature request to the need behind it.</p></article><article><span>02 / LEARN</span><h3>How do we know it’s useful?</h3><p>I’m exploring behavior, retention, acquisition, KPIs, and experimentation to understand how people find value.</p></article><article><span>03 / DECIDE</span><h3>What should we build next?</h3><p>Strategy, prioritization, monetization, and business models connect the roadmap to a product’s purpose.</p></article></div></div>
        <div className="principles" data-reveal>{principles.map((item, index) => <div key={item.title}><span>0{index + 1}</span><h3>{item.title}<span className="cobalt">.</span></h3><p>{item.text}</p></div>)}</div>
        <details className="reading-list"><summary><span><span className="eyebrow">ON MY READING SHELF</span><span>Five books shaping how I think</span></span><Icon name="plus" /></summary><ul>{books.map(book => <li key={book.title}><strong>{book.title}</strong><span>{book.author}</span></li>)}</ul></details>
      </div></section>

      <section id="skills" className="container section skills-section">
        <SectionHeading number="04" label="TOOLS & PERSPECTIVES" title={<>A practical toolkit.<br />An expanding perspective.</>} description="The tools I’ve built with, the practices I’m learning, and the ideas I’m exploring next." />
        <div className="skills-list">{skills.map((group, index) => <div className="skill-row" key={group.category} data-reveal><span className="skill-index">0{index + 1}</span><div className="skill-category"><h3>{group.category}</h3><span>{group.context}</span></div><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
        <aside className="ai-note" data-reveal><span className="ai-symbol"><Icon name="spark" /></span><div><p className="eyebrow">CURRENT CURIOSITY</p><h3>How does AI change what we can build?</h3><p>I’m exploring LLMs, RAG, vector databases, and agents—with tools and models such as OpenCode, DeepSeek, and OpenAI. The interest is practical: how they can help turn a useful idea into a better product.</p></div><span className="ai-note-label">EXPLORING,<br />ALWAYS.</span></aside>
      </section>

      <section id="journey" className="container section journey-section">
        <SectionHeading number="05" label="THE JOURNEY SO FAR" title={<>A little further<br />with every iteration.</>} description="An evolving direction, from writing the code to understanding the whole product." />
        <ol className="journey-timeline" aria-label="Development journey">{journey.map((step, index) => <li key={step.label} data-reveal><span className={`journey-node ${index === journey.length - 1 ? "current" : ""}`} aria-hidden="true" /><span className="eyebrow">{step.label}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        <p className="journey-note"><Icon name="route" /> The direction: become a stronger product-minded engineer, one useful thing at a time.</p>
      </section>
      <Contact />
    </main>
  </>;
}
