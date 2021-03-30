import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

let containerWidth = 0; // 容器长度
let blockWidth = 0; // 滑块长度
let swipeWidth = 0; // 可活动距离
let startX = 0; // 开始滑动位置

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveX: 0,
      isSuccess: false,
    };
    this.eventCheck = this.eventCheck.bind(this);
    this.touchStartHandler = this.touchStartHandler.bind(this);
    this.touchMoveHandler = this.touchMoveHandler.bind(this);
    this.touchEndHandler = this.touchEndHandler.bind(this);
  }

  eventCheck() {
    const { loading, disabled } = this.props;
    const { isSuccess } = this.state;
    if (loading || disabled || isSuccess) return false;
    return true;
  }

  touchStartHandler(e) {
    if (!this.eventCheck()) {
      return;
    }
    startX = e.touches[0].pageX;
  }

  touchMoveHandler(e) {
    if (!this.eventCheck()) {
      return;
    }
    const moveX = e.touches[0].pageX - startX;
    if (moveX >= swipeWidth) {
      this.setState({ isSuccess: true });
      this.props.onSuccess();
      return;
    }
    this.setState({ moveX });
  }

  touchEndHandler(e) {
    if (!this.eventCheck()) {
      return;
    }
    startX = 0;
    this.setState({
      moveX: 0
    });
  }

  componentDidMount() {
    containerWidth = document.getElementById('swipe-verify').offsetWidth;
    blockWidth = document.getElementById('swipe').offsetWidth;
    swipeWidth = containerWidth - blockWidth;
  }

  render() {
    const { moveX, isSuccess } = this.state;
    const { text, loading, disabled } = this.props;
    const swipedWidth = moveX + blockWidth / 2;

    return (
      <div
        id="swipe-verify"
        className="container-bar"
        style={{ opacity: (loading || disabled) ? 0.6 : 1 }}
      >
        <div className="swiped-part" style={{ width: `${swipedWidth}px` }} />
        <div
          id="swipe"
          className="swiper-block"
          style={{ transform: `translateX(${moveX}px)` }}
          onTouchStart={this.touchStartHandler}
          onTouchMove={this.touchMoveHandler}
          onTouchEnd={this.touchEndHandler}
        >
          {
            isSuccess
              ? <span className="success-mark">✔️</span>
              : <span>&gt;&gt;</span>
          }
        </div>
        <b>{loading ? '请求中' : text}</b>
      </div>
    )
  }
}

Index.defaultProps = {
  onSuccess: () => console.log('success'),
  loading: false,
  disabled: false,
  text: '',
};

Index.propTypes = {
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.string,
};

export default Index;
