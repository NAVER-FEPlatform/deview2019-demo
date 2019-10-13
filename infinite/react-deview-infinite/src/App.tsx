import React from 'react';
import logo from './logo.svg';
import './App.css';
import DeviewInfinite from './react-deview-infinite/DeviewInfinite';

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
        return <DeviewInfinite
            className="container"
            onAppend={this.onAppend}
            options={{
                margin: 5,
            }}
            >{this.renderItems()}</DeviewInfinite>;
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
