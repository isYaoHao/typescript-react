import React from 'react';
import { connect } from 'dva';

@connect()
class UserLogin extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'user/verify',
    });
  }

  render() {
    return (
      <div>跳转中...</div>
    );
  }
}
export default UserLogin;
