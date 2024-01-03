import Image from 'next/image';
import cortexLogo from '../../public/cortexLogo.png';
import Link from 'next/link';

export default function CortexName(){
    return(
    <div className="flex flex-row gap-1 items-center pt-[5vh]">
            <Image src={cortexLogo} alt="Cortex Logo" className="w-5 h-5 pt-[0.5vh] items-center" />
            <p className="text-xl underline underline-offset-4">
                <Link href="https://withcortex.com">
                    Explore Cortex
                </Link>
            </p>    
    </div>
    )
}