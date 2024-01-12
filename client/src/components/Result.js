import React from 'react'
import '../styles/results.css'
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable'
import { useDispatch, useSelector } from 'react-redux'
import { resetAllAction } from '../redux/question_reducr'
import { resetResultAction } from '../redux/result_reducer'
import { attempts_Number, earnpoints_Number, flagResult } from '../helper/helper'
import { usePublishResult } from '../hooks/setResult'

function Result() {
    const dispatch = useDispatch()
    const {questions : {queue, answers}, result : {result, userId}} = useSelector(state => state)
    
    const totalPoints = queue.length * 10;
    const attempts = attempts_Number(result)
    const earnPoints = earnpoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)

    
    usePublishResult({
        result,
        username : userId,
        attempts,
        points: earnPoints,
        achived : flag ? 'Passed' : 'Failed'})

    function onRestart(){
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }
    return (
        <div className='container'>
            <h1 className='title'>Your Score</h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <span>Username</span>
                    <span className='bold'>{userId}</span>
                </div>
                <div className='flex'>
                    <span>Total Quiz Points :</span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Questions</span>
                    <span className='bold'>{queue.length || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Attempts</span>
                    <span className='bold'>{attempts || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Earn Points :</span>
                    <span className='bold'>{earnPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Quiz Results</span>
                    <span style={{color: `${flag ? '#2aff95' : '#ff2a66'}`}} className='bold'>{flag ? 'Passed' : 'Failed'}</span>
                </div>
            </div>
            <div className='start'>
                <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
            </div>
            <div className='container'>
                <ResultTable />
            </div>
        </div>
    )
}

export default Result
