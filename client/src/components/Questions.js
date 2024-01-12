import React, { useEffect, useState } from 'react'
import { useFetchQuestions } from '../hooks/useFetchQuestions'

import { useDispatch, useSelector } from 'react-redux'
import { updateResult } from '../hooks/setResult'

function Questions({onChecked}) {
    const [checked, setChecked] = useState(undefined)
    const {trace} = useSelector(state => state.questions)
    const result = useSelector(state => state.result.result)
    const [{isLoading, apiData, serverError}] = useFetchQuestions()
      
    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    // const trace = useSelector(state => state.questions.trace)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(updateResult({trace, checked}))
    }, [trace, checked])

    function onSelect(i){        
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({trace, checked}))
    }
    if(isLoading) return <h3 className='text-light'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>{serverError || 'Unknown Error'}</h3>
    return (
        <div className='questions'>
            <h2>{questions?.question}</h2>
            <ul key={questions?.id}>
                {
                    questions?.options.map((q, i)=> (
                <li key={i}>
                    <input
                    type='radio'
                    value={false}
                    name='options'
                    id={`q${i}-option`}
                    onChange={() => onSelect(i)}
                    />
                <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                    <div className={`check ${result[trace]===i ? 'checked' : ''}`}></div>
                </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Questions
