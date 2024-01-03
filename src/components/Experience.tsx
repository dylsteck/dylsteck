import Image from 'next/image';
import cortexLogo from '../../public/cortexLogoRemoveBg.png';
import farcasterArchPurple from '../../public/farcasterArchPurple.png';
import Link from 'next/link';

export type ExperienceItem = {
    company: string;
    title: string;
    description: string;
    duration: string;
}

const experiences: ExperienceItem[] = [
    {
        company: 'Triangle Labs',
        title: 'Software Engineering Intern',
        description: 'Scoped/built full-stack features for a mobile crypto browser, and worked on the backend for a Chrome extension that lets you browse the web with AI',
        duration: 'Jun 2023 - Aug 2023'
    },
    {
        company: 'Double Down',
        title: 'Platform Fellow',
        description: 'Built internal tooling and wrote reports to better analyze fund data, sourcing and crypto ecosystems',
        duration: 'Jun 2023 - Aug 2023'
    },
    {
        company: 'Chapter One',
        title: 'Studios Intern',
        description: 'Organized resources for the Studios incubator, worked on various research and design tasks, and learned about the world of venture capital',
        duration: 'Jun 2022 - Aug 2022'
    }
];

export function ExperienceItem({ item }: { item: ExperienceItem }){
    return(
        <div className="pb-[2vh]">
            <div className="flex flex-row justify-between">
                <p className="max-w-[60%] text-lg">{item.company} - {item.title}</p>
                <p className="font-light">{item.duration}</p>
            </div>
            <p className="max-w-[60%]">{item.description}</p>
        </div>
    )
}

export default function Experience(){
    return(
        <div className="pl-[10vw] pr-[10vw] pt-[10vh] w-[90vw] h-[50vh]">
            <p className="text-xl font-medium">Experience</p>
            <div className="flex flex-col gap-2 pt-[2vh]">
                {experiences.map((experience: ExperienceItem) => {
                    return <ExperienceItem item={experience} key={experiences.indexOf(experience)} />
                })}
            </div>
        </div>
    )
}