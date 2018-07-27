import React, { Component } from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator';
import Viewer from './components/Viewer';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as apodActions from 'redux/modules/apod';


class App extends Component {
  getAPOD = (date) => {
      const {ApodActions} = this.props;
      ApodActions.getAPOD(date);
  }

  componentDidMount(){
     this.getAPOD();
  }

  handlePrev = () => {
      const {date} = this.props;
      const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
      this.getAPOD(prevDate);
  }

  handleNext = () => {
      const {date, maxDate} = this.props;

      if(date === maxDate) return;

      const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
      this.getAPOD(nextDate);
  }

  render() {
    const {loading, mediaType, url} = this.props;
    const {handlePrev, handleNext} = this;

    return (
      <div>
          <ViewerTemplate
              spaceNavigator={<SpaceNavigator onPrev={handlePrev} onNext={handleNext}/>}
              viewer={<Viewer mediaType={mediaType} url={url} loading={loading} />}
          />
      </div>
    );
  }
}

export default connect(
    state => ({
        date: state.apod.date,
        error: state.apod.rejected,
        loading: state.apod.pending,
        maxDate: state.apod.maxDate,
        mediaType: state.apod.mediaType,
        url: state.apod.url
    }),

    dispatch => ({
        ApodActions: bindActionCreators(apodActions, dispatch)
    })
)(App);
