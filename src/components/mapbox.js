import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapGL, { Marker } from 'react-map-gl';

import { Creators as UserActions } from '../store/ducks/users';

class Mapbox extends Component {
  static propTypes = {
    addUserRequest: PropTypes.func.isRequired,
    users: PropTypes.shape({
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

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      longitude: -50.16074853597218,
      latitude: -25.0944331688486,
      zoom: 13,
    },
    modalOpen: false,
    userInput: '',
    userLat: '',
    userLong: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = (e) => {
    const [latitude, longitude] = e.lngLat;
    this.setState({ modalOpen: true, userLat: longitude, userLong: latitude });
  };

  handleModalClose = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ modalOpen: false, userInput: '' });
  };

  handleAddUser = (e) => {
    const { userLat, userLong, userInput } = this.state;
    const { addUserRequest } = this.props;
    console.log(e);
    e.preventDefault();
    addUserRequest(userLat, userLong, userInput);
    this.handleModalClose();
  };

  render() {
    const { viewport, modalOpen, userInput } = this.state;
    const { users } = this.props;
    return (
      <Fragment>
        <MapGL
          className="mapa"
          {...viewport}
          onClick={this.handleMapClick}
          mapStyle="mapbox://styles/mapbox/basic-v9"
          mapboxApiAccessToken="pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {users.data.map(user => (
            <Marker
              key={user.id}
              latitude={user.latitude}
              longitude={user.longitude}
              onClick={this.handleMapClick}
              captureClick
            >
              <img
                style={{
                  borderRadius: 100,
                  border: '3px solid #7C66C4',
                  width: 48,
                  height: 48,
                }}
                src={user.avatar}
                alt="avatar"
              />
            </Marker>
          ))}
        </MapGL>
        <Modal
          isOpen={modalOpen}
          className="modal"
          contentLabel="Adicionar usuário"
          ariaHideApp={false}
        >
          <h2>Adicionar novo usuário</h2>
          <form onSubmit={this.handleAddUser}>
            <input
              placeholder="Usuário no Github"
              value={userInput}
              onChange={e => this.setState({ userInput: e.target.value })}
            />
            <div>
              <a href="/" onClick={this.handleModalClose}>
                Cancelar
              </a>
              <button type="submit">Salvar</button>
            </div>
          </form>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mapbox);
