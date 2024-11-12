import { FC, useEffect } from "react";
import './CandidateList.css';
import {  useSelector } from "react-redux";
import { RootState } from '../../store/store.ts'
import CandidateItem from "../CandidateItem/CandidateItem.tsx";
import { useAppDispatch } from "../../hooks/useDispatchType.ts";
import { fetchCandidate } from "../../store/features/candidatesSlice.ts";

const CandidateList: FC = () => {
  const {candidates} = useSelector((state:RootState) => state.candidates);
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCandidate())
  
  }, [])
 
 
  return (
    <div className="CandidateList">
      {
        candidates.map((candidate) => (
          <div key={candidate._id}> 
          
          <CandidateItem candidate= {candidate}/>
          </div>
        ))
      }
      
    </div>
  );
};

export default CandidateList;