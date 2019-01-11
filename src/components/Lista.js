import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as UserActions } from '../store/ducks/users';

import 'react-toastify/dist/ReactToastify.css';

const Lista = (props) => {
  const { users } = props;

  return (
    <div className="lista">
      <span style={{ margin: '15px auto', color: '#b4b4b4', fontSize: '10px' }}>
        Clique no mapa para adicionar um usuário
      </span>
      {users.data.map(user => (
        <Fragment key={user.id}>
          <div className="item">
            <img
              style={{
                borderRadius: 100,
                width: 48,
                height: 48,
              }}
              src={user.avatar}
              alt="avatar"
            />
            <div className="text">
              <strong>{user.fullname}</strong>
              <small>{user.username}</small>
            </div>
            <div className="actions">
              <button type="button" onClick={() => props.removeUser(user.id)}>
                <i className="fa fa-times-circle fa-lg delete-profile " />
              </button>

              <button type="button">
                <i className="fa fa-angle-right fa-lg angle-profile" />
              </button>
            </div>
          </div>
          <div className="border" />
        </Fragment>
      ))}
      <ToastContainer autoClose={2000} />
      {users.loading && <span style={{ margin: '15px auto' }}>Carregando...</span>}
    </div>
  );
};

Lista.propTypes = {
  removeUser: PropTypes.func.isRequired,
  users: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        fullname: PropTypes.string,
        username: PropTypes.string,
        avatar: PropTypes.string,
      }),
    ),
  }).isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lista);
