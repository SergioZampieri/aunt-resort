import { CabinPage } from "../components/CabinPage";
import { getCabinBySlug } from "../data/cabins";

const cabin = getCabinBySlug("cabana-tres")!;

export const metadata = {
  title: `${cabin.name} | Mirador de Animas`,
  description: cabin.shortDescription,
};

export default function CabanaTresPage() {
  return <CabinPage cabin={cabin} />;
}
