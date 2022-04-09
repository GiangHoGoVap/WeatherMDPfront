import React, {Component} from "react"
import UserService from '../../services/UserService'
import Say from 'react-say';

class Brain extends Component {
    constructor(props) {
        super();
        this.state = {
            data: "",
            user_input: props.previousStep.message,
            code: false
        };
    }

    async componentDidMount() {
        const response = await UserService.getChatbotReponse(this.state.user_input)
        this.setState({data: response})
        this.setState({code: true})
    }

    render() {
        return (
            <div>
                {this.state.data}
                {this.state.code && <Say text={this.state.data}/>}
            </div>
        );
    }
}

export default Brain