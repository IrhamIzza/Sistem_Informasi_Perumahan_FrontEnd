import HelloWorld from "./penghuni/penghuni";
import { Button } from "./components/ui/button";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Welcome to MyApp</h1>
      </div>
    </div>
  );
}

export default App;
