// import React, { Component } from 'react';
// import { getAllPolls, getUserCreatedPolls, getUserVotedPolls } from "../util/APIUtils";
// import Poll from 'Poll';
// import { castVote } from "../util/APIUtils";
// import LoadingIndicator from '../common/LoadingIndicator';
// import { Button, Icon, notification } from 'antd';
// import { POLL_LIST_SIZE } from "../constants";
// import { withRouter } from 'react-router-dom';
// import './PollList.css';
//
//
// class PollList extends Component{
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             polls: [],
//             page: 0,
//             size: 10,
//             totalElements: 0,
//             totalPages: 0,
//             last: true,
//             currentVotes: [],
//             isLoading: false
//         };
//
//         this.loadPollList = this.loadPollList.bind(this);
//         this.handleLoadMore =  this.handleLoadMore.bind(this);
//     }
//
// }
//
//
// export default PollList;