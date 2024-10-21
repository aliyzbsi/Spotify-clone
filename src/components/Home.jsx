import Main from "./Lists/Main";
import SideBar from "./SideBar/SideBar";

function Home({ loggedUser }) {
  return (
    <div className=" bg-black text-white">
      <div className="flex  gap-2 p-2  ">
        <div className="w-128 rounded min-w-80 bg-neutral-900 ">
          <SideBar />
        </div>
        <div className="w-full rounded bg-neutral-900">
          <Main />
        </div>
      </div>
    </div>
  );
}

export default Home;
