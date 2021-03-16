import React from "react";
import * as _ from "lodash";
import axios from 'axios';

export default class App extends React.Component {
  state = {
    data: [],
  };
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="devtools">
      this is dev tools page, add sth here
    </div>;
  }
}