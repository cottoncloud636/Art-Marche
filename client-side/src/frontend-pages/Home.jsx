import React from 'react'
import MasonryLayout from "../frontend-components/HomePaintLayout"
import { Link } from 'react-router-dom';

const artworks = [
  { imgUrl: 'https://1drv.ms/i/c/7a7b868a35d5cb38/IQPoghKriW2USLcEQ-TJSzUCAZfdRk5CAGS-lzfUBMdEY6M?width=2362&height=3307', title: 'Art Title 1', artist: 'Artist 1' },
  { imgUrl: 'https://1drv.ms/i/c/7a7b868a35d5cb38/IQPlmJndi6ajRbPP9_yoLaHZAXX1O1TlRQQUEOWPhpQptHc?width=1600&height=1202', title: 'Art Title 2', artist: 'Artist 2' },
  { imgUrl: 'https://1drv.ms/i/c/7a7b868a35d5cb38/IQNl3H464y3LT6luSA7_QdlnAT877WvQA5VAPA-Y9xgBZvc?width=2000&height=1548', title: 'Art Title 3', artist: 'Artist 3' },
  { imgUrl: 'https://1drv.ms/i/c/7a7b868a35d5cb38/IQMfEjwteP2aS6bEB3MGzAp0AbBRmVlt8oRohvGDVEPKV98?width=2592&height=1944', title: 'Art Title 3', artist: 'Artist 3'},
  { imgUrl: 'https://1drv.ms/i/c/7a7b868a35d5cb38/IQO4P2JKdKehTa9OCCBBOyedAQRWvW5m-NqkaL1cA85b7BE?width=1024', title: 'Art Title 3', artist: 'Artist 3'}
];
export default function Home() {
  return (
    <div>

      <div className="bg-gradient-to-r from-purple-400 via-pink-300 to-red-200 p-10 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4 animate-bounce">Discover Unique Artwork</h1>
        <p className="text-2xl mb-6">Explore our curated collection of beautiful and original pieces</p>
        <Link to="/search">
        <button className="bg-white text-purple-500 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-transform duration-300">
          Shop Now</button>
        </Link>
      </div>
      <MasonryLayout artworks={artworks} />

    </div>
  )
}
