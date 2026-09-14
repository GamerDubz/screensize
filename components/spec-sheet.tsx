type SpecRow = {
  label: string
  value: string
  unit?: string
}

export function SpecSheet({ rows, title }: { rows: SpecRow[]; title: string }) {
  return (
    <section aria-labelledby={`${title}-heading`} className="spec-block">
      <h2 id={`${title}-heading`} className="section-label">
        {title}
      </h2>
      <dl className="spec-list">
        {rows.map((row) => (
          <div className="spec-row" key={row.label}>
            <dt className="spec-label">{row.label}</dt>
            <span className="spec-leader" aria-hidden="true" />
            <dd className="spec-value">
              {row.value}
              {row.unit && <span className="spec-unit">{row.unit}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
