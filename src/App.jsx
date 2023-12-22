import { useState, useCallback, useEffect ,useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (character) {
      str += "!@#$%^&*-_+=[]{}~`";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  const copyPaste=()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto text-center shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4"'>
          <input
            type="text"
            placeholder="password"
            readOnly
            className="outline-none w-full py-1 px-3"
            value={password}
            ref={passwordRef}
          />

          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPaste}>
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={5}
              max={100}
              className="cursor-pointer"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput"> Numbers</label>
          </div>

          <div>
            <input
              type="checkbox"
              defaultChecked={character}
              id="numberInput"
              onChange={() => {
                setCharacter((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput"> Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
