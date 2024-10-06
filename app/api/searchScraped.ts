import interviewBitData from '../../public/data/interviewBitProblems.json';
import hiveBasicData from '../../public/data/problemsFromHiveBasic.json';
import hivePrimaryData from '../../public/data/problemsFromPrimary.json';
import leetcodeData from '../../public/data/leetcode_problems.json';
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
    link: `${linkPrefix}${formatQuery(result.item[titleKey])}`,
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
  };

  // First search for exact matches
  const exactResults = [
    ...formatResults(fuseInstances.LeetCode.search(normalizedQuery), 'LeetCode', 'title', 'difficulty', ''),
    ...formatResults(fuseInstances.HiveBasic.search(normalizedQuery), 'Hive Basic', 'Title', 'Score', 'https://hive.smartinterviews.in/contests/smart-interviews-basic/problems/'),
    ...formatResults(fuseInstances.HivePrimary.search(normalizedQuery), 'Hive Primary', 'Title', 'Score', 'https://hive.smartinterviews.in/contests/smart-interviews-primary/problems/'),
    ...formatResults(fuseInstances.InterviewBit.search(normalizedQuery), 'Interview Bit', 'Title', 'Difficulty', 'https://www.interviewbit.com/problems/'),
  ];

  // Next, search for fuzzy matches
  const fuzzyResults = [
    ...formatResults(createFuseInstance(interviewBitData, ['Title'], 0.2).search(normalizedQuery), 'Interview Bit', 'Title', 'Difficulty', 'https://www.interviewbit.com/problems/'),
    ...formatResults(createFuseInstance(leetcodeData, ['title'], 0.2).search(normalizedQuery), 'LeetCode', 'title', 'difficulty', ''),
    ...formatResults(createFuseInstance(hiveBasicData, ['Title'], 0.2).search(normalizedQuery), 'Hive Basic', 'Title', 'Score', 'https://hive.smartinterviews.in/contests/smart-interviews-basic/problems/'),
    ...formatResults(createFuseInstance(hivePrimaryData, ['Title'], 0.2).search(normalizedQuery), 'Hive Primary', 'Title', 'Score', 'https://hive.smartinterviews.in/contests/smart-interviews-primary/problems/'),
  ];

  console.log("Exact Results:", exactResults);
  console.log("Fuzzy Results:", fuzzyResults);

  // Combine results: Exact matches first, then fuzzy matches
  return [...exactResults, ...fuzzyResults];
};

export default searchLocalData;
