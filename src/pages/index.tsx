import Layout from "../components/layout";
import dsLogo from "../assets/DylanLogoTransparent.png";
import Image from "next/image";
import Link from "next/link";
import CortexName from "../components/CortexName";
import Projects from "../components/Projects";
import Featured from "../components/Featured";
import Experience from "../components/Experience";
import dsGreyLogo from '../../public/dsGreyLogo.png';
import Nav from "../components/Nav";

export default function Main() {
  return (
    <Layout>
      <div className="w-full h-screen flex justify-center items-start">
        <div className="z-50 absolute left-[50vw] right-[50vw] top-[50vh] bottom-[50vh]">
        </div>
        <div className="w-full">
          <Nav />
          <div className="fixed z-[-50] top-[15vh] pl-[5%] md:pl-[25%]">
            <Image alt="DS grey logo" src={dsGreyLogo} width={604.72} height={752} />
          </div>
          <Featured />
          {/* TODO: contact info under here, maybe resume or about somewhere in future */}
        </div> 
      </div>
    </Layout>
  )
}