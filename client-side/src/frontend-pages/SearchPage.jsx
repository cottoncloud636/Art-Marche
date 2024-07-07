import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [source, setSource] = useState('');
  const [artMedium, setArtMedium] = useState('');
  const [sort, setSort] = useState('price-asc');
  const [results, setResults] = useState([]);
  const [showmore, setShowmore] = useState(false);

  const navigate = useNavigate();
  console.log('Results:', results);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlSearchParams = new URLSearchParams();
    if (keyword) urlSearchParams.set('keyword', keyword);
    if (source) urlSearchParams.set('source', source);
    if (artMedium) urlSearchParams.set('artMedium', artMedium);
    if (sort) urlSearchParams.set('sort', sort);
    const query = urlSearchParams.toString();
    console.log('Query:', query); // Log the query

    navigate(`/search?${query}`);
    fetchResults(query);
  };

  const fetchResults = async (query) => {
    try {
      // setShowmore(false);
      const response = await fetch(`/api/listing/getsearch?${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.length > 8) {
        setShowmore(true);
      } else {
        setShowmore(false);
      }
      console.log('Fetched data:', data);
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const keywordParam = urlSearchParams.get('keyword');
    const sourceParam = urlSearchParams.get('source');
    const artMediumParam = urlSearchParams.get('artMedium');
    const sortParam = urlSearchParams.get('sort');

    if (keywordParam) setKeyword(keywordParam);
    if (sourceParam) setSource(sourceParam);
    if (artMediumParam) setArtMedium(artMediumParam);
    if (sortParam) setSort(sortParam);

    const query = urlSearchParams.toString();
    fetchResults(query);
  }, [window.location.search]);


  const onClickShowMore = async ()=>{
    //the idea is to fetch the rest of the listings when click show more button
    //hence, the startIndex variable need to be set to the next starting point of the page
    const currentListingNum = results.length;
    const startIndex = currentListingNum;//the next start index is the same as the number of previous retrieved lists
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('startIndex', startIndex);
    const query = urlSearchParams.toString();
    try {
      const response = await fetch(`/api/listing/getsearch?${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Show More Fetched data:', data);
      if (data.length < 9) {
        setShowmore(false);
      }
      setResults((prevResults) => [...prevResults, ...data]);
    } catch (error) {
      console.error('Error fetching more search results:', error);
    }
    // const response = await fetch(`/api/listing/getsearch?${query}`);
    // const data = await response.json();
    // if (data.length < 4 ) {setShowmore(false)};
    // setResults([...results, ...data]); //updates the listings state by appending the new data to the existing listings 
  };


  return (
    <div className="max-w-10xl mx-auto p-6">
      {/* Search Section */}
      <section className="bg-gray-100 p-6 rounded-lg mb-8">
        <form onSubmit={handleSubmit}>
          {/* Search by Keyword */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Search by Keyword</h3>
            <input
              type="text"
              id='keyword'
              placeholder="Enter keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

           {/* 1) htmlFor: in react htmlFor is used instead of for to avoid conflicts with the JavaScript for loop.
               The value of htmlFor should match the id of the form control it is associated with.
               Enhances accessibility and usability by creating a clear association between labels and form controls. */}

          {/* Source Section */}
          <div className="flex justify-between space-x-4 mb-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Source</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="original"
                    name="source"
                    value="original"
                    checked={source === 'original'}
                    onChange={(e) => setSource(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="original">Original</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="imitation"
                    name="source"
                    value="imitation"
                    checked={source === 'imitation'}
                    onChange={(e) => setSource(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="imitation">Imitation</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="other-work"
                    name="source"
                    value="other-work"
                    checked={source === 'other-work'}
                    onChange={(e) => setSource(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="other-work">Other's Work</label>
                </div>
              </div>
            </div>

            {/* Medium Section */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Medium</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pastel"
                    name="artMedium"
                    value="Pastel"
                    checked={artMedium === 'Pastel'}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="Pastel">Pastel</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pencil"
                    name="artMedium"
                    value="Pencil"
                    checked={artMedium === 'Pencil'}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="Pencil">Pencil</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="charcoal"
                    name="artMedium"
                    value="Charcoal"
                    checked={artMedium === 'Charcoal'}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="Charcoal">Charcoal</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pen"
                    name="artMedium"
                    value="Pen"
                    checked={artMedium === 'Pen'}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="Pen">Pen</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="chalk"
                    name="artMedium"
                    value="Chalk"
                    checked={artMedium === 'Chalk'}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="Chalk">Chalk</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="watercolor"
                    name="artMedium"
                    value="Watercolor"
                    checked={artMedium === 'Watercolor'}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="Watercolor">Watercolor</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="oil"
                    name="artMedium"
                    value="Oil"
                    checked={artMedium === 'Oil'}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="Oil">Oil</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="acrylic"
                    name="artMedium"
                    value="Acrylic"
                    checked={artMedium === 'Acrylic'}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="Acrylic">Acrylic</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="tempera"
                    name="artMedium"
                    value="Tempera"
                    checked={artMedium === 'Tempera'}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="Tempera">Tempera</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ai"
                    name="artMedium"
                    value="AI"
                    checked={artMedium === 'AI'}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="AI">AI</label>
                </div>

              </div>
            </div>

            {/* Sort Section */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Sort</h3>
              <select
                id='sortresult'
                defaultValue={'price_descending'}
                onChange={(e) => setSort(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="date-asc">Date: Oldest to Newest</option>
                <option value="date-desc">Date: Newest to Oldest</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Search
          </button>
        </form>
      </section>

      {/* Search Results Section */}
      <section className="search-results bg-white p-6 rounded-lg shadow">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result._id} className="result-item mb-4 p-4 border-b border-gray-200">
              <h4 className="text-xl font-semibold">{result.listingName}</h4>
              <Link to={`/listdetail/${result._id}`}>
                <img src={result.paintUrls[0]} alt='paint' className='h-[320px] w=[320px] sm:h-[220px] object-cover hover:scale-105 transition-scale duration-300'/>

              </Link>
              <p className="text-sm italic text-gray-600 line-clamp-3">{result.description}</p>
              <p className="text-gray-600">Price: ${result.price}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}

        {showmore && (
          <button onClick={()=>onClickShowMore} className="text-blue-600 hover:underline hover:italic p-7 text-center w-full"> 
            click to show more...
          </button>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
