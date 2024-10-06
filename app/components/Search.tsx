'use client';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProblemCard from './ProblemComponent';
import searchLocalData from '../api/searchScraped';

const Search = () => {
  const [results, setResults] = useState<any[]>([]); // Use any[] to store the fetched problems
  const [isSearching, setIsSearching] = useState(false); // To track if the user is searching
  const [errorMessage, setErrorMessage] = useState(''); // To display an error message

  const handleSearch = async (query: string) => {
    const formattedQuery = query.toLowerCase().split(' ').join('-');
    setIsSearching(true); // Set searching state to true
    setErrorMessage(''); // Clear any previous error message

    try {
      /*
      const res = await fetch(`http://localhost:3001/select?titleSlug=${formattedQuery}`);
      const apiResponse = await res.json();
      const apidata = {
        link: apiResponse.link || '', // Fallback to empty string if link is not present
        questionId: apiResponse.questionId || '',
        questionTitle: apiResponse.questionTitle || '',
        difficulty: apiResponse.difficulty || 'Unknown',
        platform: 'LeetCode', // Assuming the platform is LeetCode
      };

      console.log("API Data:", apidata);
      */

      // Local data search
      const localData = searchLocalData(formattedQuery);

      // Debugging: Log local data to verify its structure
      console.log('Local Data:', localData);

      if (localData.length === 0) {
        // No results found, set an error message
        setErrorMessage('No results found. Please enter a valid problem name.');
      }

      // Combine API data and local data
      const combinedResults = [...localData]; // API data is an object and local data is an array

      // Debugging: Log combined results to verify the final structure
      console.log('Combined Results:', combinedResults);

      setResults(combinedResults);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error fetching data. Please try again later.');
    } finally {
      setIsSearching(false); // Reset searching state
    }
  };

  return (
    <div>
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 ">
          Discover DSA Problems
        </h1>
        <p className="mt-10 text-lg text-gray-600 dark:text-gray-400">
          Search for Data Structures and Algorithms problems across multiple platforms.
          Find the right challenge to enhance your coding skills!
        </p>
        <div className="mt-10">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div>
        <div className="mt-10 grid grid-cols-1 gap-4">
          {isSearching ? (
            <p>Searching...</p>
          ) : errorMessage ? (
            <p className="mt-10 font-bold text-red-500 text-center">{errorMessage}</p> // Display error message
          ) : (
            results.map((problem, index) => (
              <ProblemCard
                key={index}
                questionId={problem.questionId || index} // Fallback to index if questionId is not available
                title={problem.questionTitle || problem.title} // Use questionTitle from API or title from local data
                difficulty={problem.difficulty || 'Unknown'} // Default to 'Unknown' if difficulty is missing
                platform={problem.platform}
                link={problem.link}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
