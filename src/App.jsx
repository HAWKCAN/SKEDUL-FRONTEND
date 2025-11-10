import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <div> 
        <h1 className="color-[]">Halo Dunia!</h1>
        <p>Ini adalah aplikasi React basic tanpa API.</p>
        <h1>SEMOGA PENGENALAN POLA LIBUR</h1>
        <h2>SEMOGA PENGENALAN POLA LIBUR</h2>
        <h3>SEMOGA PENGENALAN POLA LIBUR</h3>
        <form action="" method="POST">
          <label htmlFor="nama" name="nama" id="nama">Nama</label>
          <input type="text" placeholder="masukkan nama Anda"/>
          <input type="submit" value="Kirim" />
        </form>
      </div>
    </>
  );
}

export default App;
