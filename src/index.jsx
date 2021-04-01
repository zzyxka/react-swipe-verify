import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './index.css';

let touchIng = false; // 是否在滑动触摸过程中：用来防止用户滑动结束不抬起手指导致的问题
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
    this.resetState = this.resetState.bind(this);
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

  resetState() {
    touchIng = false;
    startX = 0;
    clearTimeout(this.timer);
    this.setState({
      moveX: 0,
      isSuccess: false,
    });
  }

  touchStartHandler(e) {
    if (!this.eventCheck()) {
      return;
    }
    touchIng = true;
    startX = e.touches[0].pageX;
  }

  touchMoveHandler(e) {
    if (!touchIng || !this.eventCheck()) {
      return;
    }
    const moveX = e.touches[0].pageX - startX;
    const getDomMoveX = () => {
      if (moveX <= 0) {
        return 0;
      }
      if (moveX >= swipeWidth) {
        return swipeWidth;
      }
      return moveX;
    }
    this.setState({
      moveX: getDomMoveX()
    }, () => {
      if (moveX >= swipeWidth) {
        this.setState({ isSuccess: true });
        const resetFlag = this.props.onSuccess();
        if (resetFlag) {
          this.timer = setTimeout(this.resetState, 500);
        }
        return;
      }
    });
  }

  touchEndHandler(e) {
    if (!touchIng || !this.eventCheck()) {
      return;
    }
    this.resetState();
  }

  componentDidMount() {
    containerWidth = document.getElementById('swipe-verify').offsetWidth;
    blockWidth = document.getElementById('swipe').offsetWidth;
    swipeWidth = containerWidth - blockWidth;
  }

  render() {
    const { moveX, isSuccess } = this.state;
    const { 
      text, 
      loading, loadingNode, 
      disabled, 
      swipeNode, successSwipeNode,
      containerStyle, customClass
    } = this.props;

    const {
      containerBar, containerBarUnable,
      swipedPart,
      swiperBlock,
    } = customClass;

    const swipedWidth = moveX + blockWidth / 2; // 滑块划过长度

    return (
      <div
        id="swipe-verify"
        className={`
          ${classes['container-bar']} ${containerBar} 
          ${(loading || disabled) ? `${classes['container-bar--unable']} ${containerBarUnable}` : ''}
        `}
        style={containerStyle}
      >
        <div className={`${classes['swiped-part']} ${swipedPart}`} style={{ width: `${swipedWidth}px` }} />
        <div
          id="swipe"
          className={`${classes['swiper-block']} ${swiperBlock}`}
          style={{ transform: `translateX(${moveX}px)` }}
          onTouchStart={this.touchStartHandler}
          onTouchMove={this.touchMoveHandler}
          onTouchEnd={this.touchEndHandler}
        >
          {
            isSuccess
              ? successSwipeNode
              : swipeNode
          }
        </div>
        <span>{loading ? loadingNode : text}</span>
      </div>
    )
  }
}

Index.defaultProps = {
  onSuccess: () => console.log('success'),
  loading: false,
  loadingNode: <span>请求中...</span>,
  disabled: false,
  text: '',
  swipeNode: <span>&gt;&gt;</span>,
  successSwipeNode: <span className={classes['success-mark']}>✔️</span>,
  containerStyle: {},
  customClass: {},
};

Index.propTypes = {
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  loadingNode: PropTypes.object,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  swipeNode: PropTypes.object,
  successSwipeNode: PropTypes.object,
  containerStyle: PropTypes.object,
  customClass: PropTypes.object,
};

export default Index;
