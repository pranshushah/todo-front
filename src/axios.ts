import axios from 'axios';

const instance = axios.create({
  timeout: 9000,
  timeoutErrorMessage: 'We were unable to update data',
});

export default instance;
