import Link from "next/link";

const IndexPage = (): JSX.Element => (
  <>
    <h1>Trashecker</h1>

    <Link href="/">Home</Link>
    <Link href="/trash-bin">Trash Bin</Link>
  </>
);

export default IndexPage;
