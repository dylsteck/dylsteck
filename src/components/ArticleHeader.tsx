import { type Article, articles } from "../pages/articles/articles"
import { CldImage } from "next-cloudinary";

export default function ArticleHeader({ slug }: { slug: string | undefined }){
    const article: Article | undefined = articles.find((item) => item.id === slug)

    return(
        <div className="pb-[2.5vh]">
            <p className="text-3xl font-semibold">{article?.title}</p>
            {/* <div className="flex flex-row gap-2 items-center">
                <CldImage 
                    alt="Calendar icon"
                    src={'media/calendarCircle.png'}
                    width={30} height={30}
                />
                <p className="text-sm">{article?.date}</p>
            </div> */}
            <p className="text-sm">{article?.date}</p>
        </div>
    )
}