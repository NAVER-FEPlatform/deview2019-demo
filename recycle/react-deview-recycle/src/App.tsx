import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DeviewRecycle from './react-deview-recycle/DeviewRecycle';
import { findDOMNode } from 'react-dom';


interface AppProps { }
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
        return (
            <div>
                <header>
                    <p>
                        DEVIEW 2019
              <br />
                        Cross Framework Component
            </p>
                </header>
                <div className="list">
                    items: {this.state.list.join(", ")} <br />
                    visible: <span id="visible" />
                </div>
                <button className="shuffle" onClick={this.shuffle}>
                    Shuffle
          </button>
                <DeviewRecycle
                    options={{ margin: 5 }}
                    onAppend={this.onAppend}
                    onVisibleChange={this.onVisibleChange}
                    className="container"
                >
                    {this.state.list.map(num => {
                        return (
                            <div className="item" key={num}>
                                Item {num}
                            </div>
                        );
                    })}
                </DeviewRecycle>
            </div>
        );
    }
    onVisibleChange = e => {
        document.querySelector("#visible").innerHTML = `{ start: ${e.start}, end: ${
            e.end
            }}`;
    };
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
