import type { Metadata } from "next";
import { LinkAnchor } from "../components/NavLinks";

// /ubicacion was folded into /contactos. A static export cannot redirect on
// the server, so this stub sends old links there from the browser.
const target = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/contactos/`;

export const metadata: Metadata = {
  title: "Ubicación | Mirador de Animas",
  robots: { index: false },
  other: { refresh: `0;url=${target}` },
};

export default function UbicacionPage() {
  return (
    <main style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
      <p>
        La ubicación ahora está en <LinkAnchor href="/contactos">Contacto</LinkAnchor>.
      </p>
    </main>
  );
}
