import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto my-8">
        <div className="flex items-center justify-between">
          <input type="text" placeholder="First Name" className="py-3 px-4 rounded-md focus:ring outline-none border" />
          <input type="text" placeholder="Last Name" className="py-3 px-4 rounded-md focus:ring outline-none border" />
          <input type="text" placeholder="Email" className="py-3 px-4 rounded-md focus:ring outline-none border" />
          <input type="text" placeholder="Address" className="py-3 px-4 rounded-md focus:ring outline-none border" />
        </div>
        <button className="bg-blue-700 font-bold text-white w-full rounded-md py-3 my-4 active:ring">Search</button>
      </div>
    </div>
  );
}

export default App;
