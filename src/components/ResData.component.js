import React, { Component } from 'react';

class ResData extends Component {
    render() {
        return (
            <div className="row">
                <div className="card border-0 shadow-lg mt-2 mb-12 bg-light search-box">
                    <div className="card-body px-5 py-2">
                        <form>
                            <h1 className="mb-1">Results:</h1>
                            <span id="domainName"></span>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResData;