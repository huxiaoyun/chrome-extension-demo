import React from "react";
import {Switch, Tooltip} from "antd";
import * as _ from "lodash";
import {
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { storage } from "../utils";
import { CONFIG_TOOLS_KEY } from '../constants';

const toolsList = [{
  label: 'useDebug',
  desc: 'useDebug开关,给url自动添加useDebug=true参数',
  key: 'useDebugTool',
}, {
  label: '缓存工具',
  desc: '开关缓存工具，包括localstorage、dns、cookies、js缓存',
  key: 'cacheTool',
}, {
  label: 'iframe',
  desc: '展示当前chrome tab中的iframe页面',
  key: 'iframeTool',
}];

export default class App extends React.Component {
  state = {
    toolsSwitch: [],
  };

  componentDidMount() {
    storage.get(CONFIG_TOOLS_KEY).then(res => {
      const toolsSwitchStorage = _.get(res, CONFIG_TOOLS_KEY, []) || [];
      const toolsSwitch = toolsList.map((tool) => {
        const matchTool = toolsSwitchStorage.filter((item) => tool.key === item.key);
        if (matchTool.length !== 0) {
          return {
            ...tool,
            ...matchTool[0],
          };
        }
        return {
          ...tool,
          isOn: false,
        };
      });
      this.setState({
        toolsSwitch,
      });
    });
  }
  // 开关
  handleToggleToolOn = (tool, checked) => {
    const { toolsSwitch } = this.state;
    const newToolsSwitch = toolsSwitch.map((item) => {
      if (item.key === tool.key) {
        return {
          ...item,
          isOn: checked
        };
      }
      return item;
    });
    this.setState({
      toolsSwitch: newToolsSwitch,
    });
    storage.set({ [CONFIG_TOOLS_KEY]: newToolsSwitch }).then(res => {
      console.info(`保存功能开关${res ? "成功" : "失败"}！`, newToolsSwitch);
    });
  }

  render() {
    const { toolsSwitch } = this.state;
    return (
      <div className="options-body">
        <h4 className="option-mod-title">
          配置功能开关
        </h4>
        <ul className="option-mod-content clearfix">
        {
          toolsSwitch.map((tool) => {
            return (<li className="config-tool-box">
              <span>
                <span className="tool-label">
                  {tool.label}
                  <Tooltip title={<div>
                      {tool.desc}
                    </div>}
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
                <Switch size="small" defaultChecked={tool.defaultOn}
                  checked={tool.isOn} onChange={this.handleToggleToolOn.bind(this, tool)}/>
              </span>
            </li>);
          })
        }
        </ul>
      </div>
    );
  }
}