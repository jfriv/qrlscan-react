import * as React from "react"
import { Link } from 'react-router-dom'
import "./Address.scss";

interface AddressProps {
    address: string
}

interface AddressState {
    addressParam?: string,
    address?: any
}

class Address extends React.Component<AddressProps, AddressState> {

    constructor(props) {
        super(props);
        this.state = {
            addressParam: props.match.params.address,
            address: null
        };
    }

    componentDidMount() {
        fetch(`/v1/addr/${this.state.addressParam}`)
            .then((result) => {
                return result.json();
            })
            .then((rsp) => {
                let transactionHashes = rsp.transactionHashes.map((txHash, idx) => {
                    return (
                        <div key={idx}><Link to={`/tx/${txHash}`}>{txHash}</Link></div>
                    );
                });
                let address = (
                    <div>
                        <table className="key-value-table">
                            <thead>
                            <tr role="row">
                                <th className="key-col">&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="align-right">address</td>
                                    <td>{rsp.address}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">balance</td>
                                    <td>{rsp.balance/1000000000}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">nonce</td>
                                    <td>{rsp.nonce}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">transactions({transactionHashes.length})</td>
                                    <td>{transactionHashes}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
                this.setState({
                    address: address
                });
            });
    }

    render() {
        return (
            <div className="app-card">
                <div className="card-title">
                    Address
                </div>
                <div className="card-body">
                    {this.state.address}
                </div>
            </div>
        );
    }
}

export default Address;