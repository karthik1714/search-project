'use client';

import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProblemCard from './ProblemComponent';
import searchLocalData from '../api/searchScraped'


const Search = () => {
  const [results, setResults] = useState<any[]>([]); // Use any[] to store the fetched problems

  const handleSearch = async (query:string) => {
    const formattedQuery = query.toLowerCase().split(' ').join('-');
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
      console.log("Local Data:", localData);
  
      // Combine API data and local data
      const combinedResults = [...localData]; // API data is an object and local data is an array
  
      // Debugging: Log combined results to verify the final structure
      console.log("Combined Results:", combinedResults);
  
      setResults(combinedResults);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="p-4 ">
      <div>
      <SearchBar onSearch={handleSearch} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4">
          {results.map((problem, index) => (
            <ProblemCard
              key={index}
              questionId={problem.questionId || index} // Fallback to index if questionId is not available
              title={problem.questionTitle || problem.title} // Use questionTitle from API or title from local data
              difficulty={problem.difficulty || 'Unknown'} // Default to 'Unknown' if difficulty is missing
              platform={problem.platform} 
              link={problem.link}
            />
          ))}
      </div>
    </div>
  );
};

export default Search;

//https://alfa-leetcode-api.onrender.com/select?titleSlug=two-sum