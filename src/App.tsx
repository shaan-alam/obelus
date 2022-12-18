import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container md:mx-auto my-8">
        <h1 className="text-4xl my-10 font-medium">Database Search</h1>
        <div className="flex justify-between flex-col md:flex-row md:flex-wrap mx-8 md:mx-0">
          <div className="md:basis-2/5">
            <label className="block text-left font-medium my-2">First Name</label>
            <input type="text" placeholder="Noah" className="shadow py-3 px-4 w-full rounded-md focus:ring outline-none border" />
          </div>
          <div className="mt-5 md:basis-2/5 md:mt-0">
            <label className="block text-left font-medium my-2">Last Name</label>
            <input type="text" placeholder="Smith" className="shadow py-3 px-4 w-full rounded-md focus:ring outline-none border" />
          </div>
          <div className="mt-5 md:basis-2/5">
            <label className="block text-left font-medium my-2">Email</label>
            <input type="text" placeholder="abc@xyz.com" className="shadow py-3 px-4 w-full rounded-md focus:ring outline-none border" />
          </div>
          <div className="mt-5 md:basis-2/5">
            <label className="block text-left font-medium my-2">LinkedIn Username</label>
            <input type="text" placeholder="noah123" className="shadow py-3 px-4 w-full rounded-md focus:ring outline-none border" />
          </div>     
        </div>
        <button className="shadow bg-blue-200 mt-16 md:float-right font-bold text-blue-900 w-2/3 md:w-48 rounded-md py-2.5 my-7 active:ring">Search</button>
      </div>
    </div>
  );
}

export default App;
