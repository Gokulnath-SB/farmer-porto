import Reveal from './Reveal';

export default function SectionHeading({ title, description, id }) {
  return (
    <Reveal className="section-head" id={id}>
      <div className="section-rule" aria-hidden="true" />
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-intro">{description}</p> : null}
    </Reveal>
  );
}
