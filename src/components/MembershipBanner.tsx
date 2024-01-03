import Image from 'next/image';
import Link from 'next/link';
import openaiDevDay from '../../public/openaiDevDay.png';
import steckStudiosPlaceholder from '../../public/steckStudiosPlaceholder.png';

export default function MembershipBanner(){
    return(
        <div className="pl-[10vw] pr-[10vw] pt-[10vh] w-[90vw] h-[50vh]">
            <p className="text-xl font-medium pb-[2.5vh]">Membership</p>
            <Image alt="STECK Studios placeholder" src={steckStudiosPlaceholder} />
        </div>   
    )
}