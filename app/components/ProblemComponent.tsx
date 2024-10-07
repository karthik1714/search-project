import {Card,  CardBody, CardFooter, Divider} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Link } from "@nextui-org/link";


interface ProblemCardProps {
  questionId?:string;
  title: string;
  difficulty: string;
  platform: string;
  link: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ questionId , title, difficulty, platform, link }) => {
  const { theme } = useTheme();

  const getPlatformLogo = (platform: string) => {

    const logoBasePath = '/logos/';
const lightModeSuffix = '_light.png'; // Light mode logo suffix
const darkModeSuffix = '_dark.png'; // Dark mode logo suffix
const lightModeSuffix_si = '_light.avif'; // Light mode logo suffix for Hive
const darkModeSuffix_si = '_dark.avif'; // Dark mode logo suffix for Hive

// Define size variables
const defaultSize = { width: 40, height: 40 }; // Default size for light mode
const darkSize_si = { width: 19, height: 30 }; // Smaller size for dark mode
const darkSize_leetcode = { width: 30, height: 30 };

switch (platform) {
  case 'LeetCode':
    return (
      <img
        src={`${logoBasePath}leetcode${theme === 'dark' ? darkModeSuffix : lightModeSuffix}`}
        alt="LeetCode"
        width={theme === 'dark' ? darkSize_leetcode.width : defaultSize.width}
        height={theme === 'dark' ? darkSize_leetcode.height : defaultSize.height}
      />
    );
  case 'Interview Bit':
    return (
      <img
        src={`${logoBasePath}IN${theme === 'dark' ? lightModeSuffix : lightModeSuffix}`}
        alt="Interview Bit"
        width={defaultSize.width}
        height={defaultSize.height}
      />
    );
  case 'Hive Basic':
    return (
      <img
        src={`${logoBasePath}Si${theme === 'dark' ? darkModeSuffix_si : lightModeSuffix_si}`}
        alt="Hive Basic"
        width={theme === 'dark' ? darkSize_si.width : defaultSize.width}
        height={theme === 'dark' ? darkSize_si.height : defaultSize.height}
      />
    );
  case 'Hive Primary':
    return (
      <img
        src={`${logoBasePath}Si${theme === 'dark' ? darkModeSuffix_si : lightModeSuffix_si}`}
        alt="Hive Primary"
        width={theme === 'dark' ? darkSize_si.width : defaultSize.width}
        height={theme === 'dark' ? darkSize_si.height : defaultSize.height}
      />
    );
  default:
    return null; // Fallback if the platform doesn't match
}

  };

  return (
    <Card isHoverable style={{ maxWidth: "1400px", padding: "$6", margin: "$4", height: 'auto', overflow: 'hidden' }}>
      <CardBody>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Platform logo */}
          <div style={{ width: '25px', height: '24px' }}>
                {/* Display the platform logo */}
            {getPlatformLogo(platform)}
          </div>
            
          {/* Title and Difficulty */}
          <div style={{ flex: 1 }}>
            <Link href={link} isExternal>
              <h3 style={{ 
                  margin: 1, 
                  fontSize: '1.1rem', 
                  fontWeight: '500', 
                  color: '#696969	',
                  transition: 'color 0.3s' // Smooth transition for the color change
                }} 
                onMouseEnter={(e) => e.currentTarget.style.color = '#3498db'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'grey'}>
                {title}
              </h3>
            </Link>
          </div>
       


          {/* Difficulty */}
          <div>
            <span style={{ fontSize: '0.9rem', fontWeight: '500'}} className={`font-bold ${
                  difficulty === 'Easy' || difficulty === '20' || difficulty === '50'
                    ? 'text-green-500'
                    : difficulty === 'Medium' || difficulty === '100' || difficulty === '150' 
                    ? 'text-yellow-500'
                    : difficulty === 'Very Easy'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}>
              {difficulty}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProblemCard;