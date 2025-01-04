'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allGalleryItems } from './items';
import { GalleryItem, GalleryItems, GalleryItemType } from 'app/types';

const getColorFromType = (type: GalleryItemType, colorFormat: 'text' | 'bg') => {
  switch(type){
    case GalleryItemType.article: {
      return colorFormat === 'text' ? 'text-black' : 'bg-black'
    }
    case GalleryItemType.nft: {
      return colorFormat === 'text' ? 'text-purple-600' : 'bg-purple-600'
    }
    case GalleryItemType.paper: {
      return colorFormat === 'text' ? 'text-green-600' : 'bg-green-600'
    }
    case GalleryItemType.product: {
      return colorFormat === 'text' ? 'text-yellow-600' : 'bg-yellow-600'
    }
    case GalleryItemType.video: {
      return colorFormat === 'text' ? 'text-red-600' : 'bg-red-600'
    }
    default: {
      return colorFormat === 'text' ? 'text-black' : 'bg-black'
    }
  }
}

const MediaGridItem = ({key, item}: { key: number, item: GalleryItem }) => {
    return (
    <div className="flex flex-col">
      <Link href={item.url}>
        <div className="w-[100%] flex flex-col items-center">
          <img
              src={item.imageUrl}
              alt={item.title}
              width={450} height={350}
              className="w-full max-h-72 object-cover rounded-lg bg-top mt-1"
            />
            <p className="text-black/80 text-center pt-2 text-md">{item.title}</p> 
        </div>
      </Link>
    </div>
  );
}

const Filters = ({ filter, handlePress }: { filter: GalleryItemType | null, handlePress: (value: GalleryItemType | 'All') => void }) => {

  const Filter = ({ filterType }: { filterType: GalleryItemType }) => {
    return(
      <button 
        className={`text-black ${filter === filterType ? 'bg-[#b7b7b7]' : 'bg-[#E2E3E2]'} rounded-xl px-3 py-2 text-sm cursor-pointer`}
        onClick={() => handlePress(filterType)}
      >
        {filterType}
      </button>
    )
  }
  const allFilters = Object.values(GalleryItemType);
  return(
    <div className="flex flex-row gap-2 items-center pb-2 overflow-x-scroll">
      <button 
        className={`text-black rounded-xl px-3 py-2 text-sm ${filter === null ? 'bg-[#b7b7b7]' : 'bg-[#E2E3E2]'} cursor-pointer`}
        onClick={() => handlePress('All')}>
        All
      </button>
      <Filter filterType={GalleryItemType.article} />
      <Filter filterType={GalleryItemType.nft} />
      <Filter filterType={GalleryItemType.paper} />
      <Filter filterType={GalleryItemType.product} />
      <Filter filterType={GalleryItemType.video} />
    </div>
  )
}


const Gallery = ({ id }: { id: string }) => {
  const [filter, setFilter] = useState<GalleryItemType | null>(null);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[] | null>(null);
  const item = allGalleryItems.find((galleryItem) => galleryItem.id === id);
  if(!item){
    throw new Error("No item found for the given id")
  }
  const { description, items } = item;

  const handleSetFilter = (newFilter: GalleryItemType | null) => {
    if(filter !== newFilter){
      setFilter(newFilter);
    }
    else{
      setFilter(null);
    }
  }

  const handleSetFilteredItems = (newFilteredItems: GalleryItem[] | null) => {
    if(filteredItems !== newFilteredItems){
      setFilteredItems(newFilteredItems);
    }
  }

  const handleFilterPress = (newFilter: GalleryItemType | 'All') => {
    if(newFilter === 'All'){
      handleSetFilter(null);
      handleSetFilteredItems(null);
    }
    else{
      if(filter === newFilter && filteredItems !== null){
        handleSetFilteredItems(null);
      }
      else{
        const newlyFilteredItems = items.filter((item) => item.type === newFilter)
        handleSetFilteredItems(newlyFilteredItems)
      }
      handleSetFilter(newFilter);
    }
  }

  return (
    <>
      <h1 className="text-lg font-medium">{item.name}</h1>
      <p className="pb-[2vh]">
        {item.description}
      </p>
      <Filters filter={filter} handlePress={handleFilterPress} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center pt-[1.5]">
      {(filter === null && filteredItems == null) ? 
        items.map((item, index) => (
          <MediaGridItem key={index} item={item} />
        )) : 
        filteredItems?.map((item, index) => (
          <MediaGridItem key={index} item={item} />
      ))}
    </div>
    </>
  );
};

export default Gallery;