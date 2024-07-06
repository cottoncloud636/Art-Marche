import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [sort, setSort] = useState('price-asc');
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('keyword', keyword);
    urlSearchParams.set('source', source);
    urlSearchParams.set('medium', medium);
    urlSearchParams.set('sort', sort);
    const query = urlSearchParams.toString();
    navigate(`/search?${query}`);
    fetchResults();
  };

  const fetchResults = async () => {
    const response = await fetch(`/api/search?keyword=${keyword}&source=${source}&medium=${medium}&sort=${sort}`);
    const data = await response.json();
    setResults(data);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const searchParamsInURL = urlSearchParams.get('keyword');
    if (searchParamsInURL) {
      setKeyword(searchParamsInURL);
    }
    fetchResults();
  }, [window.location.search]);

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
          <div className="flex justify-between space-x-4 mb-6">
            {/* Source Section */}
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
                    id="pencil"
                    name="medium"
                    value="pencil"
                    checked={medium === 'pencil'}
                    onChange={(e) => setMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="pencil">Pencil</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pen"
                    name="medium"
                    value="pen"
                    checked={medium === 'pen'}
                    onChange={(e) => setMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="pen">Pen</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pastel"
                    name="medium"
                    value="pastel"
                    checked={medium === 'pastel'}
                    onChange={(e) => setMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="pastel">Pastel</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="charcoal"
                    name="medium"
                    value="charcoal"
                    checked={medium === 'charcoal'}
                    onChange={(e) => setMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="charcoal">Charcoal</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="chalk"
                    name="medium"
                    value="chalk"
                    checked={medium === 'chalk'}
                    onChange={(e) => setMedium(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="chalk">Chalk</label>
                </div>
              </div>
            </div>

            {/* Sort Section */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Sort</h3>
              <select
                id='sortresult'
                value={sort}
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
              <p>{result.description}</p>
              <p className="text-gray-600">Price: ${result.price}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
