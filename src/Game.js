import React, { Component } from 'react'
import Board from './Board'
export default class Game extends Component {
  constructor(props){
    super(props);
    this.state={
       history:[
        {
          squares: Array(9).fill(null)
        }
       ]
       , xIsNext:true,
       stepNum:0,

    };
  } 
  handleClick(i){
    const history=this.state.history.slice(0,this.state.stepNum+1);
    const current=history[history.length-1];
    const squares=current.squares.slice();
    if(calculateWinner(squares) || squares[i]) return;
    squares[i]=this.state.xIsNext?'X':'O';
    this.setState(
      {
        history: history.concat([
          {
            squares:squares,
          }
        ]),
        xIsNext : !this.state.xIsNext,
        stepNum: history.length
      }
    );
  }
  jumpTo(step){
        this.setState({
          stepNum:step,
          xIsNext:(step%2)?false:true
        })
  }
   restart(e) {
  
     window.location.reload();
   }
  render() {
    const history=this.state.history;
    const current=history[this.state.stepNum];
    const winner= calculateWinner(current.squares);
    const move=history.map((step,move)=>{
      let desc;
      if(move){
        desc='Go to Move #'+move;
      }    
      else{
        desc='Move to start';
      }
      return <li key={move}>
             <button  className='move' onClick={()=>this.jumpTo(move)}>
                    {desc}
             </button>
      </li>
    });
    let status;
    if(winner){
      status='Winner : ' +winner;
    }
    else{
      status='Next Player: '+ (this.state.xIsNext?'X':'O');
    }
    
    return (
      <div className='game'>
        <div className='name'> Tic-Tac-Toe</div>
         <div className='status'>{status}</div>
        <div className='gameBoard'>  
        <Board
            squares={current.squares}
            onClick={(i)=>this.handleClick(i)}
        />       
        </div>
        <button className='restart' onClick={()=>this.restart()}>Restart</button>
        <div className='game-info'>
          <h1 className='history'>Time Travel</h1>
               <ol className='num'>{move}</ol>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares){
    
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i=0;i<lines.length;i++){
     const [a,b,c]=lines[i];
     if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      
       return squares[a];
     }
  }
  return null;
}
