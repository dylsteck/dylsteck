import Image from 'next/image';
import Link from 'next/link';
import dsLogo from '../assets/DylanLogoTransparent.png';

export default function Nav(){
    return(
            <div className="flex flex-row justify-between gap-3 items-center pt-[5vh]">
                <Link href="/">
                    <div className="flex flex-row items-center justify-center z-50 pl-[7.5vw]">
                        <Image src={dsLogo} alt="DS logo" width={50} height={50} />
                        <p className="pl-3 text-xl text-black/70">Dylan Steck</p>
                    </div>
                </Link>
                <div className="pl-[2.5vw] pr-[10vw] flex flex-row gap-4 items-center">
                    <p>
                        <Link href="/">
                            Home
                        </Link>
                    </p>
                    <p>
                        <Link href="https://nf.td/dylan">
                            Links
                        </Link>
                    </p>
                    {/* <p>
                        <Link href="/feed">
                            Feed
                        </Link>
                    </p> */}
                    {/* <p>
                        <Link href="https://hypersub.withfabric.xyz/collection/steck-studio-membership-14dtpljtcbda8">
                            Membership
                        </Link>
                    </p> */}
                </div>
            </div>
    )
}