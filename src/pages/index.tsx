import dynamic from "next/dynamic";

const MapWithoutSSR = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <MapWithoutSSR />
    </main>
  );
}
