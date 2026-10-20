// Splits text into words that slide up when their parent gets the "in" class.
// *star-wrapped* text is coloured with the accent. "\n" makes a line break.
export default function Words({ text, start = 0, step = 55 }) {
  let i = start;
  return text.split("\n").map((line, li, arr) => (
    <span className="line" key={li}>
      {line.split(/(\*[^*]+\*)/).filter(Boolean).map((part, pi) => {
        const accent = part.startsWith("*");
        const clean = accent ? part.slice(1, -1) : part;
        return clean.split(" ").filter(Boolean).map((w, wi) => (
          <span key={`${pi}-${wi}`}>
            <span className={`w${accent ? " accent" : ""}`}>
              <span style={{ transitionDelay: `${i++ * step}ms` }}>{w}</span>
            </span>{" "}
          </span>
        ));
      })}
      {li < arr.length - 1 && <br />}
    </span>
  ));
}
