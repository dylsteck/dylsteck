import Image from 'next/image';
import cortexLogo from '../../public/cortexLogoRemoveBg.png';
import farcasterArchPurple from '../../public/farcasterArchPurple.png';
import Link from 'next/link';

export default function Projects(){
    return(
        <div className="pl-[10vw] pr-[10vw] pt-[2.5vh] w-[90vw] h-[50vh]">
            <p className="text-xl font-medium">Projects</p>
            <div className="flex flex-col md:flex-row gap-1 w-[100%] h-[100%] mt-4">
                <div className="w-[100%] md:w-[90%] h-[100%] bg-black/90 text-white relative"> {/* Add 'relative' here */}
                    <div className="p-5">
                        <p className="text-2xl font-medium">Cortex</p>
                        <p>Command center for your digital life</p>
                    </div>
                    <div className="absolute bottom-0 left-0 pl-[2vw] pb-[5vh]">
                        <p className="font-medium">
                            <Link href="https://withcortex.com">
                                Learn more
                            </Link>
                        </p>
                    </div>
                    <div className="absolute bottom-0 right-0 pr-[5vw] pb-0"> {/* TODO; fix nidden visible state */}
                        <Image src={cortexLogo} alt="Cortex logo" width={475*.65} height={408*.65} /> 
                    </div>
                </div>
                <div className="w-[100%] md:w-[30%] h-[100%] flex flex-col gap-1">
                    <div className="w-[100%] h-[100%] bg-[#F5F5F5] text-black relative"> {/* Add 'relative' here */}
                        <div className="p-5">
                            <p className="text-2xl font-medium">farcaster kit</p>
                            <p>react hooks for the best farcaster apps</p>
                        </div>
                        <div className="absolute bottom-0 left-0 pl-[2vw] pb-[5vh]">
                            <p className="font-medium text-[#8A63D2]">
                                <Link href="https://farcasterkit.com/docs">
                                    view docs
                                </Link>
                            </p>
                        </div>
                        <div className="absolute bottom-0 right-0 pr-[2vw] pb-[2vh]">
                            <Image src={farcasterArchPurple} alt="Faracster arch in Purple" width={96.41/2} height={89.98/2} /> 
                        </div>
                    </div>
                    <div className="w-[100%] h-[100%] bg-[#8A63D2]/75 text-white/80 relative"> {/* Add 'relative' here */}
                        <div className="p-5 pt-7">
                            <p className="text-3xl font-medium">Group Purple</p>
                            <p className="text-md pt-1">A subDAO of PurpleDAO focused on group coordination </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}