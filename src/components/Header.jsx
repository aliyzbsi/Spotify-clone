import { useEffect, useState } from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { PiBrowser } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
const MobileHeader = ({ onMenuToggle }) => (
  <div className="w-full bg-black fixed top-0 left-0 z-50 flex items-center justify-between py-3 px-4 gap-4 text-white">
    <img src="../../public/assets/white-logo.png" className="w-10" alt="Logo" />

    <div className="flex gap-2 items-center justify-center ">
      <button>
        <IoIosSearch color="white" size={24} />
      </button>
      <button className="bg-white py-2 px-4 font-semibold text-black rounded-full">
        Uygulamayı Aç
      </button>
      <button onClick={onMenuToggle} className="flex md:hidden items-center">
        <GiHamburgerMenu />
      </button>
    </div>
  </div>
);

const DesktopHeader = ({ navigate, loggedUser, logOut }) => (
  <div className="w-full bg-black fixed top-0 left-0 z-50 flex items-center justify-between py-2 px-4 gap-4 text-white">
    <img src="../../public/assets/white-logo.png" className="w-10" alt="Logo" />

    <div className="flex gap-4 items-center justify-center ">
      <div className="relative group">
        <MdHomeFilled
          color="white"
          size={40}
          className="bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition hover:w-11 hover:h-11"
          onClick={() => navigate("/")}
        />
        <div className="absolute left-1/2 top-20 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          Anasayfa
        </div>
      </div>
      <div className="relative flex items-center flex-grow">
        <div className="relative group">
          <IoIosSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            color="white"
            size={24}
          />
          <div className="absolute left-1/2 top-20 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            Ara
          </div>
        </div>

        <input
          className="py-3 pl-12 pr-64 rounded-full bg-slate-900 text-white w-full hover:bg-slate-700"
          type="text"
          placeholder="Ne çalmak istiyorsun?"
        />

        <div className="relative group">
          <PiBrowser
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            size={24}
            color="white"
          />
          <div className="absolute left-1/2 top-20 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            Göz At
          </div>
        </div>
      </div>
    </div>
    {loggedUser ? (
      <div className="hidden md:flex gap-8">
        <button className="font-semibold text-gray-500 hover:font-bold hover:text-white">
          <FaRegBell size={20} />
        </button>
        <div>
          <button
            onClick={logOut}
            className="bg-white w-10 text-black flex  justify-center px-6 py-3 rounded-full font-semibold hover:bg-slate-200"
          >
            {loggedUser.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>
    ) : (
      <div className="hidden md:flex gap-8">
        <button className="font-semibold text-gray-500 hover:font-bold hover:text-white">
          Kaydol
        </button>
        <div>
          <button
            onClick={() => navigate("/login")}
            className="bg-white w-40 text-black text-center px-8 py-3 rounded-full font-semibold hover:bg-slate-200"
          >
            Oturum Aç
          </button>
        </div>
      </div>
    )}
  </div>
);
const Menu = ({ isOpen, onClose }) => (
  <div
    className={`absolute top-0 left-0 w-full h-screen bg-black bg-opacity-80 transition-all duration-300 ease-in-out ${
      isOpen ? "block" : "hidden"
    }`}
  >
    <div className="bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Menü</h2>
      <button className="block mb-2" onClick={onClose}>
        Oturum Aç
      </button>
      <button className="block mb-2" onClick={onClose}>
        Kaydol
      </button>
      <button className="block mb-2" onClick={onClose}>
        Premium
      </button>
      <button className="block mb-2" onClick={onClose}>
        Yardım
      </button>
      <button className="block mb-2" onClick={onClose}>
        İndir
      </button>
      <button className="block mb-2" onClick={onClose}>
        Gizlilik Hükümleri
      </button>
    </div>
  </div>
);
function Header({ loggedUser, setLoggedUser }) {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const logOut = () => {
    setTimeout(() => {
      setLoggedUser(null);
      toast.success("Çıkış yapıyorsunuz !");
    }, 2000);
  };

  return (
    <div>
      {isMobile ? (
        <>
          <MobileHeader onMenuToggle={() => setMenuOpen(!menuOpen)} />
          <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
      ) : (
        <DesktopHeader
          navigate={navigate}
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
          logOut={logOut}
        />
      )}
    </div>
  );
}

export default Header;
