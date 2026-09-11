import { CabinPage } from "../components/CabinPage";
import { getCabinBySlug } from "../data/cabins";

const cabin = getCabinBySlug("cabana-uno")!;

export const metadata = {
  title: `${cabin.name} | Mirador de Animas`,
  description: cabin.shortDescription,
};

export default function CabanaUnoPage() {
  return <CabinPage cabin={cabin} />;
}
