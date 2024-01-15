import { useState } from 'react';
import { dataImages } from '../../utils/dataImages';

function App() {
  const [shift, setShift] = useState(1);
  const [size, setSize] = useState(130);
  const [countImg, setCounttImg] = useState(3);
  const [transition, setTransition] = useState(0);
  const [position, setPosition] = useState(0);
  const [isInfinity, setIsInfinity] = useState(false);

  const lengthImg = dataImages.length;

  const start = 0;
  let end = (lengthImg * -1) + +countImg;

  const pressNextButton = () => {
    const newPosition = position - shift;

    if (newPosition <= start && newPosition >= end) {
      setPosition(newPosition);
    } else if (isInfinity) {
      setPosition(start);
    } else {
      setPosition(end);
    }
  }

  const pressPrevButton = () => {
    const newPosition = position + +shift;

    if (newPosition <= start && newPosition >= end) {
      setPosition(newPosition);
    } else if (isInfinity) {
      setPosition(end);
    } else {
      setPosition(start);
    }
  }

  const handleTransition = (value) => {
    if (value > 0 && value <= 5) {
      setTransition(value);
    } else if (value === '') {
      setTransition(0);
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100svh'}}>
      
      <div style={{display: 'flex', justifyContent: 'center', gap: '35px'}}>
        <fieldset>
          <legend>Photo Size</legend>
          <input type="range" value={size} max={200} min={100} onChange={(e) => {setSize(e.target.value)}} />
        </fieldset>

        <fieldset>
          <legend>Image Count</legend>
          <select onChange={(e) => {setCounttImg(e.target.value)}}>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </fieldset>

          <fieldset>
            <legend>Transition</legend>
            <input type='number' value={transition} min={0} max={5} onChange={(e) => {handleTransition(e.target.value)}} />
          </fieldset>

          <fieldset>
            <legend>Step</legend>
            <input type='number' value={shift} min={1} max={lengthImg} onChange={(e) => {setShift(e.target.value)}} />
          </fieldset>

          <fieldset>
            <legend>Infinity?</legend>
            <input type="radio" name='infinity' checked={isInfinity} onChange={() => setIsInfinity(true)}/> Yes
            <input type="radio" name='infinity' checked={!isInfinity} onChange={() => setIsInfinity(false)}/> No
          </fieldset>
      </div>

      <div style={{alignSelf: 'center', display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div style={{width: `${countImg * size}px`, height: `${size}px`, overflow: 'hidden', position: 'relative'}}>
          <div style={{display: 'flex', left: `${position * size}px`, transition: `${transition}s`, position: 'relative'}}>
            {dataImages.map(({name, src}) => (
              <img src={src} className='App__img' alt={name} style={{ minWidth: `${size}px`, height: `${size}px`}} />
            ))}
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'center', gap: '30px'}}>
          <button onClick={pressPrevButton}>Prev</button>
          <button onClick={pressNextButton}>Next</button>
        </div>
      </div>

      <div></div>

    </div>
  );
}

export default App;
