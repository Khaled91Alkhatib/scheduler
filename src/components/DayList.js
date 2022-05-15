import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  // Iterate over days array and use its data to create new array
  const newArray = props.days.map((day) => {
    return <DayListItem 
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.day}
    setDay={props.setDay}
    />
  })

    return (
      <ul>
        {newArray}
      </ul>
    )
}