import { Component } from "react";

export const WithOnChange = WrappedComponent => {
    return class extends Component {
        onChange = e => {
            const obj = {};
            obj[name]=e.target.value;
            this.setState(obj);
        }

        render() {
            return <WrappedComponent {...this.props} onChange={this.onChange} />
        }
    }
}