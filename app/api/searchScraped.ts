import interviewBitData from '../../public/data/interviewBitProblems.json';
import hiveBasicData from '../../public/data/problemsFromHiveBasic.json';
import hivePrimaryData from '../../public/data/problemsFromPrimary.json';
import leetcodeData from '../../public/data/leetcode_problems.json';
import hackRankData from '../../public/data/hackRank.json'
import Fuse from 'fuse.js';

// Function to format the query string as per the given rules
const formatQuery = (query: string) => {
  const modifiedQuery = query.replace(/&/g, 'and').replace(/'/g, '');
  
  return modifiedQuery
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .split(' ')
    .join('-')
    .replace(/--+/g, '-')
    .replace(/-+/g, '-');
};

const normalizeString = (str: string | undefined) => {
  return typeof str === 'string' ? formatQuery(str) : '';
};

// Common function to create Fuse instance
const createFuseInstance = (data: any[], keys: string[], threshold: number) => {
  return new Fuse(data, {
    keys,
    threshold,
  });
};

// Common function to format search results
const formatResults = (results: any[], platform: string, titleKey: string, difficultyKey: string, linkPrefix: string) => {
  return results.map(result => ({
    title: result.item[titleKey],
    difficulty: result.item[difficultyKey] || 'Unknown',
    platform,
    link: platform === 'LeetCode'
    ? result.item.link 
    : platform === 'Hacker Rank'
    ? result.item.Link
    : `${linkPrefix}${formatQuery(result.item[titleKey])}`,
  }));
};


const searchLocalData = (query: string) => {
  console.log("Original Query:", query);
  const normalizedQuery = normalizeString(query);
  console.log("Normalized Query:", normalizedQuery);

  // Create Fuse instances for each dataset
  const fuseInstances = {
    InterviewBit: createFuseInstance(interviewBitData, ['Title'], 0.0),
    HiveBasic: createFuseInstance(hiveBasicData, ['Title'], 0.0),
    HivePrimary: createFuseInstance(hivePrimaryData, ['Title'], 0.0),
    LeetCode: createFuseInstance(leetcodeData, ['title'], 0.0),   
    HackerRank: createFuseInstance(hackRankData, ['Title'], 0.0),
  };

  // Exact match results
  const exactResults = [
    ...formatResults(fuseInstances.LeetCode.search(normalizedQuery), 'LeetCode', 'title', 'difficulty', ''),
    ...formatResults(fuseInstances.HivePrimary.search(normalizedQuery), 'Hive Primary', 'Title', 'Score', 'https://hive.smartinterviews.in/contests/smart-interviews-primary/problems/'),
    ...formatResults(fuseInstances.HackerRank.search(normalizedQuery), 'Hacker Rank', 'Title', 'Difficulty', ''),
    ...formatResults(fuseInstances.HiveBasic.search(normalizedQuery), 'Hive Basic', 'Title', 'Score', 'https://hive.smartinterviews.in/contests/smart-interviews-basic/problems/'),
    ...formatResults(fuseInstances.InterviewBit.search(normalizedQuery), 'Interview Bit', 'Title', 'Difficulty', 'https://www.interviewbit.com/problems/'),
  ];

  // Create a set of exact match titles to avoid duplication
  const exactMatchTitles = new Set(exactResults.map(result => result.title.toLowerCase()));

  // Fuzzy match results, but filter out titles already found in exact matches
  const fuzzyResults = [

    ...formatResults(
      createFuseInstance(hivePrimaryData, ['Title'], 0.2).search(normalizedQuery), 
      'Hive Primary', 
      'Title', 
      'Score', 
      'https://hive.smartinterviews.in/contests/smart-interviews-primary/problems/'
    ).filter(result => 
      !exactMatchTitles.has(result.title.toLowerCase()) && // Avoid duplicates
      result.title.toLowerCase().includes(normalizedQuery.charAt(0).toLowerCase()) // Filter by first letter match
    ),

    ...formatResults(
      createFuseInstance(leetcodeData, ['title'], 0.2).search(normalizedQuery), 
      'LeetCode', 
      'title', 
      'difficulty', 
      ''
    ).filter(result => 
      !exactMatchTitles.has(result.title.toLowerCase()) && // Avoid duplicates
      result.title.toLowerCase().includes(normalizedQuery.charAt(0).toLowerCase()) // Filter by first letter match
    ),

    ...formatResults(
      createFuseInstance(hackRankData, ['Title'], 0.2).search(normalizedQuery), 
      'Hacker Rank', 
      'Title', 
      'Difficulty', 
      ''
    ).filter(result => 
      !exactMatchTitles.has(result.title.toLowerCase()) && // Avoid duplicates
      result.title.toLowerCase().includes(normalizedQuery.charAt(0).toLowerCase()) // Filter by first letter match
    ),

    ...formatResults(
      createFuseInstance(hiveBasicData, ['Title'], 0.2).search(normalizedQuery), 
      'Hive Basic', 
      'Title', 
      'Score', 
      'https://hive.smartinterviews.in/contests/smart-interviews-basic/problems/'
    ).filter(result => 
      !exactMatchTitles.has(result.title.toLowerCase()) && // Avoid duplicates
      result.title.toLowerCase().includes(normalizedQuery.charAt(0).toLowerCase()) // Filter by first letter match
    ),

    ...formatResults(
      createFuseInstance(interviewBitData, ['Title'], 0.2).search(normalizedQuery), 
      'Interview Bit', 
      'Title', 
      'Difficulty', 
      'https://www.interviewbit.com/problems/'
    ).filter(result => 
      !exactMatchTitles.has(result.title.toLowerCase()) && // Avoid duplicates
      result.title.toLowerCase().includes(normalizedQuery.charAt(0).toLowerCase()) // Filter by first letter match
    ),
  ];

  console.log("Exact Results:", exactResults);
  console.log("Fuzzy Results:", fuzzyResults);

  // Combine exact results first, then fuzzy results (without duplicates)
  return [...exactResults, ...fuzzyResults];
};

export default searchLocalData;
