import { Component, h } from "preact";
import "./App.css";
import DeviewInfinite from "../preact-deview-infinite/";

interface AppProps {}
interface AppState {
  name: string;
  list: number[];
}

export default class App extends Component<AppProps, AppState> {
  num = 0;
  constructor(props) {
    super(props);

    this.state = {
      name: "React",
      list: []
    };
  }

  render() {
    const list = this.state.list;
    return (
      <div>
        <header>
          <p>
            DEVIEW 2019
            <br />
            Cross Framework Component
            <br />
            Preact Infinite Demo
          </p>
        </header>
        <div className="list">Items: {list.join(", ")}</div>
        <button className="shuffle" onClick={this.shuffle}>
          Shuffle
        </button>
        <DeviewInfinite
          options={{ margin: 5 }}
          onAppend={this.onAppend}
          className="container"
        >
          {list.map(num => {
            return (
              <div className="item" key={num}>
                Item {num}
              </div>
            );
          })}
        </DeviewInfinite>
      </div>
    );
  }
  onAppend = () => {
    const list = this.state.list;

    this.setState({
      list: [...list, ++this.num]
    });
  };
  shuffle = () => {
    const list = this.state.list;

    list.sort(() => Math.random() - 0.5);

    this.setState({
      list: [...list]
    });
  };
}
