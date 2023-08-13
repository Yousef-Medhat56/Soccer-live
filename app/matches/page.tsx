import { Metadata } from "next";
import Container from "../components/container/container";
import DayMatchesConatainer from "../components/matches/container/day-matches-container";

export const metadata: Metadata = {
  title: "المباريات",
};

export default function MatchesPage() {
  return (
    <Container className="my-10 md:my-14">
      <main>
        <DayMatchesConatainer />
      </main>
    </Container>
  );
}
