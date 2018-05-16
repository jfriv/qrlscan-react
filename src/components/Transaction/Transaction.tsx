import * as React from "react"
import { Link } from 'react-router-dom';
import "./Transaction.scss";

interface TransactionProps {
    hash: string
}

interface TransactionState {
    hash?: string,
    transaction?: any
}

class Transaction extends React.Component<TransactionProps, TransactionState> {

    constructor(props) {
        super(props);
        this.state = {
            hash: props.match.params.hash,
            transaction: null
        };
    }

    componentDidMount() {
        fetch(`/v1/tx/${this.state.hash}`)
            .then((result) => {
                return result.json();
            })
            .then((rsp) => {
                // TODO: render message and coinbase
                let transaction = (
                    <div>
                        <table className="key-value-table">
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
                                    <td className="align-right">addrFrom</td>
                                    <td colSpan={3}><Link to={`/addr/${rsp.addrFrom}`}>{rsp.addrFrom}</Link></td>
                                </tr>
                                <tr>
                                    <td className="align-right">addrTo</td>
                                    <td colSpan={3}><Link to={`/addr/${rsp.addrTo}`}>{rsp.addrTo}</Link></td>
                                </tr>
                                <tr>
                                    <td className="align-right">type</td>
                                    <td colSpan={3}>{rsp.type}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">amount</td>
                                    <td>{rsp.amount/1000000000}</td>
                                    <td className="align-right">fee</td>
                                    <td>{rsp.fee/1000000000}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">nonce</td>
                                    <td>{rsp.nonce}</td>
                                    <td className="align-right">otsKey</td>
                                    <td>{rsp.otsKey}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">hash</td>
                                    <td colSpan={3}>{rsp.hash}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">publicKey</td>
                                    <td colSpan={3}>{rsp.publicKey}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">signature</td>
                                    <td colSpan={3}>{rsp.signature}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
                this.setState({
                    transaction: transaction
                });
            });
    }

    render() {
        return (
            <div className="app-card">
                <div className="card-title">
                    Transaction
                </div>
                <div className="card-body">
                    {this.state.transaction}
                </div>
            </div>
        );
    }
}

export default Transaction;