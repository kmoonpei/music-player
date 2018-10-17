import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import API from '../../../utils/API';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

    }
    componentWillMount() {
        
    }

  
    render() {
        return (
            <div>
                hh
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        // PlayListActions: bindActionCreators(PlayListAction, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Player); 