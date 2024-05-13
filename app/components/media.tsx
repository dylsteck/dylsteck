"use client";
import React from "react";
import { TabType, MediaItem } from "app/types";
import Link from "next/link";
import { videos } from "app/video/videos";
import { posts } from "app/blog/posts/posts";

export default function Media(){
    const allItems = posts.concat(videos);
    const [activeTab, setActiveTab] = React.useState<TabType>('all');
    const [activeItems, setActiveItems] = React.useState<MediaItem[]>(allItems);

    const handleTabClick = (newTab: TabType) => {
        if(newTab !== activeTab){
          setActiveTab(newTab);
          switch(newTab){
            case 'all': {
              setActiveItems(allItems);
              break;
            }
            case 'blog': {
              setActiveItems(posts);
              break;
            }
            case 'video': {
              setActiveItems(videos);
              break;
            }
          }
        }
    }

    return(
        <div>
            <div className="my-2 flex flex-row gap-2 items-center">
                <p className={`cursor-pointer ${activeTab === 'all' ? 'font-semibold' : ''}`} onClick={() => handleTabClick('all')}>all</p>
                <p>/</p>
                <p className={`cursor-pointer ${activeTab === 'blog' ? 'font-semibold' : ''}`} onClick={() => handleTabClick('blog')}>blog</p>
                <p>/</p>
                <p className={`cursor-pointer ${activeTab === 'video' ? 'font-semibold' : ''}`} onClick={() => handleTabClick('video')}>video</p>
            </div>
            <div className="flex flex-col gap-5">
              {activeItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item, index) => {
                  return(
                    <div className="w-full flex flex-col" key={index}>
                       <Link href={`/${item.type}/${item.id}`}>
                          <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                              {item.title}
                          </p>
                        </Link>
                        <p className="text-neutral-600 dark:text-neutral-400 min-w-[100px] tabular-nums text-sm">
                            {item.date}
                        </p>
                    </div>
                  )
              })}
            </div>
        </div>
    )
}