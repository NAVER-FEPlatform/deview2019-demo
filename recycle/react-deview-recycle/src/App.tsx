import React from 'react';
import logo from './logo.svg';
import './App.css';
import DeviewRecycle from './react-deview-recycle/DeviewRecycle';

export default class App extends React.Component {
    public state = {
        list: [0, 1, 2],
    };

    public renderItems() {
        return this.state.list.map((i, index) => {
            return <div className="item" key={i} onClick={() => {
                this.state.list.splice(index, 1);
                this.setState({
                    list: [...this.state.list],
                })
            }}>Item {i}</div>;
        });
    }
    public render() {
        return <DeviewRecycle
            className="container"
            onAppend={this.onAppend}
            options={{
                margin: 5,
            }}
            >{this.renderItems()}</DeviewRecycle>;
    }
    public onAppend = () => {
        console.log("?");
        const list = this.state.list;

        const nextItem = (list[list.length - 1] || 0) + 1

        this.setState({
            list: [...list, nextItem],
        });
    }

}
