import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/main.css'
import { useDispatch } from 'react-redux'
import { setUserId } from '../redux/result_reducer'

function Main() {
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
    }
    return (
        <div className='container'>
            <h1 className='title'>Quiz Application</h1>

            <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>10 mpoints is awarded for the correct answer.</li>
                <li>Each question has four options. You can choose only one option.</li>
                <li>You can review and can't change answers before the quiz finish.</li>
                <li>the result will be declared at the end of the quiz.</li>
            </ol>

            <form id='form'>
                <input type='text' ref={inputRef} placeholder='Username' />
            </form>

            <div className='start'>
                <Link className='btn' to={'quiz'} onClick={startQuiz}>Start</Link>
            </div>

        </div>
    )
}

export default Main
