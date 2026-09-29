import { ConfiguredLinks, Icon } from "@/components/ui";
import { person } from "@/content/portfolio";

export function Contact() {
  const hasLinks = person.links.some(link => link.href);
  return <section className="contact-section" id="contact" aria-labelledby="contact-title">
    <div className="container contact-inner" data-reveal>
      <div><p className="eyebrow"><span className="blue-dot" /> NEXT STOP</p><h2 id="contact-title">Let’s build<br />something <span>useful.</span></h2></div>
      <div className="contact-copy"><p>I’m interested in great products, thoughtful engineering, and opportunities where technology can make a real difference.</p><p className="contact-roles">Engineering · Product · Meaningful problems</p>
        {hasLinks ? <ConfiguredLinks links={person.links} /> : <div className="contact-placeholder"><Icon name="mail" /><div><strong>Contact details coming soon</strong><span>Social links, email, and CV will be added here.</span></div></div>}
      </div>
    </div>
  </section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><a href="/" className="footer-name">Osama Hamdy<span>Software Engineer · Product Builder</span></a><ConfiguredLinks links={person.links.filter(link => !link.download)} /><span className="copyright">© {new Date().getFullYear()} Osama Hamdy<span>Built with intention. From Egypt.</span></span></div></footer>;
}
