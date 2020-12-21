import request from './request';

export function getUserName(userID) {
  console.log(request)
  return request('/users/' + userID).then(user => user.name);
}