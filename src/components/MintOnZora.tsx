import { CldImage } from "next-cloudinary";
import Link from "next/link";


export default function MintOnZora({ url }: { url: string }){
    return(
        <div className="flex flex-row gap-2 items-center">
            <CldImage src="media/zora-zorb.png" alt="Zora zorb" width={300} height={300} className="w-4 h-4" />
            <Link href={url}>
                <p className="font-medium">Mint on Zora</p>
            </Link>
        </div>
    )
}