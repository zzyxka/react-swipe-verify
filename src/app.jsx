import React from 'react';
import ReactDOM from 'react-dom';
import SwipeVerify from './index.jsx';
import appStyle from './app.css';

const statusList = ['未开始', '任务中', '任务完成'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      status: 0,
    };
    this.successHandler = this.successHandler.bind(this);
  }

  successHandler() {
    this.setState({ loading: true });
    const _this = this;
    return new Promise(res => { // 模拟接口请求
      setTimeout(() => {
        _this.setState(state => ({
          loading: false,
          status: state.status + 1
        }));
        res();
      }, 1500);
    });
  }

  render() {
    const { status, loading } = this.state;
    const getText = () => {
      switch (status) {
        case 0:
          return '滑动开始任务';
        case 1:
          return '滑动确认完成';
        default:
          return '任务已完成';
      }
    }

    return (
      <div>
        <p>请先打开移动端调试或在移动端访问</p>
        <p>
          本页代码地址：
          <a 
            target="_blank"
            href="https://github.com/zzyxka/react-swipe-verify/blob/main/src/app.jsx">https://github.com/zzyxka/react-swipe-verify/blob/main/src/app.jsx</a></p>
        <h2>1. 通过属性覆盖获得更佳的UI效果</h2>

        <h2>2. 用于登录场景/单次验证的场景</h2>

        <h2>3. 用于多次验证的场景</h2>
        <ol className={appStyle.ol}>
          <li>1. 初始化任务未开始，滑动确认开始任务，请求数据后，进入任务中状态</li>
          <li>2. 任务中滑动可确认完成，请求后，任务完成</li>
          <li>3. 任务完成后可根据具体需求不再渲染组件或改变文案</li>
        </ol>
        <p>当前任务状态：<b style={{ color: 'red' }}>{statusList[status]}</b></p>
        {
          status !== 2 &&
          <SwipeVerify
            text={getText()}
            onSuccess={this.successHandler}
            loading={loading}
          />
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));

