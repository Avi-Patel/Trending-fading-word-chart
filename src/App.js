import "./styles.css";
import { WordsVisualizer } from "./WordsVisualizer";
import { sampleData } from "./fixtures";

export default function App() {
  return (
    <div className="App">
      <WordsVisualizer data={sampleData} />
    </div>
  );
}
