import Image from "next/image";
import ItemHeader from "./ItemHeader";
import Nav from "./Nav";
import Layout from "./layout";
import { usePathname } from 'next/navigation'
import dsGreyLogo from '../../public/dsGreyLogo.png';

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

    return(
      <Layout>
        <Nav />
        <article className="text-black pt-8 pl-[8%] pr-[10%] pb-8 w-full whitespace-pre-wrap">
          <ItemHeader slug={pathname?.split('/')[2]} />
          <div className="fixed z-[-50] top-[15vh] max-w-[80%] pl-[5%] md:pl-[15%] lg:pl-[25%]">
            <Image alt="DS grey logo" src={dsGreyLogo} width={520} height={676} />
          </div>
          {children}
        </article>
      </Layout>
    );
  }