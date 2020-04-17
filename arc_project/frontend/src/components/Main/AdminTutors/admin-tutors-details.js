import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AuthContext } from '../../Auth/auth';
import TutorSessionItem from '../TutorSessions/TutorSessionItem/tutor-session-item';
import TutorContractItem from '../TutorContracts/TutorContractItem/tutor-contract-item';

import css from './admin-tutors.module.css';

export default class AdminTutorsDetails extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = { currentSection: 'sessions' };
  }

  clickedSession = (event) => {
    this.setState({ currentSection: event.target.getAttribute('section') });
  }

  render() {
    var contracts = this.props.data.contracts.map((contract, index) => {
      return <TutorContractItem key={index} contract={contract} isAdmin={true}/>;
    });

    var sessions = this.props.data.sessions.map((session, index) => {
      return <TutorSessionItem key={index} session={session} isAdmin={true}/>;
    })

    let selectedStyle = { borderBottom: 'solid 4px #3697ff' };

    return (
      <div className={css.detailsContainer}>
        <div className={css.closeButton} onClick={this.props.hideDetails}>
          <FontAwesomeIcon icon='times'/>
        </div>
        <div className={css.contentWrapper}>
          <div className={css.header}>
            <div className={css.name}>
              {this.props.tutor.first_name+' '+this.props.tutor.last_name}
            </div>
            <div className={css.phone}>{this.props.tutor.phone}</div>
            <div className={css.email}>{this.props.tutor.email}</div>
          </div>
          <div className={css.menu}>
            <div section='sessions' onClick={this.clickedSession} style={this.state.currentSection === 'sessions' ? selectedStyle : null}>Sessions</div>
            <div section='contracts' onClick={this.clickedSession} style={this.state.currentSection === 'contracts' ? selectedStyle : null}>Contracts</div>
          </div>

          {this.state.currentSection === 'contracts' &&
          <div className={css.section}>
            {contracts}
          </div>
          }

          {this.state.currentSection === 'sessions' &&
          <div className={css.section}>
            {sessions}
          </div>
          }

        </div>
      </div>
    );
  }
}
