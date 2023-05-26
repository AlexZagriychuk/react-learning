import { Component } from "react"

type Props = {
    initialCount: number;
}
    
type State = {
    count: number;
}

class CounterClassComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            count: props.initialCount
        }
    }
    
    handleCountChange = () => {
        this.setState({
            count: this.state.count + 1 
        })
    }

    render() {
        return (
            <div>
                <h2>CounterClassComponent</h2>
                <button onClick={this.handleCountChange}>Increment count</button>
                <div>Count is: {this.state.count}</div>
            </div>
        )
    }
}

export default CounterClassComponent
