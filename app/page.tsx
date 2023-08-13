import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "المباريات",
};

export default function Home() {
  redirect("/matches");
}
