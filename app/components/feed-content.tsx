'use client'

import { useState } from 'react'
import { TabType, MediaItem } from 'app/types'
import { videos } from 'app/video/videos'
import { posts } from 'app/blog/posts/posts'

interface FeedContentProps {
    onItemClick?: (url: string) => void
}

export default function FeedContent({ onItemClick }: FeedContentProps) {
    const [activeTab, setActiveTab] = useState<TabType>('all')

    // Calculate active items from activeTab during render - no need for separate state
    // Following React best practices: https://react.dev/learn/you-might-not-need-an-effect
    const activeItems = activeTab === 'all' 
        ? posts.concat(videos)
        : activeTab === 'blog' 
            ? posts 
            : videos

    // Sort items during render
    const sortedItems = [...activeItems].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return (
        <div className="w-full">
            {/* Tabs */}
            <div className="mb-6 flex flex-row gap-2 items-center text-neutral-700 dark:text-neutral-300">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`cursor-pointer transition-all duration-200 hover:opacity-70 ${
                        activeTab === 'all' ? 'font-semibold text-neutral-900 dark:text-neutral-100' : ''
                    }`}
                >
                    all
                </button>
                <span className="text-neutral-400 dark:text-neutral-600">/</span>
                <button
                    onClick={() => setActiveTab('blog')}
                    className={`cursor-pointer transition-all duration-200 hover:opacity-70 ${
                        activeTab === 'blog' ? 'font-semibold text-neutral-900 dark:text-neutral-100' : ''
                    }`}
                >
                    blog
                </button>
                <span className="text-neutral-400 dark:text-neutral-600">/</span>
                <button
                    onClick={() => setActiveTab('video')}
                    className={`cursor-pointer transition-all duration-200 hover:opacity-70 ${
                        activeTab === 'video' ? 'font-semibold text-neutral-900 dark:text-neutral-100' : ''
                    }`}
                >
                    video
                </button>
            </div>

            {/* Feed Items List */}
            <div className="flex flex-col gap-6">
                {sortedItems.map((item, index) => {
                    const url = `/${item.type}/${item.id}`
                    return (
                        <div className="w-full flex flex-col group" key={`${item.type}-${item.id}`}>
                            <button
                                onClick={() => onItemClick?.(url)}
                                className="text-left transition-all duration-200 hover:opacity-80 cursor-pointer"
                            >
                                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight text-base sm:text-lg font-medium group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                                    {item.title}
                                </p>
                            </button>
                            <p className="text-neutral-500 dark:text-neutral-500 min-w-[100px] tabular-nums text-sm mt-1">
                                {item.date}
                            </p>
                        </div>
                    )
                })}
            </div>

            {sortedItems.length === 0 && (
                <div className="mt-8 text-neutral-500 dark:text-neutral-500 text-sm">
                    No items found
                </div>
            )}
        </div>
    )
}
