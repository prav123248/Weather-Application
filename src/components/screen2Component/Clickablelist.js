import React, {Component} from 'react';
import '../../styles/common.css';
import './style.css';
import $ from 'jquery';
import { readData } from './readData';

export default class Clickablelist extends Component {
    constructor(props) {
        super(props);

    }

    trailSelection = () => {
        const self = this;
        $('.trailName').on('click', function () {
            var el = $(this).text();
            self.props.trailChanger(el);
        });        
    }

    componentDidMount() {
        this.trailSelection();
        
    }



    render(){
        var trailList = readData();

        if (trailList.length <= 0) {
            return (
                <div class="upperScrollContainer">
    
                <div class="titleSection">
                    <h2>Trail List</h2>
                </div>
                
                
                <div class="scrollableTable" id="trailListContainer">
                    <p class="nonCapital">No trails to display. Add some using the button below</p>

    
                    </div>
                </div>      
            );            
        }
        else {
            return (
                <div class="upperScrollContainer">
    
                <div class="titleSection">
                    <h2>Trail List</h2>
                </div>
                
                
                <div class="scrollableTable" id="trailListContainer">
                    {trailList.map((trail) => (
                        <p class="trailName">{trail[0]}</p>
                    ))}
    
                    </div>
                </div>                
            );
        }

    }
}
