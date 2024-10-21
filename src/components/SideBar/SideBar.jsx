import { IoBookOutline } from "react-icons/io5";
import Playlist from "./Playlist";

function SideBar() {
  return (
    <div className="h-[80vh] rounded-xl bg-neutral-900  ">
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-2 items-center p-2">
          <IoBookOutline size={30} />
          <p>Kitaplığın</p>
        </div>
        <div className="text-3xl rounded-full cursor-pointer px-2 hover:bg-neutral-600">
          +
        </div>
      </div>
      <div className="p-3 ">
        <Playlist />
      </div>
    </div>
  );
}

export default SideBar;
