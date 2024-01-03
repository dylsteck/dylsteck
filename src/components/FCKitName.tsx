import Image from 'next/image';
import farcasterKitLogo from '../../public/farcasterKitLogo.png'
import Link from 'next/link';

export default function FCKitName(){
    return(
    <div className="max-w-[50%] pt-[3.5%]">
        <Image src={farcasterKitLogo} alt="Farcaster Kit Logo" className="pt-[0.5vh] items-center" />
    </div>
    )
}