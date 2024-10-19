function Home({ loggedUser }) {
  return (
    <div className="h-screen bg-black text-white">
      <div>
        <p>Kullanıcı : {loggedUser}</p>
      </div>
    </div>
  );
}

export default Home;
