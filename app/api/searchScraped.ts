import interviewBitData from '../../public/data/interviewBitProblems.json';
import hiveBasicData from '../../public/data/problemsFromHiveBasic.json';
import hivePrimaryData from '../../public/data/problemsFromPrimary.json';
import Fuse from 'fuse.js';
import leetcodeData from '../../public/data/leetcode_problems.json';

// Function to format the query string as per the given rules
const formatQuery = (query: string) => {
  const modifiedQuery = query.replace(/&/g, 'and').replace(/'/g, '');
  return modifiedQuery
    .toLowerCase()
    .split(' ')
    .join('-')
    .replace(/--+/g, '-')
    .replace(/-+/g, '-');
};

const normalizeString = (str: string | undefined) => {
  return typeof str === 'string' ? formatQuery(str) : '';
};

const searchLocalData = (query: string) => {
  console.log("Original Query:", query);
  const normalizedQuery = normalizeString(query);
  console.log("Normalized Query:", normalizedQuery);

  // Create Fuse instances for each dataset with exact match option
  const interviewBitFuse = new Fuse(interviewBitData, {
    keys: ['Title'],
    threshold: 0.0, // For exact matches
  });

  const hiveBasicFuse = new Fuse(hiveBasicData, {
    keys: ['Title'],
    threshold: 0.0,
  });

  const hivePrimaryFuse = new Fuse(hivePrimaryData, {
    keys: ['Title'],
    threshold: 0.0,
  });

  const leetcodeFuse = new Fuse(leetcodeData, {
    keys: ['title'],
    threshold: 0.0,
  });

  // First search for exact matches
  const interviewBitExactMatches = interviewBitFuse.search(normalizedQuery);
  const leetcodeExactMatches = leetcodeFuse.search(normalizedQuery);
  const hiveBasicExactMatches = hiveBasicFuse.search(normalizedQuery);
  const hivePrimaryExactMatches = hivePrimaryFuse.search(normalizedQuery);

  // Map exact matches to desired format
  const exactResults = [
    ...interviewBitExactMatches.map(result => ({
      title: result.item.Title,
      difficulty: result.item.Difficulty || 'Unknown',
      platform: 'Interview Bit',
      link: `https://www.interviewbit.com/problems/${formatQuery(result.item.Title)}`,
    })),
    ...leetcodeExactMatches.map(result => ({
      title: result.item.title,
      difficulty: result.item.difficulty || 'Unknown',
      platform: 'LeetCode',
      link: result.item.link,
    })),
    ...hiveBasicExactMatches.map(result => ({
      title: result.item.Title,
      difficulty: result.item.Score || 'Unknown',
      platform: 'Hive Basic',
      link: `https://hive.smartinterviews.in/contests/smart-interviews-basic/problems/${formatQuery(result.item.Title)}`,
    })),
    ...hivePrimaryExactMatches.map(result => ({
      title: result.item.Title,
      difficulty: result.item.Score || 'Unknown',
      platform: 'Hive Primary',
      link: `https://hive.smartinterviews.in/contests/smart-interviews-primary/problems/${formatQuery(result.item.Title)}`,
    })),
  ];

  // Next, search for fuzzy matches
  const interviewBitFuseFuzzy = new Fuse(interviewBitData, {
    keys: ['Title'],
    threshold: 0.3,
  });

  const hiveBasicFuseFuzzy = new Fuse(hiveBasicData, {
    keys: ['Title'],
    threshold: 0.3,
  });

  const hivePrimaryFuseFuzzy = new Fuse(hivePrimaryData, {
    keys: ['Title'],
    threshold: 0.3,
  });

  const leetcodeFuseFuzzy = new Fuse(leetcodeData, {
    keys: ['title'],
    threshold: 0.3,
  });

  const interviewBitFuzzyResults = interviewBitFuseFuzzy.search(normalizedQuery).map(result => ({
    title: result.item.Title,
    difficulty: result.item.Difficulty || 'Unknown',
    platform: 'Interview Bit',
    link: `https://www.interviewbit.com/problems/${formatQuery(result.item.Title)}`,
  }));

  const leetcodeFuzzyResults = leetcodeFuseFuzzy.search(normalizedQuery).map(result => ({
    title: result.item.title,
    difficulty: result.item.difficulty || 'Unknown',
    platform: 'LeetCode',
    link: result.item.link,
  }));

  const hiveBasicFuzzyResults = hiveBasicFuseFuzzy.search(normalizedQuery).map(result => ({
    title: result.item.Title,
    difficulty: result.item.Score || 'Unknown',
    platform: 'Hive Basic',
    link: `https://hive.smartinterviews.in/contests/smart-interviews-basic/problems/${formatQuery(result.item.Title)}`,
  }));

  const hivePrimaryFuzzyResults = hivePrimaryFuseFuzzy.search(normalizedQuery).map(result => ({
    title: result.item.Title,
    difficulty: result.item.Score || 'Unknown',
    platform: 'Hive Primary',
    link: `https://hive.smartinterviews.in/contests/smart-interviews-primary/problems/${formatQuery(result.item.Title)}`,
  }));

  console.log("Exact Results:", exactResults);
  console.log("Fuzzy Results:", {
    interviewBitFuzzyResults,
    hiveBasicFuzzyResults,
    hivePrimaryFuzzyResults,
    leetcodeFuzzyResults
  });

  // Combine results: Exact matches first, then fuzzy matches
  return [...exactResults, ...leetcodeFuzzyResults, ...interviewBitFuzzyResults, ...hiveBasicFuzzyResults, ...hivePrimaryFuzzyResults];
};

export default searchLocalData;
