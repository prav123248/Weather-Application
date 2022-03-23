import React, {Component} from 'react';
import '../../styles/common.css';
import Header from '../headerComponent/header';
import Toolbar from '../toolbarComponent/toolbar';
import './style.css';
import add from '../../assets/icons/add.png';
import subtract from '../../assets/icons/minus.png';
import $ from 'jquery';

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
        return (
            <div class="upperScrollContainer">

            <div class="titleSection">
                <h2>Trail List</h2>
            </div>
            
            
            <div class="scrollableTable" id="trailListContainer">
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>
                <p class="trailName">Harrow</p>

                </div>
            </div>
 
            
        );
    }
}
