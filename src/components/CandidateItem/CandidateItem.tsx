import { FC, useState } from "react";
import './CandidateItem.css';
import { ICandidate } from "../../types/candidateModel";
import { FaHeart } from 'react-icons/fa';

interface CandidateProps {
  candidate: ICandidate;
}

const CandidateItem: FC<CandidateProps> = ({ candidate }) => {
  const [isVoted, setIsVoted] = useState(false);

  const handleVoteToggle = () => {
    setIsVoted(!isVoted);
  };

  return (
    <div className="CandidateItem">
      <h1>{candidate.name}</h1>
      <img src={candidate.image} alt={candidate.name} />
      <h1>{candidate.votes + (isVoted ? 1 : 0)}</h1>
      <button className="voteButton" onClick={handleVoteToggle}>
        {isVoted ? (
          <FaHeart color="red" />
        ) : (
          <FaHeart color="black" />
        )}
      </button>
    </div>
  );
};

export default CandidateItem;
