'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { allGalleryItems } from './items';
import { GalleryItem as GalleryItemType, GalleryItemType as Type } from 'app/types';

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

const Filters = ({
  filter,
  handlePress,
  availableFilters,
}: {
  filter: Type | 'all' | null;
  handlePress: (value: Type | 'all') => void;
  availableFilters: Type[];
}) => {
  const renderFilter = (filterType: Type | 'all', isLast: boolean) => {
    const displayName = filterType.toLowerCase();
    const isActive = (filter === filterType) || (filterType === 'all' && filter === null);
    return (
      <React.Fragment key={filterType}>
        <p
          className={`cursor-pointer ${isActive ? 'font-semibold' : ''}`}
          onClick={() => handlePress(filterType)}
        >
          {displayName}
        </p>
        {!isLast && <p>/</p>}
      </React.Fragment>
    );
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      {['all', ...availableFilters].map((filterType, index) =>
        renderFilter(filterType as Type | 'all', index === availableFilters.length)
      )}
    </div>
  );
};

const Gallery = ({ id }: { id: string }) => {
  const [filter, setFilter] = useState<Type | null>(null);
  const [filteredItems, setFilteredItems] = useState<GalleryItemType[] | null>(null);
  const item = allGalleryItems.find((galleryItem) => galleryItem.id === id);
  if (!item) {
    throw new Error('No item found for the given id');
  }
  const { description, items } = item;

  const availableFilters = Array.from(new Set(items.map((item) => item.type))).sort();

  const handleSetFilter = (newFilter: Type | null) => {
    setFilter(newFilter !== filter ? newFilter : null);
  };

  const handleSetFilteredItems = (newFilteredItems: GalleryItemType[] | null) => {
    setFilteredItems(newFilteredItems);
  };

  const handleFilterPress = (newFilter: Type | 'all') => {
    if (newFilter === 'all') {
      handleSetFilter(null);
      handleSetFilteredItems(null);
    } else {
      const newlyFilteredItems = items.filter((item) => item.type === newFilter);
      handleSetFilter(newFilter);
      handleSetFilteredItems(newlyFilteredItems.length > 0 ? newlyFilteredItems : null);
    }
  };

  return (
    <>
      <p className="text-3xl font-semibold">{item.name}</p>
      <p className="text-lg text-gray-700">{item.description}</p>
      <Filters
        filter={filter === null ? 'all' : filter}
        handlePress={handleFilterPress}
        availableFilters={availableFilters}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-4 w-full">
        {(filter === null && filteredItems == null
          ? [...items]
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((item, index) => <GalleryItem key={index} item={item} />)
          : [...(filteredItems ?? [])]
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((item, index) => <GalleryItem key={index} item={item} />))}
      </div>
    </>
  );
};

export default Gallery;