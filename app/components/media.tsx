"use client";
import React from "react";
import { TabType, MediaItem } from "app/types";
import Link from "next/link";
import { articles } from "app/blog/articles/articles";
import { notes } from "app/blog/notes/notes";

export default function Media(){
    const allItems = articles.concat(notes);
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
            case 'article': {
              setActiveItems(articles);
              break;
            }
            case 'note': {
              setActiveItems(notes);
              break;
            }
          }
        }
    }

    return(
        <div>
            <div className="my-2 flex flex-row gap-2 items-center">
                <p className={activeTab === 'all' ? 'font-semibold' : ''} onClick={() => handleTabClick('all')}>all</p>
                <p>/</p>
                <p className={activeTab === 'article' ? 'font-semibold' : ''} onClick={() => handleTabClick('article')}>articles</p>
                <p>/</p>
                <p className={activeTab === 'note' ? 'font-semibold' : ''} onClick={() => handleTabClick('note')}>notes</p>
            </div>
            <div className="flex flex-col gap-5">
              {activeItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item, index) => {
                  return(
                    <div className="w-full flex flex-col" key={index}>
                       <Link href={`/${item.type}s/${item.id}`}>
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