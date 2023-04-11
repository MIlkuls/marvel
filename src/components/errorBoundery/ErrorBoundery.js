import { Component } from "react";
import ErrorMessage from "../error/Erros";

class ErrorBoundery extends Component {
    state = {
        error:false
    }

    componentDidCatch(error, errorInfo){
        this.setState(
            {error:true}
        )
    }
    render(){
        if (this.state.error){
            return <ErrorMessage/>
        }
        return this.props.children;
    }
}

export default ErrorBoundery;