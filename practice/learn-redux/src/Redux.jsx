import { useState } from "react";
import { decrement, increment } from "./counterSlice";
import {useSelector, useDispatch} from "react-redux";

const Redux = () => {

    const count = useSelector((state) => state.counter.value);

    const dispatch = useDispatch();

    const [input, setInput] = useState(0); 

    return (
        <div>
            <h1>This is Redux</h1>

            <div>{count}</div>

            <input type="number" value={input} onChange={(e) => e.target.value} />

            <button onClick={() => (dispatch(increment()))}>Increment</button>
            <button onClick={() => (dispatch(decrement()))}>Decrement</button>

        </div>
    )
}

export default Redux;