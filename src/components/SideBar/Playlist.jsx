import React from "react";

function Playlist() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl  ">
      <div className="flex flex-col gap-4  bg-neutral-800 rounded-2xl p-4   ">
        <div className="flex flex-col gap-2 p-2">
          <h3 className="font-semibold">İlk çalma listeni oluştur</h3>
          <p className="text-sm">Çok kolay.Sana yardımcı olacağız</p>
        </div>
        <div className="p-2">
          <button className="bg-white font-semibold text-sm text-black py-1 px-4 rounded-3xl">
            Çalma listesi oluştur
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4  bg-neutral-800 rounded-2xl p-4   ">
        <div className="flex flex-col gap-2 p-2">
          <h3 className="font-semibold">
            Takip etmek isteyeceğin podcast'ler bulalım
          </h3>
          <p className="text-sm">
            Yeni bölümler yayınlandığında sana haber vereceğiz
          </p>
        </div>
        <div className="p-2">
          <button className="bg-white font-semibold text-sm text-black py-1 px-4 rounded-3xl">
            Podcast'lere göz at
          </button>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
