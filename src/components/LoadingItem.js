export default function () {
    return (
      <ReactCSSTransitionGroup
        transitionName="loadingItem"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <img className="feed__loading-item" src={img} />
      </ReactCSSTransitionGroup>
    )
  }