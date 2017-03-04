import React, {Component} from 'react';
import store from '../../redux/store';
import { connect } from 'react-redux';
/* Components */
import AgendaRow from './AgendaRow.jsx';
import RenderAgendaDays from './RenderAgendaDays.jsx';
/* Actions */
import { getStagesAndDays } from '../../redux/actions/venueScheduleActions';

class PersonalAgenda extends React.Component {

  render() {

    const displayAgenda={};
    const data = this.props.venue.scheduleitems;
    const agenda = this.props.venueSchedule.agenda;
    const venueSchedule = this.props.venueSchedule;
    const { days } = getStagesAndDays(data);

    for(var i =0;i<agenda.length;i++) {
      if( agenda[i] in data) {
        displayAgenda[agenda[i]] = data[agenda[i]]
      }
    }

    return (
      <div>
        <RenderAgendaDays days={days}/>
        {Object.keys(displayAgenda).map((itemKey, index) => {
          var item = displayAgenda[itemKey];
          if(item.day === venueSchedule.selectedDay) {
             return (
              <AgendaRow
                key={index}
                itemKey={itemKey}
                name={item.name}
                startTime = {item.starttime}
                endTime = {item.endtime}
                geofence={item.geofence}
                day={item.day}
                imgurl={item.imgurl}>
              </AgendaRow>
            );
          }
        })}
      </div>
    );
  }
}

export default connect((store) => {
  return {
    venueSchedule: store.venueSchedule,
    venue: store.venue.venue,
    venueId: store.user.venueId
  };
})(PersonalAgenda);