import * as React from "react"
import { Link } from 'react-router-dom';
import "./Latest.scss";

interface LatestProps {}

interface LatestState {
    blocks?: any,
    unconfirmed?: any,
    confirmed?: any
}

class Latest extends React.Component<LatestProps, LatestState> {

    constructor(props) {
        super(props);
        this.state = {
            blocks: [],
            unconfirmed: [],
            confirmed: []
        };
    }

    componentDidMount() {
        fetch('/v1/latest')
            .then((result) => {
                return result.json();
            })
            .then((rsp) => {
                let blocks = rsp.blockheadersList.map((block, idx) => {
                    return (
                        <table key={idx} className="key-value-table">
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
                                    <td><Link to={`/block/${block.blockNumber}`}>{block.blockNumber}</Link></td>
                                    <td className="align-right">epoch</td>
                                    <td>{block.epoch}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">miningNonce</td>
                                    <td>{block.miningNonce}</td>
                                    <td className="align-right">rewardBlock</td>
                                    <td>{block.rewardBlock/1000000000}</td>
                                </tr>
                                <tr>
                                    <td className="align-right">rewardFee</td>
                                    <td><div>{block.rewardFee}</div></td>
                                    <td className="align-right">timestamp</td>
                                    <td><div>{block.timestamp}</div></td>
                                </tr>
                                <tr>
                                    <td className="align-right">hashHeader</td>
                                    <td colSpan={3}><div>{block.hashHeader}</div></td>
                                </tr>
                                <tr>
                                    <td className="align-right">hashHeaderPrev</td>
                                    <td colSpan={3}><div>{block.hashHeaderPrev}</div></td>
                                </tr>
                                <tr>
                                    <td className="align-right">merkleRoot</td>
                                    <td colSpan={3}><div>{block.merkleRoot}</div></td>
                                </tr>
                                <tr>
                                    <td className="align-right">pk</td>
                                    <td colSpan={3}><div>{block.pk}</div></td>
                                </tr>
                            </tbody>
                        </table>
                    );
                });
                let unconfirmed = rsp.unconfirmedTx.length === 0
                    ? (<tr><td colSpan={6}>No unconfirmed transactions...</td></tr>)
                    : rsp.unconfirmedTx.map((tx, idx) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <div title={tx.addrFrom}>from: <Link to={`/addr/${tx.addrFrom}`}>{tx.addrFrom}</Link></div>
                                    <div title={tx.addrTo}>&nbsp;&nbsp;to: <Link to={`/addr/${tx.addrTo}`}>{tx.addrTo}</Link></div>
                                </td>
                                <td><div title={tx.hash}><Link to={`/tx/${tx.hash}`}>{tx.hash}</Link></div></td>
                                <td><div>{tx.amount}</div></td>
                                <td><div>{tx.fee/1000000000}</div></td>
                                <td><div>{tx.nonce}</div></td>
                                <td><div>{tx.otsKey}</div></td>
                            </tr>
                        );
                    });
                let confirmed = rsp.confirmedTx.length === 0
                    ? (<tr><td colSpan={6}>No confirmed transactions...</td></tr>)
                    : rsp.confirmedTx.map((tx, idx) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <div title={tx.addrFrom} className={tx.addrFrom ? 'addr-from' : 'display-none'}>from: <Link to={`/addr/${tx.addrFrom}`}>{tx.addrFrom}</Link></div>
                                    <div title={tx.addrTo} className={tx.addrTo ? 'addr-to' : 'display-none'}>&nbsp;&nbsp;to: <Link to={`/addr/${tx.addrTo}`}>{tx.addrTo}</Link></div>
                                </td>
                                <td><div title={tx.hash}><Link to={`/tx/${tx.hash}`}>{tx.hash}</Link></div></td>
                                <td><div>{tx.amount}</div></td>
                                <td><div>{tx.fee/1000000000}</div></td>
                                <td><div>{tx.nonce}</div></td>
                                <td><div>{tx.otsKey}</div></td>
                            </tr>
                        );
                    });

                this.setState({
                    blocks: blocks,
                    unconfirmed: unconfirmed,
                    confirmed: confirmed
                });
            });
    }

    render() {
        return (
            <div className="app-card">
                <div className="card-title">
                    Latest Blocks
                </div>
                <div className="card-body">
                    {this.state.blocks}
                </div>
                <div className="card-title">
                    Unconfirmed Transactions
                </div>
                <div className="card-body">
                    <table>
                        <thead>
                        <tr role="row">
                            <th className="addrs-col">Addresses</th>
                            <th>Hash</th>
                            <th>Amount</th>
                            <th>Fee</th>
                            <th>Nonce</th>
                            <th>OTS Key</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.unconfirmed}
                        </tbody>
                    </table>
                </div>
                <div className="card-title">
                    Confirmed Transactions
                </div>
                <div className="card-body">
                    <table>
                        <thead>
                        <tr role="row">
                            <th className="addrs-col">Addresses</th>
                            <th>Hash</th>
                            <th>Amount</th>
                            <th>Fee</th>
                            <th>Nonce</th>
                            <th>OTS Key</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.confirmed}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

/*

                    <table>
                        <thead>
                        <tr role="row">
                            <th>Number</th>
                            <th>Epoch</th>
                            <th>Hash</th>
                            <th>Prev. Hash</th>
                            <th>Merkle Root</th>
                            <th>Mining Nonce</th>
                            <th>PK</th>
                            <th>Reward Block</th>
                            <th>Reward</th>
                            <th>Reward Fee</th>
                            <th>Timesptamp</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><div><Link to={`/block/${block.blockNumber}`}>{block.blockNumber}</Link></div></td>
                            <td><div>{block.epoch}</div></td>
                            <td><div>{block.hashHeader}</div></td>
                            <td><div>{block.hashHeaderPrev}</div></td>
                            <td><div>{block.merkleRoot}</div></td>
                            <td><div>{block.miningNonce}</div></td>
                            <td><div>{block.pk}</div></td>
                            <td><div>{block.rewardBlock}</div></td>
                            <td><div>{block.rewardFee}</div></td>
                            <td><div>{block.timestamp}</div></td>
                        </tr>
                        </tbody>
                    </table>


 */

export default Latest;