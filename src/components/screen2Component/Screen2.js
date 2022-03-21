import React, {Component} from 'react';
import '../../styles/common.css';
import Header from '../headerComponent/header';
import Toolbar from '../toolbarComponent/toolbar';
import './style.css'

export default class Screen3 extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
                
            <div id="screen2" className="container">   
                <Header />
                <h1>Screen 2 - Change stuff between header and toolbar</h1>

                <div class="scheduleContainer">
                    <h2>Trail Schedule</h2>
                    <div class="scrollable">
                        <table>
                            <tbody>
                                <tr>
                                    <th class="scheduleName">Trail Name</th>
                                    <th class="scheduleDate">Date</th>
                                </tr>

                                <tr>
                                    <td class="scheduleName">Harrow</td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr>   

                                <tr>
                                    <td class="scheduleName">Britain</td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr>   
                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr>   

                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr> 

                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr> 

                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr> 

                                <tr>
                                    <td class="scheduleName">Britain and some other land </td>
                                    <td class="scheduleDate">23/01/21</td>
                                </tr> 
                            </tbody>
                        </table>

                    </div>
                </div>
                <Toolbar instance={this.props.instance} screen={2}  />
            </div>

            
        );
    }
}
