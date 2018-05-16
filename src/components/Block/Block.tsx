import * as React from "react"
import { Link } from 'react-router-dom';
import "./Block.scss";

interface BlockProps {
    block: string
}

interface BlockState {
    blockParam?: string,
    blockNumber?: number,
    block?: any,
    transactions?: any
}

class Block extends React.Component<BlockProps, BlockState> {

    constructor(props) {
        super(props);
        this.state = {
            blockParam: props.match.params.block,
            blockNumber: null,
            block: null,
            transactions: null
        };
    }

    componentDidMount() {
        fetch(`/v1/obj/${this.state.blockParam}`)
            .then((result) => {
                return result.json();
            })
            .then((rsp) => {
                // TODO: bad response handling
                let header = rsp && rsp.block ? rsp.block.blockHeader : {};
                let block = (
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
                                    <td className="align-right">blockNumber</td>
                                    <td>{header.blockNumber}</td>
                                    <td className="align-right">epoch</td>
                                    <td>{header.epoch}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">miningNonce</td>
                                    <td>{header.miningNonce}</td>
                                    <td className="align-right">rewardBlock</td>
                                    <td>{header.rewardBlock/1000000000}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">rewardFee</td>
                                    <td>{header.rewardFee/1000000000}</td>
                                    <td className="align-right">timestamp</td>
                                    <td>{header.timestamp}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">hashHeader</td>
                                    <td colSpan={3}>{header.hashHeader}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">hashHeaderPrev</td>
                                    <td colSpan={3}>{header.hashHeaderPrev}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">merkleRoot</td>
                                    <td colSpan={3}>{header.merkleRoot}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">pk</td>
                                    <td colSpan={3}>{header.pk}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
                let transactionRows = rsp.block.transactions.map((tx, idx) => {
                    return (
                        <tr key={idx}>
                            <td>
                                <div title={tx.addrFrom}>from: <Link to={`/addr/${tx.addrFrom}`}>{tx.addrFrom}</Link></div>
                                <div title={tx.addrTo}>&nbsp;&nbsp;to: <Link to={`/addr/${tx.addrTo}`}>{tx.addrTo}</Link></div>
                            </td>
                            <td><div>{tx.amount/1000000000}</div></td>
                            <td><div>{tx.fee}</div></td>
                            <td><div>{tx.nonce}</div></td>
                            <td><div>{tx.otsKey}</div></td>
                        </tr>
                    );
                });
                let transactions = (
                    <table>
                        <thead>
                        <tr role="row">
                            <th className="addrs-col">Addrs</th>
                            <th>Amount</th>
                            <th>Fee</th>
                            <th>Nonce</th>
                            <th>OTS Key</th>
                        </tr>
                        </thead>
                        <tbody>
                            {transactionRows}
                        </tbody>
                    </table>
                );
                this.setState({
                    block: block,
                    blockNumber: header.blockNumber,
                    transactions: transactions
                });
            });
    }

    render() {
        return (
            <div className="app-card">
                <div className="card-title">
                    Block
                    &nbsp;
                    <Link to={`/block/${this.state.blockNumber - 1}`}>&lt;prev</Link>
                    &nbsp;
                    <Link to={`/block/${this.state.blockNumber + 1}`}>next&gt;</Link>
                </div>
                <div className="card-body">
                    {this.state.block}
                </div>
                <div className="card-title">
                    Transactions
                </div>
                <div className="card-body">
                    {this.state.transactions}
                </div>
            </div>
        );
    }
}

export default Block;
