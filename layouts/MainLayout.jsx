import Head from "next/head";
import Link from "next/link";

const MainLayout = (props) => {
  return (
    <>
      <Head>
        <title>BAUHAUS demo</title>
      </Head>



      <main>
        <div className="h-screenx py-20 xl:px-40 lg:px-0"> {props.children}</div>
      </main>

    </>
  );
};

export default MainLayout;
