import { useContext } from "react";
import { StateContext, DispatchContext } from "./StateProvider";

type SearchBarProps = {
  updateFilterActionTypeName: string;
};

export default function SearchBar({
  updateFilterActionTypeName,
}: SearchBarProps) {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <form>
        <input
          type="text"
          value={state.workoutFilterText}
          onChange={(e) =>
            dispatch({
              type: updateFilterActionTypeName,
              payload: e.target.value,
            })
          }
          placeholder="Start typing to filter..."
          className="input mt-2 w-full text-gray-500"
        />
      </form>
    </>
  );
}
