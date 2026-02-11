import { useAppDispatch } from "@/shared/lib/hooks/reduxHooks";
import { openSearchModal } from "@/shared/lib/redux/ui/uiSlice";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="cursor-pointer"
      onClick={() => dispatch(openSearchModal())}
    >
      <CiSearch size={25} className="hover:fill-blue-500 transition" />
    </button>
  );
};

export default Search;
