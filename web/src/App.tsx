import Header from './components/header';
import SummaryTable from './components/summary-table';

export default function App() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </section>
    </main>
  );
}
