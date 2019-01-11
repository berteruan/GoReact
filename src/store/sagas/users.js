import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { Creators as UserActions } from '../ducks/users';

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.username}`);

    const isDuplicated = yield select(state => state.users.data.find(user => user.id === data.id));

    if (isDuplicated) {
      yield put(UserActions.addUserFailure());
      toast.error('Usuário já adicionado');
    } else {
      const userData = {
        id: data.id,
        fullname: data.name,
        username: data.login,
        avatar: data.avatar_url,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };

      yield put(UserActions.addUserSuccess(userData));
      toast.success('Usuário adicionado com sucesso');
    }
  } catch (err) {
    yield put(UserActions.addUserFailure());
    toast.error('Erro ao adicionar usuário');
  }
}
