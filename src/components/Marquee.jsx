export default function Marquee({ items, reverse = false }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee${reverse ? " reverse" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div className="marquee-row" key={k}>
            {row.map((t, i) => (
              <span key={i}>
                {t}
                <b>✦</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
