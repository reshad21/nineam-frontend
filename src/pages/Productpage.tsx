import { decrement, increment } from "../redux/features/cart/counterSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Productpage = () => {
  const count = useAppSelector((state) => state.counter.value);
  console.log(count);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Productpage;
