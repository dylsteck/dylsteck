import Image from 'next/image';
import Link from 'next/link';
import cortexTimelineMockup from '../../public/cortexTimelineMockup.png';
import dsLock from '../../public/dsLock.png';
import arrowLeftCircle from '../../public/arrowLeftCircle.png';
import arrowRightCircle from '../../public/arrowRightCircle.png';
import openaiDevDay from '../../public/openaiDevDay.png';
import farcasterKitWebsite from '../../public/farcasterKitWebsite.png';
import CortexName from './CortexName';
import { useState } from 'react';
import DSName from './DSName';
import FCKitName from './FCKitName';
import YTName from './YTName';

export type CarouselItem = {
    id: number;
    name: string;
}

const items: CarouselItem[] = [
    {
        id: 0, name: 'Cortex'
    },
    {
        id: 1, name: 'Membership'
    },
    {
        id: 2, name: 'Farcaster Kit'
    },
    {
        id: 3, name: 'OpenAI DevDay'
    },
]

function CortexCarouselItem(){
    return(
        <div className="md:flex md:flex-row md:gap-5 pl-1 pr-1 mt-[1vh]">
            <div>
                <p className="text-4xl font-medium pt-[2.5%]">All your apps in one place</p>
                <p className="pt-[5%] text-2xl text-white/90">Cortex is an ongoing project to build the command center for your online life</p>
                <CortexName />
            </div>
            <div className="max-w-[0%] md:max-w-[50%] max-h-[0%] md:max-h-[50%] invisible md:visible">
                <Image src={cortexTimelineMockup} alt="Cortex timeline mockup" className="md:max-w-[95%] lg:max-w-[85%]" />
            </div>
        </div>
    )
}

function MembershipCarouselItem(){
    return(
        <div className="md:flex md:flex-row md:gap-5 items-center pl-1 pr-1 mt-[1vh]">
            <div>
                <p className="text-4xl font-medium pt-[2.5%]">STECK Studios</p>
                <p className="pt-[5%] text-2xl text-white/90">Subscribe for early access to Cortex updates, new articles/videos, and more perks across my projects</p>
                <DSName />
            </div>
            <div className="max-w-[0%] md:max-w-[30%] max-h-[0%] md:max-h-[30%] invisible md:visible">
                <Image src={dsLock} alt="DS lock icon" className="max-w-[70%] max-h-[70%]" />
            </div>
        </div>
    )
}

function FarcasterKitCarouselItem(){
    return(
        <div className="md:flex md:flex-row md:gap-0 items-center pl-1 pr-1 mt-[1vh]">
            <div>
                <p className="text-4xl font-medium pt-[2.5%]">Farcaster Kit</p>
                <p className="pt-[5%] text-2xl text-white/90">React hooks for the best Farcaster apps</p>
                <FCKitName />
            </div>
            <div className="max-w-[0%] md:max-w-[50%] max-h-[0%] md:max-h-[50%] invisible md:visible">
                <Link href="https://farcasterkit.com">
                    <Image src={farcasterKitWebsite} alt="Farcaster Kit website" className="rounded-lg" />
                </Link>
            </div>
        </div>
    )
}

function DevDayCarouselItem(){
    return(
        <div className="md:flex md:flex-row md:gap-5 items-center pl-1 pr-1 mt-[1vh]">
            <div>
                <p className="text-4xl font-medium pt-[2.5%]">OpenAI DevDay</p>
                <p className="pt-[5%] text-2xl text-white/90">Watch my recap of OpenAI DevDay 2023 and the impact of their new products</p>
                <YTName link="https://www.youtube.com/watch?v=9CIryp5RkPg" />
            </div>
            <div className="max-w-[0%] md:max-w-[50%] max-h-[0%] md:max-h-[50%] invisible md:visible">
            <Image src={openaiDevDay} alt="OpenAI DevDay video" className="max-w-[90%] max-h-[90%] rounded-lg" />
            </div>
        </div>
    )
}

function FeaturedCarousel(){
    const [currentItem, setCurrentItem] = useState<CarouselItem>(items[0]);
    
    const handleSetCurrentItem = (back: boolean) => {
        const currentId = currentItem.id;
        const newId = back ? currentId - 1 : currentId + 1;
        if(newId >= 0 && newId <= items.length - 1){
            setCurrentItem(items[newId])
        }
    }

    return(
        <div style={{ background: 'linear-gradient(180deg, rgba(56, 56, 56, 0.6) 0%, rgba(38, 38, 38, 0.6) 100%)', borderRadius: 20, color: 'white', width: '50%', height: 'auto' }} className="p-5 mt-[2.5vh]">
            <div className="flex flex-row justify-between items-center pl-1 pr-3">
                <p className="text-xl">Featured</p>
                <div className="flex flex-row items-center gap-2 max-h-[5%]">
                    <Image src={arrowLeftCircle} className="w-[70%] h-[70%]" alt="Arrow left circle" onClick={() => handleSetCurrentItem(true)} />
                    <Image src={arrowRightCircle} className="w-[70%] h-[70%]" alt="Arrow right circle" onClick={() => handleSetCurrentItem(false)} />
                </div>
            </div>
            {currentItem.id === 0 && <CortexCarouselItem /> }
            {currentItem.id === 1 && <MembershipCarouselItem /> }
            {currentItem.id === 2 && <FarcasterKitCarouselItem /> }
            {currentItem.id === 3 && <DevDayCarouselItem /> }
        </div>
    )
}

export default function Featured(){
    const im = "I'm";
    return(
        <div className="flex flex-col gap-4 justify-center items-center w-[100%] max-h-[80%] pt-[5vh]">
            <p className="text-3xl">How can software give people more agency?</p>
            <p className="max-w-[50%] text-xl text-center">{im} researching interfaces and platforms that make data accessible and better represent user actions</p>
            <FeaturedCarousel />
        </div>
    )
}