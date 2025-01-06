'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { allGalleryItems } from './items';
import { GalleryItem as GalleryItemType, GalleryItemType as Type } from 'app/types';

const getColorFromType = (type: Type, colorFormat: 'text' | 'bg') => {
  switch(type){
    case Type.article: {
      return colorFormat === 'text' ? 'text-black' : 'bg-black'
    }
    case Type.nft: {
      return colorFormat === 'text' ? 'text-purple-600' : 'bg-purple-600'
    }
    case Type.paper: {
      return colorFormat === 'text' ? 'text-green-600' : 'bg-green-600'
    }
    case Type.product: {
      return colorFormat === 'text' ? 'text-yellow-600' : 'bg-yellow-600'
    }
    case Type.video: {
      return colorFormat === 'text' ? 'text-red-600' : 'bg-red-600'
    }
    default: {
      return colorFormat === 'text' ? 'text-black' : 'bg-black'
    }
  }
};

interface GalleryItemProps {
  item: GalleryItemType;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item }) => {
  return (
    <Link href={item.url} target="_blank">
      <div 
        className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
      </div>
      <p className="text-black/80 text-center pt-2 text-lg font-medium">
        {item.title}
      </p>
    </Link>
  );
};

const Filters = ({ filter, handlePress, availableFilters }: { filter: Type | null, handlePress: (value: Type | 'All') => void, availableFilters: Type[] }) => {
  const Filter = ({ filterType }: { filterType: Type }) => {
    return(
      <button
        className={`text-black ${filter === filterType ? 'bg-gray-400' : 'bg-gray-200'} rounded-full px-3.5 py-2 text-sm font-medium shadow-md hover:bg-gray-300 transition cursor-pointer`}
        onClick={() => handlePress(filterType)}
      >
        {filterType}
      </button>
    );
  };

  return(
    <div className="flex flex-row gap-2 items-center pb-4 overflow-x-auto">
      <button
        className={`text-black rounded-full px-3.5 py-2 text-sm font-medium shadow-md ${filter === null ? 'bg-gray-400' : 'bg-gray-200'} hover:bg-gray-300 transition curosr-pointer`}
        onClick={() => handlePress('All')}>
        All
      </button>
      {availableFilters.map(filterType => (
        <Filter key={filterType} filterType={filterType} />
      ))}
    </div>
  );
};

const Gallery = ({ id }: { id: string }) => {
  const [filter, setFilter] = useState<Type | null>(null);
  const [filteredItems, setFilteredItems] = useState<GalleryItemType[] | null>(null);
  const item = allGalleryItems.find((galleryItem) => galleryItem.id === id);
  if(!item){
    throw new Error("No item found for the given id");
  }
  const { description, items } = item;

  const availableFilters = Array.from(new Set(items.map(item => item.type))).sort();

  const handleSetFilter = (newFilter: Type | null) => {
    if(filter !== newFilter){
      setFilter(newFilter);
    }
    else{
      setFilter(null);
    }
  };

  const handleSetFilteredItems = (newFilteredItems: GalleryItemType[] | null) => {
    if(filteredItems !== newFilteredItems){
      setFilteredItems(newFilteredItems);
    }
  };

  const handleFilterPress = (newFilter: Type | 'All') => {
    if(newFilter === 'All'){
      handleSetFilter(null);
      handleSetFilteredItems(null);
    }
    else{
      if(filter === newFilter && filteredItems !== null){
        handleSetFilteredItems(null);
      }
      else{
        const newlyFilteredItems = items.filter((item) => item.type === newFilter);
        handleSetFilteredItems(newlyFilteredItems);
      }
      handleSetFilter(newFilter);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold pb-4">{item.name}</h1>
      <p className="pb-6 text-lg text-gray-700">
        {item.description}
      </p>
      <Filters filter={filter} handlePress={handleFilterPress} availableFilters={availableFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-4 w-full">
       {(filter === null && filteredItems == null) ?
          [...items].sort((a, b) => a.title.localeCompare(b.title)).map((item, index) => (
            <GalleryItem key={index} item={item} />
          )) :
          [...(filteredItems ?? [])].sort((a, b) => a.title.localeCompare(b.title)).map((item, index) => (
            <GalleryItem key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default Gallery;