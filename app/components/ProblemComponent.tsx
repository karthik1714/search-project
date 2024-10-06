
import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import { Link } from "@nextui-org/link";


interface ProblemCardProps {
  questionId?:string;
  title: string;
  difficulty: string;
  platform: string;
  link: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ questionId , title, difficulty, platform, link }) => {

  const getPlatformLogo = (platform: string) => {
    switch(platform) {
      case 'LeetCode':
        return (
          <img src="/logos/leetcode_light.png" alt="LeetCode" width={40} height={40} />
        );
      case 'Interview Bit':
        return (
          <img src="/logos/IN.png" alt="Interview Bit" width={40} height={40} />
        );
      case 'Hive Basic':
        return (
          <img src="/logos/SI.avif" alt="Hive Basic" width={40} height={40} />
        );
      case 'Hive Primary':
        return (
          <img src="/logos/SI.avif" alt="Hive Primary" width={40} height={40} />
        );
      // Add more cases for additional platforms as needed
      default:
        return null; // Fallback if the platform doesn't match
    }
  };

  return (
    <Card isHoverable css={{ mw: "400px", p: "$6", my: "$4", height: 'auto', overflow: 'hidden' }}>
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
              <h3 style={{ margin: 2, fontSize: '1.2rem', fontWeight: 'bold' }}>{title}</h3>
            </Link>
          </div>

          {/* Difficulty */}
          <div>
            <span style={{ fontSize: '0.9rem', fontWeight: '500'}} className={`font-bold ${
                  difficulty === 'Easy'
                    ? 'text-green-500'
                    : difficulty === 'Medium'
                    ? 'text-yellow-500'
                    : difficulty === 'Very Easy'
                    ? 'text-green-300'
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