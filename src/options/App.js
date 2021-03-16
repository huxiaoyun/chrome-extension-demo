/**
 * 配置页
 */
import React from "react";
import * as _ from "lodash";
import ConfigTools from './ConfigTools';

export default class App extends React.Component {
  state = {

  };

  render() {
    const { runtime } = chrome;
    const manifest = runtime.getManifest();
    return (
      <div className="options-page">
        <div className="options-header">
          <div className="header-body clearfix">
            <a
              className="top-link-brand"
              href={manifest.homepage_url}
              target="_blank"
            >
              <img className="app-icon" src="../icons/icon16.png" />
              {manifest.name}
            </a>
            ：setting page
            <span className="pull-right">version：{manifest.version}</span>
            <span className="pull-right">owner：{manifest.maintainer}&nbsp;</span>
          </div>
        </div>

        {/** setting page content */}
        <ConfigTools />
      </div>
    );
  }
}