import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import {useSelector, useDispatch} from 'react-redux'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/useFetchQuestions'
import { PushAnswer } from '../hooks/setResult'
import {Navigate} from 'react-router-dom'

function Quiz() {
    const [check, setChecked] = useState(undefined)
    const result = useSelector(state => state.result.result)
    const {queue, trace} = useSelector(state => state.questions)
    const dispatch = useDispatch()

    // useEffect(()=>{
    //     console.log(result)
    // })

    function onNext(){
        if(trace < queue.length){
            dispatch(MoveNextQuestion())
            if(result.length <= trace){
                dispatch(PushAnswer(check))
            }
        }
        setChecked(undefined)
    }
    function onPrev(){
        console.log('On previous click')
        if(trace > 0){
            dispatch(MovePrevQuestion())
        }
    }
    function onChecked(check){
        console.log(check)
        setChecked(check)
    }

    if(result.length && result.length >= queue.length){
        return <Navigate to={'/result'} replace='true'></Navigate>
    }

    return (
        <div className='container'>
            <h1 className='title'>Quiz Questions</h1>
            <div style={{flexDirection: 'row'}}>
                <Questions onChecked={onChecked} />
                <div className='flex'>
                {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Quiz
