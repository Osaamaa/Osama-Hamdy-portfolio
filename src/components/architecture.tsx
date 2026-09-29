import { metro } from "@/content/portfolio";
import { Icon } from "@/components/ui";

export function Architecture() {
  return <figure className="architecture">
    <ol className="architecture-flow" aria-label="Product architecture, from rider to database">{metro.architecture.map((node, index) => <li key={node.name}><div className="architecture-node"><span className="architecture-icon"><Icon name={node.icon} /></span><strong>{node.name}</strong><span>{node.detail}</span></div>{index < metro.architecture.length - 1 && <Icon className="architecture-arrow" />}</li>)}</ol>
    <div className="supporting-services"><span className="eyebrow">Supporting services & local data</span><ul>{metro.services.map(service => <li key={service}>{service}</li>)}</ul></div>
    <figcaption>A high-level view of the supplied stack. Service connections and infrastructure details are intentionally not specified.</figcaption>
  </figure>;
}
