import * as React from "react"
import { Link } from 'react-router-dom';
import "./Status.scss";

interface StatusProps {}

interface StatusState {
    status?: any
}

class Status extends React.Component<StatusProps, StatusState> {

    constructor(props) {
        super(props);
        this.state = {
            status: null
        };
    }

    componentDidMount() {
        fetch('/v1/nodeState')
            .then((result) => {
                return result.json();
            })
            .then((rsp) => {
                let status = (
                    <div>
                        <table className="status-table">
                            <thead>
                            <tr role="row">
                                <th className="key-col">&nbsp;</th>
                                <th className="value-col">&nbsp;</th>
                                <th className="key-col">&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="align-right">blockHeight</td>
                                    <td><Link to={`/block/${rsp.blockHeight}`}>{rsp.blockHeight}</Link></td>
                                    <td className="align-right">blockLastHash</td>
                                    <td>{rsp.blockLastHash}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">networkId</td>
                                    <td>{rsp.networkId}</td>
                                    <td className="align-right">numConnections</td>
                                    <td>{rsp.numConnections}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">numKnownPeers</td>
                                    <td>{rsp.numKnownPeers}</td>
                                    <td className="align-right">uptime</td>
                                    <td>{rsp.uptime}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">version</td>
                                    <td>{rsp.version}</td>
                                    <td className="align-right">state</td>
                                    <td>{rsp.state}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );

                this.setState({status: status});
            });
    }

    render() {
        return (
            <div className="app-card">
                <div className="card-title">
                    Status Data
                </div>
                <div className="card-body">
                    {this.state.status}
                </div>
            </div>
        );
    }
}

export default Status;