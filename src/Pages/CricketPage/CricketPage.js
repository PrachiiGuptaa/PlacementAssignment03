import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {CrcicketQuestion} from '../../RecoilState/CricketQuizQuest/CricketQuizQuest'
import style from './Cricket.module.css'

export default function CricketPage(){
  const[count , setCount]=useState(0)
  const[result , setResult]=useState("")
  const [correctAnswer , setCorrectAnswer] = useState(0)
  const[show , setShow]=useState(false)
  const [question,setQuestion] = useRecoilState(CrcicketQuestion)
  
  function next(){
   setCount(count + 1)
  }

  function countCorrectAnswer(x){
   console.log(x,"selected option")
   
   if(x.isCorrect === true){
     setCorrectAnswer(correctAnswer+2)
     console.log(correctAnswer+2 , "points of answer")
    }
   
  }

  function submit(){
    setShow(true)
    if(correctAnswer < 6){
      setResult("FAIL")
 
    }else{
      setResult("PASS")
 
    }
  }

  return(
    <>
    <div className={style.wrapper}>
    <h1 className={style.Link}><Link to='/' style={{textDecoration: "none", color: "white"}}><span >Home Page</span></Link></h1>
    {show ? 
      <>
      {result=== "FAIL" ? <p className={style.score}>Oops! Try your luck next time</p> : "" }
      {result=== "PASS" ?<p className={style.score} style={{color: "red"}}>Kudos! You won</p> : "" }
    <p className={style.score}>Your Score Is <span className={style.Home}>{correctAnswer}</span> And You Are {result}</p>
    </> :
    <div  className={style.box}>
    <h3 className={style.Question}>{question[count].Qusetion}</h3>
    <div className={style.option}>
    <span  className={style.option}>{question[count].Option.map(x=><button  className={ style.btn }  onClick={()=>countCorrectAnswer(x)}>{x.Option}</button>)}</span>
    {count===4 ? <button className={style.Next} onClick={submit}>Submit</button> :
    <button className={style.Next} onClick={next}>Next</button>
}
</div>

    </div>
}
   

</div>
</>
  )
}