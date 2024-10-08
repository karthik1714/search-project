'use client';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProblemCard from './ProblemComponent';
import { useTheme } from 'next-themes';
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

  const { theme } = useTheme();
  const logoBasePath = "/logos/";
  const darkModeSuffix = "_dark.png";
  const lightModeSuffix = "_light.png";
  const lightModeSuffix_si = '_light.avif'; // Light mode logo suffix for Hive
  const darkModeSuffix_si = '_dark.avif'; // Dark mode logo suffix for Hive

  return (
    <div>
      <div className="text-center mt-20">
      <div className="flex justify-center gap-8 flex-wrap mb-5">
        {/* LeetCode logo */}
        <div className="h-16 w-16 flex items-center justify-center">
          <a href="https://leetcode.com/problemset/">
          <img
            src={`${logoBasePath}leetcode${theme === 'dark' ? darkModeSuffix : lightModeSuffix}`}
            alt="LeetCode"
            className={`${theme === 'light' ? 'h-12 mb-2' : 'h-14'} max-w-full`}  
          />
          </a>

        </div>
        {/* Interview Bit logo */}
        <div className="h-16 w-16 flex items-center justify-center">
          <a href="https://www.interviewbit.com/practice/">
            <img
              src={`${logoBasePath}IN${lightModeSuffix}`}
              alt="Interview Bit"
              className="max-h-full max-w-full"
            />
          </a>


        </div>
        {/* HackerRank logo */}
        <div className="h-16 w-16 flex items-center justify-center">
          <a href="https://www.hackerrank.com/dashboard">
          <img
            src={`${logoBasePath}hackerrank${theme === 'dark' ? darkModeSuffix : lightModeSuffix}`}
            alt="HackerRank"
            className="max-h-full max-w-full"
          />
          </a>

        </div>
        {/* Smart Interviews logo */}
        <div className="h-16 w-16 flex items-center justify-center">
          <a href="https://smartinterviews.in/login?returnUrl=%2Freport%2FSNIST-2026-R">
          <img
            src={`${logoBasePath}Si${theme === 'dark' ? darkModeSuffix_si : lightModeSuffix_si}`}
            alt="Smart Interviews"
            className={`${theme === 'dark' ? 'h-12 mb-2 ' : 'h-16'} max-w-full mb-1`}  
          />
          </a>

        </div>

      </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 ">
          Discover DSA Problems
        </h1>
        <p className="mt-8 text-lg text-gray-600 dark:text-gray-400">
          Search for Data Structures and Algorithms problems across multiple platforms.
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
