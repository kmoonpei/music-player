import React, { Component } from "react";
import ReactPlayer from "react-player";
import API from "../../../utils/API";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  render() {
	let currentSong = this.props.MusicState;
	console.log('当前播放歌曲：',currentSong.url)
    return (
      <div style={{ display: "none" }}>
		<ReactPlayer 
			volume={0.5} 
			url={currentSong ? currentSong.url : null}
			controls
			playing={true}
		/>
      </div>
    );
  }
}

const mapStateToProps = state => state;
// const mapDispatchToProps = (dispatch) => {
//     return {
//         // PlayListActions: bindActionCreators(PlayListAction, dispatch),
//     }
// };
export default connect(mapStateToProps)(Player);
