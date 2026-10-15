export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Dados estruturados controlados por nós (sem input de utilizador).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
