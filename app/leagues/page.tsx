import { Metadata } from "next";
import Container from "../components/container/container";
import LeaguesContainer from "../components/leagues/container/leagues-container";

export const metadata: Metadata = {
  title: "كل الدوريات",
};

export default function LeaguesPage() {
  return (
    <div>
      <Container className="my-10 md:my-14">
        <main>
          <LeaguesContainer />
        </main>
      </Container>
    </div>
  );
}
