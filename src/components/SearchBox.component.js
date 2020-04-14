import React, { Component } from 'react';
import axios from 'axios';

export default class SearchBox extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            hostName: null,
            domainDnsData: null
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        //this.renderTableData = this.renderTableData.bind(this);
    }

    async clientDNSLookup() {
        const response = await axios.get(process.env.REACT_APP_EXPRESS_URI + '/lookup/' + this.state.hostName);
        const jsonData = response.data.DNSData.dnsRecords;
        this.setState({domainDnsData: jsonData});
        // console.log(this.state.domainDnsData);

        document.getElementById('aRecordTable-data').innerHTML += this.aRecordLookup();
        document.getElementById('cnameRecordTable-data').innerHTML += this.cnameRecordLookup();
        document.getElementById('mxRecordTable-data').innerHTML += this.mxRecordLookup();
        document.getElementById('txtRecordTable-data').innerHTML += this.txtRecordLookup();
        
        const wwwresponse = await axios.get(process.env.REACT_APP_EXPRESS_URI + '/lookup/www.' + this.state.hostName);
        const wwwjsonData = wwwresponse.data.DNSData.dnsRecords;
        this.setState({domainDnsData: wwwjsonData});
        // console.log(this.state.domainDnsData);

        document.getElementById('aRecordTable-data').innerHTML += this.aRecordLookup();
        document.getElementById('cnameRecordTable-data').innerHTML += this.cnameRecordLookup();
        document.getElementById('mxRecordTable-data').innerHTML += this.mxRecordLookup();
        document.getElementById('txtRecordTable-data').innerHTML += this.txtRecordLookup();
    }

    aRecordLookup() {
        const aRecords = this.state.domainDnsData.filter(d => d.dnsType === "A");
        console.log(aRecords);
        return aRecords.map((entry, index) => {
            const { dnsType, name, ttl, address } = entry
            // console.log(index, dnsType, name, ttl, address);
            document.getElementById('aRecordTable').className = "table mb-2 d-block";
            return (
               `<tr key=${index}>
                  <td>${dnsType}</td>
                  <td>${name}</td>
                  <td>${address}</td>
                  <td>${ttl}</td>
               </tr>`
            )
         }).join('')
    }

    cnameRecordLookup() {
        const cnameRecords = this.state.domainDnsData.filter(d => d.dnsType === "CNAME");
        console.log(cnameRecords);
        return cnameRecords.map((entry, index) => {
            const { dnsType, name, target, ttl } = entry
            document.getElementById('cnameRecordTable').className = "table mb-2 d-block";
            return (
               `<tr key=${index}>
                  <td>${dnsType}</td>
                  <td>${name}</td>
                  <td>${target}</td>
                  <td>${ttl}</td>
               </tr>`
            )
         }).join('')
    }

    mxRecordLookup() {
        const aRecords = this.state.domainDnsData.filter(d => d.dnsType === "MX");
        console.log(aRecords);
        return aRecords.map((entry, index) => {
            const { dnsType, name, priority, target, ttl } = entry
            document.getElementById('mxRecordTable').className = "table mb-2 d-block";
            return (
               `<tr key=${index}>
                  <td>${dnsType}</td>
                  <td>${name}</td>
                  <td>${priority}</td>
                  <td>${target}</td>
                  <td>${ttl}</td>
               </tr>`
            )
         }).join('')
    }

    txtRecordLookup() {
        const txtRecords = this.state.domainDnsData.filter(d => d.dnsType === "TXT");
        console.log(txtRecords);
        return txtRecords.map((entry, index) => {
            const { dnsType, name, strings, ttl } = entry
            document.getElementById('txtRecordTable').className = "table mb-2 d-block";
            return (
               `<tr key=${index}>
                  <td>${dnsType}</td>
                  <td>${name}</td>
                  <td>${strings}</td>
                  <td>${ttl}</td>
               </tr>`
            )
         }).join('')
    }

    onChangeInput(e) {
        this.setState({hostName: e.target.value});
        document.getElementById('aRecordTable').className = "table mb-2 d-none";
        document.getElementById('cnameRecordTable').className = "table mb-2 d-none";
        document.getElementById('mxRecordTable').className = "table mb-2 d-none";
        document.getElementById('txtRecordTable').className = "table mb-2 d-none";
    }

    async onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({domainDnsData: null});
        document.getElementById('aRecordTable-data').innerHTML = null;
        document.getElementById('cnameRecordTable-data').className = null;
        document.getElementById('mxRecordTable-data').innerHTML = null;
        document.getElementById('txtRecordTable-data').className = null;

        await this.clientDNSLookup();
        //console.log(dnsData);
    }

    render() {
        return(
            <div className="row">
                <div className="card border-0 shadow-lg my-10 bg-light search-box">
                    <div className="card-body px-5 py-2">
                        <form onSubmit={this.onSubmit}>
                            <h2 className="mb-1">Your domain name is <span className="txt-rotate" data-period="2000" data-rotate='[ "personal.", "important.", "unique.", "your identity.", "fun!" ]'></span>
                            </h2>
                            <div className="form-row mx-auto">
                                <div className="form-group col-lg-9">
                                    <input type="text" className="form-control" id="inputHostname" aria-describedby="hostnameHelp" placeholder="Enter a domain name to obtain DNS records" onChange={this.onChangeInput}/>
                                    <small id="hostnameHelp" className="form-text text-muted mt-1">Enter hostname (eg. mydomain.com)</small>
                                </div>
                                <div className="form-group col-lg-3">
                                    <button type="submit" className="btn btn-primary btn-block bg-success">Get Records</button>
                                </div>
                            </div>
                        </form>
                        <h1 className="mb-1"><span id="results"></span></h1>
                        <h4><span id="domainname"></span></h4>
                        <table id="aRecordTable" className="table mb-2 d-none">
                            <thead>
                                <tr><td colSpan="4"><span className="table-title">A Records</span></td></tr>
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">TTL</th>
                                </tr>
                            </thead>
                            <tbody id="aRecordTable-data">
                                {/* Placeholder for data */}
                            </tbody>
                        </table>
                        <table id="cnameRecordTable" className="table mb-2 d-none">
                            <thead>
                                <tr><td colSpan="5"><span className="table-title">CNAME Records</span></td></tr>
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Target</th>
                                    <th scope="col">TTL</th>
                                </tr>
                            </thead>
                            <tbody id="cnameRecordTable-data">
                                {/* Placeholder for data */}
                            </tbody>
                        </table>
                        <table id="mxRecordTable" className="table mb-2 d-none">
                            <thead>
                                <tr><td colSpan="5"><span className="table-title">MX Records</span></td></tr>
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Priority</th>
                                    <th scope="col">Target</th>
                                    <th scope="col">TTL</th>
                                </tr>
                            </thead>
                            <tbody id="mxRecordTable-data">
                                {/* Placeholder for data */}
                            </tbody>
                        </table>
                        <table id="txtRecordTable" className="table mb-2 d-none">
                            <thead>
                                <tr><td colSpan="5"><span className="table-title">TXT Records</span></td></tr>
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">TTL</th>
                                </tr>
                            </thead>
                            <tbody id="txtRecordTable-data">
                                {/* Placeholder for data */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}