import Image from 'next/image';
import youtubeLogo from '../../public/youtubeLogo.png'
import Link from 'next/link';

export default function YTName({ link }: { link: string }){
    return(
    <div className="flex flex-row gap-2 items-center pt-[3.5%]">
        <Image src={youtubeLogo} alt="YouTube Logo" className="max-w-[10%] pt-[0.5vh] items-center" />
        <p className="text-xl underline underline-offset-4">
            <Link href={link}>
                Watch on YouTube
            </Link>
        </p>   
    </div>
    )
}