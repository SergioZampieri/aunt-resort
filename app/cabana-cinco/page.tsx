import { CabinPage } from "../components/CabinPage";
import { getCabinBySlug } from "../data/cabins";

const cabin = getCabinBySlug("cabana-cinco")!;

export const metadata = {
  title: `${cabin.name} | Mirador de Animas`,
  description: cabin.shortDescription,
};

export default function CabanaCincoPage() {
  return <CabinPage cabin={cabin} />;
}
