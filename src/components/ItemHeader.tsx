import { type TextItem, allWritingItems } from "../lib/articles";
import { notes } from "../lib/notes";

export default function ItemHeader({ slug }: { slug: string | undefined }){
    const allItems = allWritingItems;
    const item: TextItem | undefined = allItems.find((item) => item.id === slug)

    return(
        <div className="pb-[2.5vh]">
            <p className="text-3xl font-semibold">{item?.title}</p>
            <p className="text-sm">{item?.date}</p>
        </div>
    )
}