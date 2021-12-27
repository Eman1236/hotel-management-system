import React, { Component } from 'react'

export default class Footer extends Component {

    render() {
        return (
            
            <footer className="bg-dark text-light py-3" style={this.myStyle}>
            {/* <h3>{this.myStyle}</h3> */}
            {/* <h3>{this.props.myStyle.position}</h3> */}
            <p className="text-center">
                Copyright &copy; 2021
            </p>
            </footer>
        )
    }
}
