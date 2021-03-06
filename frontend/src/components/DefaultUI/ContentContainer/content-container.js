import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './content-container.module.css';

/*
This class implements the ContentContainer component, which contains the main content
of a page. This component supports multi-tabs sections.
@parameters
  tabs: an array of strings specifying tab names.
  onTabChangeCallback: callback function when another tab is selected. The corresponding index
  in `tabs` is passed into the callback.
@class
  className: whole container
  classNameTab: for each tab
  classNameSelectedTab: for selected tab
  classNameContent: for content section
*/
export default class ContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: 0 };

  }

  onTabClickHandler = (event) => {
    let newIndex = parseInt(event.target.getAttribute('index'));
    this.setState({ currentTab: newIndex });

    let tab = event.target.getAttribute('tabname');
    if (this.props.onTabChangeCallback)
      this.props.onTabChangeCallback(tab);
  }

  render() {
    let tabs = this.props.tabs.map((tab, index) => {
      let selectedTabStyle = this.state.currentTab === index ? css.selectedTab+' '+this.props.classNameSelectedTab : '';
      return (
        <span key={index} onClick={this.onTabClickHandler} index={index} tabname={tab}
              className={css.tab+' '+selectedTabStyle+' '+this.props.classNameTab}>
          {tab}
        </span>
      );
    });

    return (
      <div className={css.container+' '+this.props.className}>
        <div className={css.wrapper}>
        <div className={css.tabsContainer}>
          {tabs}
        </div>

        <div className={css.content+' '+this.props.classNameContent}>
          {this.props.children}
        </div>
        </div>
      </div>
    );
  }
}
