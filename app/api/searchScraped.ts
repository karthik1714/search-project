import interviewBitData from '../../public/data/interviewBitProblems.json';
import hiveBasicData from '../../public/data/problemsFromHiveBasic.json';
import hivePrimaryData from '../../public/data/problemsFromPrimary.json';
import Fuse from 'fuse.js';





// Function to format the query string as per the given rules
const formatQuery = (query: string) => {
  // Replace & with 'and' and remove apostrophes
  const modifiedQuery = query.replace(/&/g, 'and').replace(/'/g, '');

  // Convert to lowercase, replace spaces with hyphens, and trim extra hyphens
  return modifiedQuery
    .toLowerCase()
    .split(' ')
    .join('-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/-+/g, '-'); // Handle leading/trailing hyphens
};
/*
const searchLocalData = (query: string) => {
  // Search for problems in Interview Bit
  const interviewBitResults = interviewBitData
    .filter((item) => item.Title.toLowerCase().includes(query.toLowerCase()))
    .map((item) => ({
      title: item.Title,
      difficulty: item.Difficulty || 'Unknown',  // Difficulty is standard here
      platform: 'Interview Bit',  // Platform name
      link: `https://www.interviewbit.com/problems/${formatQuery(item.Title)}`,  // Generated link
    }));

  // Search for problems in Hive Basic
  const hiveBasicResults = hiveBasicData
    .filter((item) => item.Title.toLowerCase().includes(query.toLowerCase()))
    .map((item) => ({
      title: item.Title,
      difficulty: item.Score || 'Unknown',  // Using Score for difficulty
      platform: 'Hive Basic',  // Platform name
      link: `https://hive.smartinterviews.in/contests/smart-interviews-basic/problems/${formatQuery(item.Title)}`,  // Generated link
    }));

  // Search for problems in Hive Primary
  const hivePrimaryResults = hivePrimaryData
    .filter((item) => item.Title.toLowerCase().includes(query.toLowerCase()))
    .map((item) => ({
      title: item.Title,
      difficulty: item.Score || 'Unknown',  // Using Score for difficulty
      platform: 'Hive Primary',  // Platform name
      link: `https://hive.smartinterviews.in/contests/smart-interviews-primary/problems/${formatQuery(item.Title)}`,  // Generated link
    }));

  // Combine all the results
  return [...interviewBitResults, ...hiveBasicResults, ...hivePrimaryResults];
};
*/
const normalizeString = (str: string | undefined) => {
  // Check if the string is undefined or null
  if (typeof str !== 'string') {
      return ''; // Return an empty string if input is not a valid string
  }

  // Call formatQuery to normalize the string
  return formatQuery(str);
};

const searchLocalData = (query: string) => {

  console.log("Original Query:", query);
  const normalizedQuery = normalizeString(query);
  console.log("Normalized Query:", normalizedQuery);

/*
  const hiveBasicResults = hiveBasicData.filter((item) => {
    const normalizedTitle = normalizeString(item.Title);
    console.log("Normalized Title:", normalizedTitle); // Log normalized titles
    return normalizedTitle.includes(normalizedQuery);
  });
  */

  // Search for problems in Interview Bit
   // Create Fuse instances for each dataset
   const interviewBitFuse = new Fuse(interviewBitData, {
    keys: ['Title'], // Fields to search in
    threshold: 0.3, // Adjust for fuzzy searching
  });

  const hiveBasicFuse = new Fuse(hiveBasicData, {
    keys: ['Title'], // Fields to search in
    threshold: 0.3, // Adjust for fuzzy searching
  });

  const hivePrimaryFuse = new Fuse(hivePrimaryData, {
    keys: ['Title'], // Fields to search in
    threshold: 0.3, // Adjust for fuzzy searching
  });

  // Search for results using Fuse.js
  const interviewBitResults = interviewBitFuse.search(normalizedQuery).map(result => ({
    title: result.item.Title,
    difficulty: result.item.Difficulty || 'Unknown',
    platform: 'Interview Bit',
    link: `https://www.interviewbit.com/problems/${formatQuery(result.item.Title)}`,
  }));

  const hiveBasicResults = hiveBasicFuse.search(normalizedQuery).map(result => ({
    title: result.item.Title,
    difficulty: result.item.Score || 'Unknown',
    platform: 'Hive Basic',
    link: `https://hive.smartinterviews.in/contests/smart-interviews-basic/problems/${formatQuery(result.item.Title)}`,
  }));

  const hivePrimaryResults = hivePrimaryFuse.search(normalizedQuery).map(result => ({
    title: result.item.Title,
    difficulty: result.item.Score || 'Unknown',
    platform: 'Hive Primary',
    link: `https://hive.smartinterviews.in/contests/smart-interviews-primary/problems/${formatQuery(result.item.Title)}`,
  }));

  console.log("Interview Bit Results:", interviewBitResults);
  console.log("Hive Basic Results:", hiveBasicResults);
  console.log("Hive Primary Results:", hivePrimaryResults);

  // Combine all results
  return [...interviewBitResults, ...hiveBasicResults, ...hivePrimaryResults];
};

export default searchLocalData;