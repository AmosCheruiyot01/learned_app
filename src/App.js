import { useState,useEffect } from "react";
import "./style.css"
import  supabase  from "./superbase";
const CATEGORY = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];


// function Counter(){

//   const [count, setCount] = useState(0);


//   return<div>
//     <span style={{fontSize: "40px"}}>{count}</span>
//     <button className="btn btn-large" onClick={() => {
//       setCount(count + 1)
//     }}>+1</button>
//   </div>
// }

function App() {
  const [facts, setFacts] = useState([]);
  const[showForm, setShowForm] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {



    async function getFacts(){
      // setIsLoading(true);
    const { data: facts, error } = await supabase
    .from('facts')
    .select('*');
    if(!error){
      setFacts(facts);
    }else{
      alert("error fetching the data from the server");
    }
    }
    getFacts();
  }, [facts]);

  return (
   <>
<Header showForm = {showForm} setShowForm= {setShowForm}/>    
{showForm?<NewFactForm setFacts={setFacts} setShowForm={setShowForm}/>: null}

  <main className="main">
  <CategoryFilter/>
  {/* {isLoading? <Loader/>: } */}
  <FactList facts={facts}/>

  
 
</main>

   </>
  );
}

// function Loader(){
//   return <p>loading....</p>
// }

function Header({ showForm, setShowForm}){

  const appTitle = "today i learned ";

  return <header className="header">
  <div className="logo">
    <img
      src="logo.png"
      height="68"
      width="68"
      alt="Today I Learned Logo"
    />
    <h1>{appTitle}</h1>
  </div>

  <button className="btn btn-large btn-open" onClick={() => setShowForm((show) => !show)}>{showForm?'close' : 'share a fact'}</button>
</header>
}

function IsValidHttpUrl(string){
  let url;
  try{
    url = new URL(string);
  }catch(_){
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:"
}

function NewFactForm({setFacts, setShowForm}){
const [text, setText] = useState("");
const[source, setSource] = useState("http://example.com");
const[category, setCategory] = useState("");
const txtLength = text.length;


function handleSubmit(e){
e.preventDefault();
console.log(text, source, category);

//check if the data is valid
if(text && category && IsValidHttpUrl(source) && txtLength <= 200){
  // console.log('valid data');
// create a new fact object
const newFact = {
  id: Math.round(Math.random() * 1000000),
    text,
    source,
    category,
    votesInteresting: 0,
    votesMindblowing: 0,
    votesFalse: 0,
    createdIn: new Date().getFullYear(),
}

// add the new fact to the list of facts
setFacts([newFact, ...initialFacts]);
// clear the form
setText("");
setSource("");
setCategory("");

// close the form
setShowForm(false);
}
}

  return <form className="fact-form " onSubmit={handleSubmit}>
        <input type="text" placeholder="Share a fact with the world..." value={text} onChange={(e) => setText(e.target.value)}/>
        <span>{200-txtLength}</span>
        <input type="text" placeholder="Trustworthy source..." value={source} onChange={(e) => setSource(e.target.value)}/>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Choose category:</option>
          {CATEGORY.map((cat) => <option key={cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>)}
        </select>
        <button className="btn btn-large">Post</button>
     
  </form>
}




function CategoryFilter() {
  return <aside><ul>

<li className="category">
              <button className="btn btn-all-categories">All</button>
            </li>

    {CATEGORY.map((cat) => 
    <li key={cat.name} className="category">
              <button
                className="btn btn-category"
                style={{backgroundColor: cat.color}}
              >
               {cat.name}
              </button>
            </li>
    )}
    
    </ul></aside>
}

function FactList({facts}){


  return <section><ul className="facts-list">
    {facts.map((fact) => 
   ( <li key={fact.id} className="fact">
   <p>
     {fact.text}
     <a
       className="source"
       href={fact.source}
       target="_blank"
       >(Source)</a
     >
   </p>
   <span className="tag" style={{ backgroundColor: CATEGORY.find((cat) => cat.name === fact.category).color }}
     >{fact.category}</span
   >
   <div className="vote-buttons">
     <button>👍 {fact.votesInteresting}</button>
     <button>🤯 {fact.votesMindblowing}</button>
     <button>⛔️ {fact. votesFalse}</button>
   </div>
 </li>
)
    )}
    </ul>
    <p>there  are {facts.length} fact in DataBase</p>
    </section>
}

export default App;
