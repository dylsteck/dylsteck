import Image from 'next/image';
import dsLogo from '../assets/DylanLogoTransparent.png';
import Link from 'next/link';

export default function DSName(){
    return(
    <div className="flex flex-row gap-1 items-center pt-[5vh]">
            <Image src={dsLogo} alt="DS Logo" className="w-9 h-10 pt-[0.5vh] items-center" />
            <p className="text-xl underline underline-offset-4">
                <Link href="https://hypersub.withfabric.xyz/collection/steck-studio-membership-14dtpljtcbda8">
                    Explore Membership
                </Link>
            </p>    
    </div>
    )
}