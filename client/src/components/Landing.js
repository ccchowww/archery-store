import React, { Component } from 'react';
import './styles/Landing.css';


class Landing extends Component {
    render() {
        return (
            <div>
            <div className="landing-input-container-1">
                <input
                    className="landing-input-1"
                    disabled={true}
                    value="Archery store"
                    />
            </div>
            <div className="landing-input-container-2">
                <input
                    className="landing-input-2"
                    disabled={true}
                    value="- Get, Add, Edit and Delete Orders."
                    />
            </div>
            <div className="landing-input-container-3">
                <input
                    className="landing-input-3"
                    disabled={true}
                    value="- Built with {"
                    />
            </div>
            <div className="landing-input-container-4">
                <input
                    className="landing-input-4"
                    disabled={true}
                    value="Mongoose,"
                    />
            </div>
            <div className="landing-input-container-5">
                <input
                    className="landing-input-5"
                    disabled={true}
                    value="Express,"
                    />
            </div>
            <div className="landing-input-container-6">
                <input
                    className="landing-input-6"
                    disabled={true}
                    value="React,"
                    />
            </div>
            <div className="landing-input-container-7">
                <input
                    className="landing-input-7"
                    disabled={true}
                    value="Node"
                    />
            </div>
            <div className="landing-input-container-8">
                <input
                    className="landing-input-8"
                    disabled={true}
                    value="};"
                    />
            </div>
            <div className="landing-input-container-9">
                <input
                    className="landing-input-9"
                    disabled={true}
                    value="- and over 900 lines of CSS"
                    />
            </div>
            <div className="landing-input-container-10">
                <input
                    className="landing-input-10"
                    disabled={true}
                    value="..."
                    />
            </div>
        </div>
            );
    }
}

export default Landing;